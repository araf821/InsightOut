import { FC } from "react";
import ConsoleText from "./ConsoleText";

interface DynamicTextEffectProps {}

const DynamicTextEffect: FC<DynamicTextEffectProps> = ({}) => {
  return (
    <div className="text-black w-full">
      <ConsoleText
        words={[
          "more than just a blog.",
          "the creators of digital mayhem.",
          "the conjurers of code and chaos.",
          "the time-travelers of innovation.",
          "the the adventurers in the realms of imagination.",
        ]}
        id="dynamicText"
      />
    </div>
  );
};

export default DynamicTextEffect;
