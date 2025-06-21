import { type FC } from "react";
import StarGitter from "./StarGitter";
import Timer from "./Timer";
import Math_Categories from "./Math_Categories";

interface SubjectProps {
  subject: string; // Changed to 'string' for better type safety
  starAmount: number;
}

const Subject: FC<SubjectProps> = ({ subject, starAmount }) => {
  return (
    <div className="w-full h-full flex-col justify-center">
      <StarGitter amount={starAmount}></StarGitter>
      <div className="w-full h-[20%] flex justify-center items-end font-bold text-3xl">
        {subject}
      </div>
      <p className="h-[15%]"></p>
      <div className="w-full h-[65%] flex flex-col justify-start items-center">
        <div className="border-amber-100- z-10 border-2 rounded backdrop-blur-sm bg-pink-500/30 w-3/4 h-1/3 absolute">
          <Timer subject={subject}></Timer>
        </div>
        {subject === "Mathe" ? (
          <div className="relative w-full h-full">
            <Math_Categories />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Subject;
