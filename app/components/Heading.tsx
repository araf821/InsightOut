interface HeadingProps {
  title: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, center }) => {
  return (
    <>
      <p
        className={`text-4xl sm:text-5xl lg:text-6xl ${
          center && "text-center"
        }`}
      >
        <span className="font-josefin font-semibold">{title}</span>
      </p>
      <hr className="w-12 border-4 border-accent md:w-20" />
    </>
  );
};
export default Heading;
