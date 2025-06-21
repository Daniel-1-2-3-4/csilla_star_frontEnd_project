import { useState, type FC } from "react";
import AnimatedList from "./AnimatedList";
//import axios from "axios";

const Math_Categories: FC = () => {
  /*const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>(
    
  );

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    chapterKey: string // Der Schlüssel des Kapitels, dessen Checkbox geändert wurde
  ) => {
    setCheckedStates((prevStates) => ({
      ...prevStates,
      [chapterKey]: event.target.checked,
    }));

    //logic POST, PUT
  };*/

  const [extended, setExtend] = useState<boolean>(false);

  const chapters = {
    // From Titles3.jpg
    Grundlagen_der_Differenzialrechnung: "I", // Main chapter
    Check_in1: 1,
    Steigung_und_Tangente: 2,
    Ableitungsregeln_und_höhere_Ableitungen: 3,
    Untersuchung_von_Funktionen_und_deren_Ableitung: 4,
    Extremwerte: 5,
    Monotonie_und_Krümmung: 6,
    Parameteraufgaben: 7,
    Differenzialrechnung_in_Sachsituationen: 8,
    Training1: 9,
    Rückblick1: 10,
    Test1: 11,

    Exponentialfunktionen: "II", // Main chapter
    Check_in2: 1,
    Die_natürliche_Exponentialfunktion_und_die_Eulersche_Zahl_e: 2,
    Exponentialgleichungen_und_natürlicher_Logarithmus: 3,
    Exponentialfunktionen_und_ihre_Graphen: 4,
    Wachstum_von_Größen_im_Alltag: 5,
    Anwendungen_von_Exponentialfunktionen: 6,
    Training2: 7,
    Rückblick2: 8,
    Test2: 9,

    Integralrechnung: "III", // Main chapter
    Check_in3: 1,
    Rekonstruieren_einer_Größe: 2,
    Das_Integral_als_orientierter_Flächeninhalt: 3,
    "Der_Hauptsatz_der_Differenzial-_und_Integralrechnung": 4,
    Bestimmen_von_Stammfunktionen: 5,
    Stammfunktionen_und_ihre_Graphen: 6,
    Integral_und_Flächeninhalt: 7,
    Training3: 8,
    Rückblick3: 9,
    Test3: 10,

    // From Titles2.jpg
    Funktionen_und_ihre_Graphen: "IV", // Main chapter
    Check_in4: 1,
    "Strecken,_Verschieben_und_Spiegeln_von_Graphen": 2,
    Stauchen_und_Strecken_von_Graphen: 3,
    Graphen_von_Gleichungen: 4,
    Gleichungen_von_Graphen_untersuchen: 5,
    Anwendungen_von_Graphen_und_Funktionen: 6,
    Training4: 7,
    Rückblick4: 8,
    Test4: 9,

    Lineare_Gleichungssysteme: "V", // Main chapter
    Check_in5: 1,
    "Das_Gauß-Verfahren": 2,
    Anwendungen_linearer_Gleichungssysteme: 3,
    Training5: 4,
    Rückblick5: 5,
    Test5: 6,

    Geraden_und_Ebenen: "VI", // Main chapter
    Check_in6: 1,
    Vektoren_im_Raum: 2,
    "Geraden_im_Raum_-_Parameterform": 3,
    Zueinander_orthogonale_Vektoren: 4,
    Koordinatensysteme_und_Ebenen: 5,
    Ebenengleichungen_umformen: 6,
    Das_Vektorprodukt: 7,
    Ebenen_veranschaulichen: 8,
    Gegenseitige_Lage_von_Ebenen_und_Geraden: 9,
    Gegenseitige_Lage_von_Ebenen: 10,
    Training6: 11,
    Rückblick6: 12,
    Test6: 13,

    // From Tiltes1.jpg
    Abstände_und_Winkel: "VII", // Main chapter
    Check_in7: 1,
    Abstände_eines_Punktes_von_einer_Ebene: 2,
    Spiegelung_und_Symmetrie: 3,
    Winkel_und_Skalarprodukt: 4,
    Schnittwinkel: 5,
    Anwendungen_des_Vektorprodukts: 6,
    Abstandsproblemen_von_Geradenlinien: 7,
    Training7: 8,
    Rückblick7: 9,
    Test7: 10,

    Wahrscheinlichkeit_und_Statistik: "VIII", // Main chapter
    Check_in8: 1,
    Zufallsvariablen_und_Erwartungswert: 2,
    Binomialverteilung_und_stochastische_Unabhängigkeit: 3,
    Normalverteilung: 4,
    Erwartungswert_und_Histogramm: 5,
    Abweichung_von_der_Normalverteilung: 6,
    Training8: 7,
    Rückblick8: 8,
    Test8: 9,

    Grundwissen: "IX", // Assuming this is a main section and assigning IX
    Vorbereitung_auf_die_mündliche_Abiturprüfung: 1,
    Training9: 2,
    Mathematische_Begriffe_und_Bezeichnungen: 5,
    Gesamtübersicht_der_Codes_im_Buch: 6,
  };

  //Content
  const [items] = useState<string[]>([]);
  const [delayedExtend, setDelayedExtend] = useState<string>("z-0");

  const formatDisplay = (text: string): string => {
    return text.replace(/_/g, " ").replace(/[1-8]/, "");
  };

  const loadIntoList = (originalChapters: Record<string, string | number>) => {
    for (const key in originalChapters) {
      items.push(`${originalChapters[key]} ${formatDisplay(key)}`);
    }
  };
  const updateDelayedExtend = () => {
    if (delayedExtend == "z-0") {
      setDelayedExtend("z-20");
    } else {
      setTimeout(() => {
        setDelayedExtend("z-0");
      }, 1000);
    }
  };

  const handleClick = () => {
    setExtend(!extended);
    loadIntoList(chapters);
    updateDelayedExtend();
  };

  const selectChapter = (item: String) => {
    //POST
    console.log(item);
  };

  return (
    <div className={`relative w-full h-full ${delayedExtend}`}>
      {/* Changed to relative and added overflow-hidden */}
      <div
        className={`
              bg-black rounded-tr-3xl rounded-tl-3xl absolute text-white w-full h-full flex flex-col items-center overflow-x-hidden
              transition-transform duration-500 ease-out
              ${extended ? "translate-y-0 " : "translate-y-[100%]"}
            `}
      >
        <AnimatedList
          className={`max-w-full`}
          items={items}
          onItemSelect={(item) => selectChapter(item)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className={`w-full bottom-0 h-fit bg-pink-500 absolute text-xl text-white rounded-tr-2xl rounded-tl-2xl flex justify-center z-10`}
      >
        {extended === false ? "Extend" : "Collapse"}
      </button>
    </div>
  );
};

export default Math_Categories;
