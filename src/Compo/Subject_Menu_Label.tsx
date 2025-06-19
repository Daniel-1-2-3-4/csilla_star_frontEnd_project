import { type FC } from "react";
import type { Categories } from "./Sidebar";
import { useNavigate } from "react-router-dom";

interface Subject_Menu_LabelProps {
  Subject_Menu_name: String;
  pinned: boolean;
  onSelect: (key: keyof Categories) => void;
}

const Subject_Menu_Label: FC<Subject_Menu_LabelProps> = ({
  Subject_Menu_name,
  onSelect,
  pinned,
}) => {
  const navigate = useNavigate();

  const handleClick = (Subject_Menu_name: String) => {
    if (Subject_Menu_name == "Menü") {
      navigate("/");
    } else {
      navigate(`/${Subject_Menu_name.toLowerCase()}`);
    }
  };

  return (
    <div
      className={`relative ${
        pinned && "-translate-x-[20%]"
      }   border-2 mb-[0.2dvh] bg-blue-600 w-[125%] rounded p-1 transition-transform duration-500 transform  flex justify-start bg text-l`}
      onClick={() => {
        handleClick(Subject_Menu_name),
          onSelect(Subject_Menu_name as keyof Categories);
      }}
    >
      {Subject_Menu_name}
    </div>
  );
};

export default Subject_Menu_Label;
