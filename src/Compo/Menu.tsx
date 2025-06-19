import { Math_Process_Chart } from "./Math_Process_Chart";
import { SUbject_Stacked_BarChart } from "./Subject_Stacked_BarChart";
import { ChartBarMixed } from "./SubjectBarChart";

const Menu = () => {
  return (
    <div className="overflow-y-auto pr-[10dvw] w-full h-full">
      <div className="w-full h-1/3 mb-[1dvh] flex justify-center items-center">
        <ChartBarMixed></ChartBarMixed>
      </div>
      <div className="w-full h-1/3 mb-[1dvh] flex justify-center items-center">
        <SUbject_Stacked_BarChart></SUbject_Stacked_BarChart>
      </div>
      <div className="w-full h-1/3 mb-[1dvh] flex justify-center items-center">
        <Math_Process_Chart></Math_Process_Chart>
      </div>
    </div>
  );
};

export default Menu;
