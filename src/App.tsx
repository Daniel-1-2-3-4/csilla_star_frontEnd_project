import { useEffect } from "react";
import skyBackground from "./assets/Himmel.jpg";
import Content from "./Compo/Content";
import Date from "./Compo/Date";
import Sidebar from "./Compo/Sidebar";
import Streak from "./Compo/Streak";
import axios from "axios";

const App = () => {
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

  const postData = async (oldData: Object[] | null) => {
    const url =
      "https://csilla-star-backend-project.onrender.com/v1/subjectdate/api/oldData";

    const dataToSend: Object[] | null = oldData;
    if (dataToSend == null) {
      console.log("No old data to send");
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

  // Example fetch request to URL x

  return (
    <div
      className=" overflow-hidden absolute h-[100dvh] w-[100dvw] bg-cover px-4  flex-col"
      style={{ backgroundImage: `url(${skyBackground})` }}
    >
      <div className="w-full flex flex-col justify-center h-[10dvh]">
        <Date></Date>
        <Streak></Streak>
      </div>
      <div className="flex p-0 h-[90dvh] w-full">
        <Content></Content>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
};

export default App;
