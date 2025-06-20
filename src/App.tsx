import skyBackground from "./assets/Himmel.jpg";
import Content from "./Compo/Content";
import Date from "./Compo/Date";
import Sidebar from "./Compo/Sidebar";
import Streak from "./Compo/Streak";

const App = () => {
  // when internet connection POST locally stored data in backend
  const postOldData = () => {
    //logic
  };

  return (
    <div
      onLoad={() => postOldData}
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
