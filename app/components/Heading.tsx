import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

interface HeadingProps {
  title: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, center }) => {
  return (
    <div
      className={`${pacifico.className} mx-auto flex w-full flex-col justify-center gap-4 py-10`}
    >
      <p
        className={`text-2xl text-zinc-800 sm:text-3xl md:text-4xl lg:text-5xl ${
          center && "text-center"
        } `}
      >
        {title}
      </p>
      <hr />
    </div>
  );
};
export default Heading;
