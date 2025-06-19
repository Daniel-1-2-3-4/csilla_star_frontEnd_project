import { useState } from "react";

const Streak = () => {
  const [streak] = useState<number>(0);

  //const fecthStreak = () => {};

  return (
    <div className="w-full h-fit flex text-[#510065] text-xl font-bold justify-start">
      <p>Streak:</p>
      <p className="ml-2">{streak}</p>
    </div>
  );
};

export default Streak;
