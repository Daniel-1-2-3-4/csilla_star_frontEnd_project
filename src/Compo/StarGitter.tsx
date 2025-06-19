import React from "react";
import { Star } from "lucide-react";

interface StarGitterProps {
  amount: number;
}

type StarPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size?: number;
};

const starPositions: StarPosition[] = [
  // 🌟 TOP-ALIGNED STARS
  { top: "8%", left: "23%", size: 28 },
  { top: "12%", left: "75%", size: 20 },
  { top: "15%", left: "10%", size: 24 },
  { top: "18%", left: "19%", size: 32 },
  { top: "22%", left: "37%", size: 22 },
  { top: "27%", left: "72%", size: 26 },
  { top: "29%", left: "83%", size: 22 },
  { top: "31%", left: "58%", size: 30 },
  { top: "39%", left: "6%", size: 24 },
  { top: "42%", left: "36%", size: 28 },
  { top: "46%", left: "69%", size: 24 },
  { top: "52%", left: "60%", size: 26 },
  { top: "54%", left: "29%", size: 20 },
  { top: "62%", left: "59%", size: 24 },
  { top: "63%", left: "14%", size: 30 },
  { top: "69%", left: "43%", size: 32 },
  { top: "77%", left: "68%", size: 28 },
  { top: "84%", left: "90%", size: 22 },

  // 🌟 BOTTOM-ALIGNED STARS
  { bottom: "4%", left: "12%", size: 26 },
  { bottom: "6%", right: "41%", size: 20 },
  { bottom: "9%", left: "77%", size: 28 },
  { bottom: "11%", right: "79%", size: 28 },
  { bottom: "14%", right: "22%", size: 24 },
  { bottom: "18%", left: "27%", size: 30 },
  { bottom: "19%", right: "38%", size: 22 },
  { bottom: "23%", right: "57%", size: 24 },
  { bottom: "26%", right: "66%", size: 24 },
  { bottom: "38%", right: "9%", size: 32 },
  { bottom: "42%", left: "33%", size: 26 },
  { bottom: "51%", right: "%", size: 30 },
];

const StarGitter: React.FC<StarGitterProps> = ({ amount }) => {
  const starsToShow = starPositions.slice(0, amount);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {starsToShow.map((pos, index) => (
        <div
          key={index}
          className="absolute text-yellow-400"
          style={{
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right,
          }}
        >
          <Star size={pos.size ?? 24} />
        </div>
      ))}
    </div>
  );
};

export default StarGitter;
