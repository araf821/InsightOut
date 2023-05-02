import { HashLoader } from "react-spinners";

const Loader = () => {
  return <div className="flex items-center justify-center h-[25vh] sm:h-[31vh] md:h-[28vh] lg:h-[45vh]">
    <HashLoader size={100} color="#1F2937"/>
  </div>;
};
export default Loader;
