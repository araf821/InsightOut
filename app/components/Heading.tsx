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
      className={`${pacifico.className} mx-auto py-10 w-full flex flex-col justify-center gap-4`}
    >
      <p className={`text-4xl text-zinc-800 ${center && "text-center"} `}>
        {title}
      </p>
      <hr />
    </div>
  );
};
export default Heading;
