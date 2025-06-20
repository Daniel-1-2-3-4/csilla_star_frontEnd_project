import { Card } from "@/components/ui/card";
import type { FC } from "react";
import DecryptedText from "./DecryptedText";

interface ErrProps {
  err: string;
}

const Err: FC<ErrProps> = ({ err }) => {
  return (
    <Card className="w-full h-full bg-pink-500/30 backdrop-blur-sm flex pointer-events-none justify-center items-center">
      <DecryptedText
        text={`${err}`}
        speed={100}
        maxIterations={20}
        characters="ABCD1234!.?"
        sequential={true}
        className="revealed"
        animateOn="view"
        revealDirection="start"
        encryptedClassName="encrypted"
      />
    </Card>
  );
};

export default Err;
