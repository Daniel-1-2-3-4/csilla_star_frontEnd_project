import { useEffect, useState } from "react";
import Subject_Menu_Label from "./Subject_Menu_Label";
import { useLocation } from "react-router-dom";

export interface Categories {
  Menü: boolean;
  Deutsch: boolean;
  Gk: boolean;
  Englisch: boolean;
  Ethik: boolean;
  Mathe: boolean;
}

const Sidebar = () => {
  const [categorieState, setCategorieState] = useState<Categories>({
    Menü: true,
    Deutsch: false,
    Gk: false,
    Englisch: false,
    Ethik: false,
    Mathe: false,
  });

  const selectCategorie = (key: keyof Categories) => {
    setCategorieState((prevState) => {
      const newState: Categories = { ...prevState };
      for (const categoryName in newState) {
        if (Object.prototype.hasOwnProperty.call(newState, categoryName)) {
          newState[categoryName as keyof Categories] = false;
        }
      }
      newState[key] = true;
      return newState;
    });
  };

  const location = useLocation();
  useEffect(() => {
    const locationName = location.pathname.replace("/", "");
    const capitalizedLocationName =
      locationName.charAt(0).toUpperCase() + locationName.slice(1);

    // Only select if the category exists in Categories
    if (capitalizedLocationName && capitalizedLocationName in categorieState) {
      selectCategorie(capitalizedLocationName as keyof Categories);
    } else {
      selectCategorie("Menü");
    }
  }, [location]);

  return (
    <div className="absolute h-[25dvh] min-w-fit flex flex-col justify-evenly right-[-1px] mt-[2dvh]">
      {Object.entries(categorieState).map(([key, isSelected], i) => (
        <Subject_Menu_Label
          key={"Subject_Menu_Label_key_" + i}
          pinned={isSelected}
          Subject_Menu_name={key}
          onSelect={selectCategorie}
        />
      ))}
    </div>
  );
};

export default Sidebar;
