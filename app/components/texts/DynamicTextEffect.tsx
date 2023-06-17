import { FC } from "react";
import ConsoleText from "./ConsoleText";

interface DynamicTextEffectProps {}

const DynamicTextEffect: FC<DynamicTextEffectProps> = ({}) => {
  return (
    <div className="text-black">
      <ConsoleText
        words={[
          "more than just a blog.",
          "the dreamers of improbable dreams.",
          "the architects of virtual unicorns.",
        ]}
        id="dynamicText"
      />
    </div>
  );
};

export default DynamicTextEffect;
