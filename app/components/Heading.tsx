"use client";

import { motion } from "framer-motion";

interface HeadingProps {
  title: string;
  center?: boolean;
  small?: boolean;
  bold?: boolean;
  post?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  center,
  small,
  bold,
  post,
}) => {
  return (
    <div>
      <p
        className={`${center && "text-center"} ${
          small
            ? "text-2xl sm:text-3xl lg:text-4xl"
            : "text-4xl sm:text-5xl lg:text-6xl"
        } balance font-josefin ${bold ? "font-bold" : "font-semibold"}`}
      >
        {post ? (
          <span>{title}</span>
        ) : (
          <div>
            {Array.from(title).map((letter, index) => (
              <motion.span
                viewport={{ once: true }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.2,
                    delay: index * 0.05,
                  },
                }}
                initial={{
                  opacity: 0,
                  x: -200,
                }}
                key={index}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        )}
        {/* {title} */}
      </p>
      <motion.hr
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`${center && "mx-auto"} w-12 border-4 border-accent md:w-20`}
      />
    </div>
  );
};
export default Heading;
