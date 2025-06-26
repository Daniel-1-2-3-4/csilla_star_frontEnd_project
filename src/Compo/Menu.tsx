import { useEffect, useState, type ReactElement } from "react";
import { Math_Process_Chart } from "./Math_Process_Chart";
import { Subject_Stacked_BarChart } from "./Subject_Stacked_BarChart";
import { ChartBarMixed } from "./SubjectBarChart";
import Loading from "./Loading";
import Err from "./Errors";
import { barChartTables } from "./LocalDBMS/LocalServiceBarChart";
import { fetchChartData } from "./MenuBackendConnection/FetchData";
import { postOldData } from "./MenuBackendConnection/PostData";
import { fromatOldData } from "./MenuLocalDBConnection/FormatOldData";
import type {
  ChartState,
  StackedChartState,
  apiDataBarChart,
  apiDataStackedBarChart,
} from "./MenuTypes";
import { UnsendData } from "./LocalDBMS/LocalServieUnsendBarCharts";

//URLs
const Menu = () => {
  const URLS = {
    barChart:
      "https://csilla-star-backend-project.onrender.com/v1/subjectdate/api/hours",
    stackedChart:
      "https://csilla-star-backend-project.onrender.com/v1/subjectdate/api/dates", // REMEMBER TO CHANGE THIS
    mathChart:
      "https://csilla-star-backend-project.onrender.com/v1/math/api/process-data", // REMEMBER TO CHANGE THIS
  };

  // barChart
  const [barChartState, setBarChartState] = useState<ChartState>({
    loading: true,
    error: null,
    data: null,
  });

  // stackedBarChart
  const [stackedBarChartState, setStackedBarChartState] =
    useState<StackedChartState>({
      loading: true,
      error: null,
      data: null,
    });

  //funktion für fetchinfData

  async function fetchAllChartDataSequentially(controller: AbortSignal) {
    try {
      // alte daten von website laden und posten
      const oldDataInDB = await postOldData(fromatOldData());
      if (oldDataInDB) {
        localStorage.removeItem("date");
      } else {
        if (oldDataInDB != null) {
          UnsendData.clearUnSendSubjects();
        }
      }

      const successBarChart = await fetchChartData<apiDataBarChart>(
        URLS.barChart,
        setBarChartState,
        controller
      );

      if (successBarChart) {
        await updateLocalDBBarChart();
      }

      await fetchChartData<apiDataStackedBarChart>(
        URLS.stackedChart,
        setStackedBarChartState,
        controller
      );
      //TODO
      /*
            if (successBarChart) {
        await updateLocalDBBarChart(); wird nicht funktionieren methode auf barchart ausgelegt
      }*/
    } catch (error) {
      console.error("One of the sequential fetches failed:", error);
    }
  }

  //on mount fetchen
  useEffect(() => {
    loadLocatolStorageBarChart();
    const controller: AbortController = new AbortController();
    fetchAllChartDataSequentially(controller.signal);
    if (location.pathname != "/") {
      return () => {
        controller.abort();
      };
    }
  }, []);

  const connectionElement = (
    load: boolean,
    err: string | null,
    connect: ReactElement
  ) => {
    if (load) {
      return <Loading />;
    } else if (err != null) {
      return <Err err={err} />;
    } else {
      return connect;
    }
  };

  useEffect(() => {
    if (barChartState.data) {
      updateLocalDBBarChart();
    }
  }, [barChartState.data]);

  const updateLocalDBBarChart = async () => {
    if (barChartState.data != null) {
      for (const [subject, hours] of Object.entries(barChartState.data)) {
        if (
          subject &&
          hours !== null &&
          hours !== undefined &&
          subject !== ""
        ) {
          await barChartTables.updateBySubject(subject, hours);
        }
      }
    }
  };

  const loadLocatolStorageBarChart = async () => {
    const subjects = await barChartTables.getSubjects();
    setBarChartState((prevState) => ({
      ...prevState,
      loading: false,
      data: subjects,
      error: null, // Clear any previous error
    }));
  };

  return (
    <div className="overflow-y-auto pr-[10dvw] w-full h-full">
      <div className="w-full h-1/3 mb-[1dvh] flex justify-center items-center">
        {connectionElement(
          barChartState.loading,
          barChartState.error,
          <ChartBarMixed
            barChartLoading={barChartState.loading}
            barChartError={barChartState.error}
            barChartFetchedData={barChartState.data}
          />
        )}
      </div>
      <div className="w-full h-1/3 mb-[1dvh] flex justify-center items-center">
        {connectionElement(
          stackedBarChartState.loading,
          stackedBarChartState.error,
          <Subject_Stacked_BarChart
            stackedBarChartLoading={stackedBarChartState.loading}
            stackedBarChartError={stackedBarChartState.error}
            stackedBarChartFetchedData={stackedBarChartState.data}
          />
        )}
      </div>
      <div className="w-full h-1/3 mb-[1dvh] flex justify-center items-center">
        <Math_Process_Chart></Math_Process_Chart>
      </div>
    </div>
  );
};

export default Menu;
