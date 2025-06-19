import skyBackground from "./assets/Himmel.jpg";
import Content from "./Compo/Content";
import Date from "./Compo/Date";
import Sidebar from "./Compo/Sidebar";
import Streak from "./Compo/Streak";

const App = () => {

  // when internet connection POST locally stored data in backend
  const postOldData = () =>{
    //logic
  }

  return (
    <div onLoad={()=>postOldData}
      className=" absolute overflow-hidden h-[100dvh] w-[100dvw] bg-cover p-4 pr-0 outline-red-600"
      style={{ backgroundImage: `url(${skyBackground})` }}
    >
      <Date></Date>
      <Streak></Streak>
      <div className="flex">
        <Content></Content>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
};

export default App;
