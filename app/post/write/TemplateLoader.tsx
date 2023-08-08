"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { HashLoader } from "react-spinners";

interface TemplateLoaderProps {}

const TemplateLoader: FC<TemplateLoaderProps> = ({}) => {
  const texts = useMemo(
    () => ["Generating Post...", "Gathering ideas...", "Almost there!"],
    []
  );
  const [loadingText, setLoadingText] = useState(texts[0]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentIndex = texts.indexOf(loadingText);
      const nextIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[nextIndex]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [loadingText, texts]);

  return (
    <div className="min-h-44 grid h-56 place-items-center">
      {/* <span className="loader" /> */}
      <HashLoader size={60} color="#E52B50" />
      <p className="text-light -mt-20 md:text-lg">{loadingText}</p>
    </div>
  );
};

export default TemplateLoader;
