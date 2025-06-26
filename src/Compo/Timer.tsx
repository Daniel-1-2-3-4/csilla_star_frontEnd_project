import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom"; // Import useLocation
import { incrementHoursByOne } from "./LocalDBMS/LocalServiceBarChart";
import { UnsendData } from "./LocalDBMS/LocalServieUnsendBarCharts";

type dataToSendType = {
  [key: string]: string;
};

interface TimerProps {
  subject: string;
}

const Timer: FC<TimerProps> = ({ subject }) => {
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const navigate = useNavigate();

  const getTime = () => {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0, 10);
  };

  const postData = async (subjectName: string) => {
    const url =
      "https://csilla-star-backend-project.onrender.com/v1/subjectdate/api";
    const timeElements: string = getTime();
    const dbTime = timeElements;

    const dataToSend: dataToSendType = {
      date: dbTime,
      subject: subjectName,
    };

    try {
      const response = await axios.post(url, dataToSend); // Await the promise from axios.post
      console.log("Success:", response.data);
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      return true; // This true is now the resolved value of the Promise returned by postData
    } catch (error: any) {
      // Type 'any' for error caught from unknown sources
      if (axios.isAxiosError(error)) {
        // Check if it's an Axios error for specific handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error Response Data:", error.response.data);
          console.error("Error Response Status:", error.response.status);
          console.error("Error Response Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error Request:", error.request);
          console.error(
            "No response received from server. Check network or server status."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error Message:", error.message);
        }
        console.error("Error Config:", error.config);
      } else {
        // Handle non-Axios errors
        console.error("An unexpected error occurred:", error);
      }
      return false; // This false is now the resolved value of the Promise returned by postData
    }
  };

  const storeInDbAndLocal = async () => {
    const successfullPost = await postData(subject);
    if (!successfullPost) {
      const date = getTime();
      UnsendData.addUnSendSubject(subject, date);
    }
    incrementHoursByOne(subject);

    setIsStarted(false);
    setTimeLeft(5);
    navigate("/");
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isStarted) {
      if (timeLeft === 0) {
        storeInDbAndLocal();
        return;
      }

      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, isStarted, navigate, subject]);

  useEffect(() => {
    // This effect runs whenever 'subject' prop changes
    // It resets the timer state, regardless of whether it was running.
    setIsStarted(false); // Stop the timer if it was running
    setTimeLeft(5); // Reset time left
  }, [subject]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsStarted(true);
  };

  return (
    <div className="w-full h-full flex items-center absolute flex-col justify-around">
      <h1 className="sm: text-6xl md:text-8xl lg:text-9xl">
        {formatTime(timeLeft)}
      </h1>
      {!isStarted && (
        <button
          type="button"
          className="border-2 border-amber-300 rounded"
          onClick={startTimer}
        >
          <Star></Star>
        </button>
      )}
    </div>
  );
};

export default Timer;
