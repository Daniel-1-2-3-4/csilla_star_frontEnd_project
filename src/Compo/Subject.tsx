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
      <div className="w-full h-1/5 flex justify-center items-end font-bold text-3xl">
        {subject}
      </div>
      <div className="w-full h-4/5 flex justify-center items-start mt-[12dvh]">
        <div className="border-amber-100 border-2 rounded backdrop-blur-sm bg-pink-500/30 w-3/4 h-1/2">
          <Timer subject={subject}></Timer>
        </div>
        {subject === "Mathe" ? (
          <>
            <Math_Categories />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Subject;
