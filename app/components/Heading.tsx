interface HeadingProps {
  title: string;
  center?: boolean;
  small?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, center, small }) => {
  return (
    <>
      <p
        className={`${center && "text-center"} ${
          small
            ? "text-2xl sm:text-3xl lg:text-4xl"
            : "text-4xl sm:text-5xl lg:text-6xl"
        }`}
      >
        <span className="font-josefin font-semibold">{title}</span>
      </p>
      <hr
        className={`${center && "mx-auto"} w-12 border-4 border-accent md:w-20`}
      />
    </>
  );
};
export default Heading;
