import { FC } from "react";

interface PostTitleProps {
    title: string;
}

const PostTitle: FC<PostTitleProps> = ({title}) => {
  return (
    <div>
      <p
        className={`${center && "text-center"} ${
          small
            ? "text-2xl sm:text-3xl lg:text-4xl"
            : "text-4xl sm:text-5xl lg:text-6xl"
        } balance overflow font-josefin ${
          bold ? "font-bold" : "font-semibold"
        } ${white ? "text-white" : ""}`}
      >
        {post ? (
          <span>{title}</span>
        ) : (
          <>
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
                {letter === " " ? "\u00A0" : letter === "*" ? "\n" : letter}
              </motion.span>
            ))}
          </>
        )}
        {/* {title} */}
      </p>
      <motion.hr
        initial={{ opacity: 0 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
        className={`${center && "mx-auto"} w-12 border-4 border-accent md:w-20`}
      />
    </div>
  );
};

export default PostTitle;
