import Menu from "./Menu";
import Subject from "./Subject";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const fetchStarAmount = (subject: String) => {
  //logic
  return 2; //star amount int
};

const SubjectArray = ["Deutsch", "GK", "Englisch", "Ethik", "Mathe"];

const Content = () => {
  return (
    <div className="w-[90dvw] h-[90dvh]">
      <Routes>
        <Route key={"Route Menu"} path="/" element={<Menu></Menu>} />
        {SubjectArray.map((e, i) => (
          <Route
            key={"Route " + i}
            path={`/${e.toLowerCase()}`}
            element={<Subject subject={e} starAmount={fetchStarAmount(e)} />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default Content;
