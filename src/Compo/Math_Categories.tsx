import React, { useState, type FC } from "react";
import axios from "axios";

const Math_Categories: FC = () => {
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>(
    {}
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
  };

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

  const formatDisplay = (text: string): string => {
    return text.replace(/_/g, " ").replace(/[1-8]/, "");
  };

  const prepareChaptersForSending = (
    originalChapters: Record<string, string | number>
  ) => {
    // Corrected type for filteredChapters
    const filteredChapters: { [key: string]: boolean } = {}; // Or Record<string, boolean>

    for (const key in originalChapters) {
      // Check if the value is not a string (i.e., it's a number, representing a sub-chapter)
      if (typeof originalChapters[key] !== "string") {
        filteredChapters[key] = false; // Now TypeScript knows 'key' is a string index and 'false' is a boolean value
      }
    }
    return filteredChapters;
  };

  const postData = async (chapters: Record<string, string | number>) => {
    const url = "http://localhost:8080/v1/mathprogress/api";
    const dataToSend = prepareChaptersForSending(chapters);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        //no internet
      }
    } catch (error) {
      console.error("Error sending data:", error);
      // You might want to throw the error again or return null/undefined
      throw error; // Re-throw to allow calling code to handle it
    }
  };

  const handleClick = () => {
    setExtend(!extended);
    postData(chapters);
  };

  return (
    <>
      <div
        className={`
          bg-black rounded-tr-3xl rounded-tl-3xl absolute text-white w-full h-full flex flex-col items-center p-2.5 overflow-x-hidden
          transition-transform duration-500 ease-out z-0
          ${extended ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="w-full h-full max-h-full overflow-y-auto">
          {Object.entries(chapters).map(([chapterName, chapterData], i) => {
            if (typeof chapterData === "number") {
              return (
                <div key={chapterName} className="mb-2">
                  <div className="flex border-white border-b-2 w-full max-w-full h-fit pt-1 pb-1 justify-start items-center">
                    <input
                      type="checkbox"
                      checked={checkedStates[chapterName] || false}
                      onChange={(e) => handleCheckboxChange(e, chapterName)}
                      className="mr-2"
                    />
                    <p
                      className={` w-full max-w-full break-word ${
                        checkedStates[chapterName] ? "line-through" : ""
                      }`}
                    >
                      {`${chapterData}. ${formatDisplay(chapterName)}`}
                    </p>
                  </div>
                </div>
              );
            } else if (typeof chapterData === "string") {
              return (
                <div key={chapterName} className="mt-4 ">
                  <div className="w-full text-xl flex justify-start font-semibold">
                    {`${chapterData} ${chapterName}`}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="w-full h-fit bg-pink-500 absolute bottom-0 text-xl text-white rounded-tr-2xl rounded-tl-2xl flex justify-center z-10"
      >
        {extended == false ? "Extend" : "Collapse"}
      </button>
    </>
  );
};

export default Math_Categories;
