import axios, { type AxiosResponse } from "axios";

export async function fetchChartData<T>(
  url: string,
  setState: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      error: string | null;
      data: T | null;
    }>
  >,
  signal: AbortSignal
) {
  setState((prevState) => ({ ...prevState, loading: true, error: null })); // Start loading state once

  try {
    const response: AxiosResponse<T> = await axios.get<T>(url, { signal });
    setState((prevState) => ({
      ...prevState,
      loading: false,
      data: response.data,
      error: null, // Clear any previous error
    }));
    return true; // Success
  } catch (error: any) {
    if (error.name === "CanceledError" || error.name === "AbortError") {
      console.log("Request was aborted.");
      return;
    }
    let errorMessage: string = "Error";
    console.log("Error message for deployment" + errorMessage);
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

    /* setState((prevState) => ({
        ...prevState,
        loading: false,
        error: errorMessage,
        data: null, // Clear data on final error
      }));*/
    return false;
  }
}
