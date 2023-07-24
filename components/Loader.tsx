import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-[75vh] items-center justify-center sm:h-[65vh] lg:h-[70vh] ">
      <HashLoader size={100} color="#4685ff" />
    </div>
  );
};
export default Loader;
