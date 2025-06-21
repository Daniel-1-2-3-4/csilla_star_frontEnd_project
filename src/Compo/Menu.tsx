import { useEffect, useState, type ReactElement } from "react";
import { Math_Process_Chart } from "./Math_Process_Chart";
import { Subject_Stacked_BarChart } from "./Subject_Stacked_BarChart";
import { ChartBarMixed } from "./SubjectBarChart";
import axios, { type AxiosResponse } from "axios";
import Loading from "./Loading";
import Err from "./Errors";

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
    setState((prevState) => ({ ...prevState, loading: true, error: null })); // Start loading state once

    try {
      const response: AxiosResponse<T> = await axios.get<T>(url);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        data: response.data,
        error: null, // Clear any previous error
      }));
      return 1; // Success
    } catch (error: any) {
      let errorMessage: string;
      if (axios.isAxiosError(error)) {
        errorMessage = error.response
          ? `Server error: ${error.response.status} - ${
              error.response.data?.message || "Please try again later"
            }`
          : error.request
          ? "Network error: Could not reach the server."
          : `Request failed: ${error.message}`;
      } else {
        errorMessage = `An unexpected error occurred: ${
          error?.message || "Please check console for details."
        }`;
      }

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
        data: null, // Clear data on final error
      }));
      return 0; // Failure
    }
  }

  const fromatOldData = () => {
    const oldData = localStorage.getItem("date");
    if (oldData) {
      const parsedData = JSON.parse(oldData);

      const oldDataToSend: Object[] = Object.entries(parsedData).map(
        ([date, subject]) => {
          return {
            date: date.substring(0, 10),
            subject: subject,
          };
        }
      );

      return oldDataToSend;
    }
    return null;
  };

  const postOldData = async (oldData: Object[] | null) => {
    const url =
      "https://csilla-star-backend-project.onrender.com/v1/subjectdate/api/oldData";

    const dataToSend: Object[] | null = oldData;
    if (dataToSend == null) {
      console.log("No old data to send");
      localStorage.removeItem("date");
      return;
    }

    try {
      const response = await axios.post(url, dataToSend);
      console.log("Success:", response.data);
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      return true;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error Response Data:", error.response.data);
          console.error("Error Response Status:", error.response.status);
          console.error("Error Response Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error Request:", error.request);
          console.error(
            "No response received from server. Check network or server status."
          );
        } else {
          console.error("Error Message:", error.message);
        }
        console.error("Error Config:", error.config);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return false;
    }
  };

  function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function fetchAllChartDataSequentially() {
    try {
      await wait(1000);
      const successLoaded1 = await fetchChartData<apiDataBarChart>(
        URLS.barChart,
        setBarChartState
      );
      console.log("Bar Chart data fetch completed.");

      await wait(1000);
      const susccessLoaded2 = await fetchChartData<apiDataStackedBarChart>(
        URLS.stackedChart,
        setStackedBarChartState
      );
      console.log("Stacked Bar Chart data fetch completed.");
    } catch (error) {
      console.error("One of the sequential fetches failed:", error);
    }
  }

  //on mount fetchen
  useEffect(() => {
    fetchAllChartDataSequentially();
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
