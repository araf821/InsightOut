"use client";
import React, { useEffect, useState } from "react";

interface ConsoleTextProps {
  words: string[];
  id: string;
}

const ConsoleText: React.FC<ConsoleTextProps> = ({ words, id }) => {
  const [letterCount, setLetterCount] = useState(1);
  const [x, setX] = useState(1);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const interval1 = setInterval(() => {
      if (letterCount === 0 && !waiting) {
        setWaiting(true);
        const target = document.getElementById(id);
        if (target) {
          target.innerHTML = words[0].substring(0, letterCount);
          setTimeout(() => {
            const usedWord = words.shift();
            words.push(usedWord!);
            setX(1);
            setLetterCount(letterCount + x);
            setWaiting(false);
          }, 500);
        }
      } else if (letterCount === words[0].length + 1 && !waiting) {
        setWaiting(true);
        setTimeout(() => {
          setX(-1);
          setLetterCount(letterCount + x);
          setWaiting(false);
        }, 500);
      } else if (!waiting) {
        const target = document.getElementById(id);
        if (target) {
          target.innerHTML = words[0].substring(0, letterCount);
          setLetterCount(letterCount + x);
        }
      }
    }, 20);

    return () => {
      clearInterval(interval1);
    };
  }, [id, letterCount, waiting, words, x]);

  return (
    <div>
      <div className="text-center font-[cursive] h-12 text-base text-zinc-800 sm:text-lg md:text-xl lg:text-2xl">
        <span>We are </span>
        <span id={id} />
        <span className="animate-ping">_</span>
      </div>
    </div>
  );
};

export default ConsoleText;
