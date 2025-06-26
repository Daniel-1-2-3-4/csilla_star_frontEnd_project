import axios from "axios";

export async function postOldData(oldData: Object[] | null) {
  const url =
    "https://csilla-star-backend-project.onrender.com/v1/subjectdate/api/oldData";
  if (oldData) {
    const dataToSend: Object[] | null = oldData;

    try {
      const response = await axios.post(url, dataToSend);
      console.log("Success:", response.data);
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      localStorage.removeItem("date");
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
  }
  return null;
}
