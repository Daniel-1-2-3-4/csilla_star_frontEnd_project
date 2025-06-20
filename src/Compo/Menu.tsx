import { useEffect, useState, type ReactElement } from "react";
import { Math_Process_Chart } from "./Math_Process_Chart";
import { Subject_Stacked_BarChart } from "./Subject_Stacked_BarChart";
import { ChartBarMixed } from "./SubjectBarChart";
import axios, { type AxiosResponse } from "axios";
import Loading from "./Loading";
import Err from "./err";

//JSON Aufbau
type apiDataBarChart = {
  [subject: string]: number;
};

type apiDataStackedBarChart = {
  [date: string]: {
    [subject: string]: number;
  };
};

//Interfaces für UseState
interface ChartState {
  loading: boolean;
  error: string | null;
  data: apiDataBarChart | null;
}

interface StackedChartState {
  loading: boolean;
  error: string | null;
  data: apiDataStackedBarChart | null;
}

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
  async function fetchChartData<T>(
    url: string,
    setState: React.Dispatch<
      React.SetStateAction<{
        loading: boolean;
        error: string | null;
        data: T | null;
      }>
    >
  ) {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));

      const response: AxiosResponse<T> = await axios.get<T>(url);

      setState((prevState) => ({
        ...prevState,
        loading: false,
        data: response.data,
      }));
    } catch (error: any) {
      console.error(`Error fetching data from ${url}:`, error);
      let errorMessage: string;
      if (axios.isAxiosError(error)) {
        errorMessage = error.response
          ? `Server error: ${error.response.status} - ${
              error.response.data?.message || "Please try again later."
            }`
          : error.request
          ? "Network error: Could not reach the server."
          : `Request failed: ${error.message}`;
      } else {
        errorMessage = `An unexpected error occurred: ${
          error.message || "Please check console for details."
        }`;
      }
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
        data: null,
      }));
    }
  }

  //on mount fetchen
  useEffect(() => {
    fetchChartData<apiDataBarChart>(URLS.barChart, setBarChartState);
    fetchChartData<apiDataStackedBarChart>(
      URLS.stackedChart,
      setStackedBarChartState
    );
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
          barChartState.loading,
          barChartState.error,
          <Subject_Stacked_BarChart
            barChartLoading={stackedBarChartState.loading}
            barChartError={stackedBarChartState.error}
            barChartFetchedData={stackedBarChartState.data}
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
