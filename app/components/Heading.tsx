interface HeadingProps {
  title: string;
  center?: boolean;
  small?: boolean;
  bold?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, center, small, bold }) => {
  return (
    <div>
      <p
        className={`${center && "text-center"} ${
          small
            ? "text-2xl sm:text-3xl lg:text-4xl"
            : "text-4xl sm:text-5xl lg:text-6xl"
        } balance`}
      >
        <span
          className={`font-josefin ${bold ? "font-bold" : "font-semibold"}`}
        >
          {title}
        </span>
      </p>
      <hr
        className={`${center && "mx-auto"} w-12 border-4 border-accent md:w-20`}
      />
    </div>
  );
};
export default Heading;
