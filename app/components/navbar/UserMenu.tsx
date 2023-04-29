import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { BsPenFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

const UserMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row gap-4 items-center justify-center">
        <div
          onClick={() => {}}
          className="
        hidden md:flex
        items-center
        hover:text-white
        hover:bg-transparent
        text-lg font-bold
        gap-2 px-6 py-2
        border-white border-[2px]
        rounded-lg
       bg-white
       text-black
        transition
        duration-300
        cursor-pointer
      "
        >
          <BsPenFill />
          Write
        </div>

        <div
          onClick={toggleDropdown}
          className="flex items-center gap-4 px-4 py-1.5 border-white border-[2px]
        rounded-lg cursor-pointer text-white hover:text-black hover:bg-white text-[32px] transition duration-300"
        >
          <GiHamburgerMenu />
          <div>
            <Avatar src={null} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            w-[60vw] md:w-[40vw] lg:w-[15vw] min-w-[250px] max-w-[500px]
            overflow-hidden
            right-0 top-20
            text-md text-black
            shadow-lg
          "
        >
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => {}} label="Login" />
          </div>
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => {}} label="Sign Up" />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
