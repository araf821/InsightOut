"use client";

import { FC, useEffect, useMemo, useState } from "react";

interface TemplateLoaderProps {}

const TemplateLoader: FC<TemplateLoaderProps> = ({}) => {
  const texts = useMemo(() => ["Loading...", "Please wait.", "Almost there!"], []);
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
      <span className="loader" />
      <p className="text-light md:text-lg -mt-20 font-merri">{loadingText}</p>
    </div>
  );
};

export default TemplateLoader;
