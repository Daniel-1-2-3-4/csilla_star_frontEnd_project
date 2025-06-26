import { useEffect } from "react";
import skyBackground from "./assets/Himmel.jpg";
import Content from "./Compo/Content";
import Date from "./Compo/Date";
import Sidebar from "./Compo/Sidebar";
import Streak from "./Compo/Streak";
import { barChartTables } from "./Compo/LocalDBMS/LocalServiceBarChart";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("ini") == "true") {
      barChartTables.initializeSubjects();
      localStorage.setItem("ini", "true");
    }
  }),
    [];
  return (
    <div
      className=" overflow-hidden absolute h-[100dvh] w-[100dvw] bg-cover px-4  flex-col"
      style={{ backgroundImage: `url(${skyBackground})` }}
    >
      <div className="w-full flex flex-col justify-center h-[10dvh]">
        <Date />
        <Streak />
      </div>
      <div className="flex p-0 h-[90dvh] w-full">
        <Content />
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
