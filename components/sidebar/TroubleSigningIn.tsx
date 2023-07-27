"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { BsCaretDownSquareFill, BsFillCaretDownFill } from "react-icons/bs";

interface TroubleSigningInProps {}

const TroubleSigningIn: FC<TroubleSigningInProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="mx-auto flex cursor-pointer items-center justify-center gap-2">
        <p
          onClick={() => setIsOpen(!isOpen)}
          className="text-lg font-semibold text-black"
        >
          Trouble signing in?
        </p>
        <BsFillCaretDownFill
          className={`transition duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 1 }}
            exit={{ height: 0, opacity: 1, transition: { duration: 0.2 } }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            className="overflow-hidden rounded-lg border-2 border-zinc-800"
          >
            <p className="text-neutral-900 balance text-center m-2">
              You cannot use the same email for more than one of the above links.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default TroubleSigningIn;
