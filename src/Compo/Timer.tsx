import { Star } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

interface TimerProps {
  subject: string;
}

const Timer: FC<TimerProps> = ({ subject }) => {
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const navigate = useNavigate();

  const saveLocally = (subject: string) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const timeElements = formattedDate.split("."); //[day,month,year]
    const dbDate = timeElements[2] + timeElements[1] + timeElements[0];
    //if fetch failed 
    localStorage.setItem(subject, dbDate);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isStarted) {
      if (timeLeft === 0) {
        saveLocally(subject);
        setIsStarted(false);
        setTimeLeft(5);
        navigate("/");
        return;
      }

      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, isStarted, navigate, subject]);

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
    <div className="w-full h-full flex items-center flex-col justify-around">
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
