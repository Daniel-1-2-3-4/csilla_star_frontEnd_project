import Menu from "./Menu";
import Subject from "./Subject";
import { Routes, Route } from "react-router-dom";

const fetchStarAmount = () => {
  //logic
  return 2; //star amount int
};

const SubjectArray = ["Deutsch", "Gk", "Englisch", "Ethik", "Mathe"];
const Content = () => {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route key={"Route Menu"} path="/" element={<Menu></Menu>} />
        {SubjectArray.map((e, i) => (
          <Route
            key={"Route " + i}
            path={`/${e.toLowerCase()}`}
            element={<Subject subject={e} starAmount={fetchStarAmount()} />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default Content;
