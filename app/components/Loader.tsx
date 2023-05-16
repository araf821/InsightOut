import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-[25vh] items-center justify-center sm:h-[31vh] md:h-[40vh] lg:h-[57vh] ">
      <HashLoader size={100} color="#1F2937" />
    </div>
  );
};
export default Loader;
