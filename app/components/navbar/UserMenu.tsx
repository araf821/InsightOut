import { BsPenFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const UserMenu = () => {
  return (
    <div className="flex flex-row gap-8 items-center justify-center">
      <div
        className="
      hidden md:flex
      items-center
      text-white
      text-lg
      gap-2 px-6 py-2
      border-white border-[2px]
      rounded-lg
      hover:bg-white
      hover:text-black
      hover:border-red
      transition
      duration-300
      cursor-pointer
      "
      >
        <BsPenFill />
        Write
      </div>

      <div>
        <GiHamburgerMenu className="text-white text-[36px] cursor-pointer" />
      </div>
    </div>
  );
};
export default UserMenu;
