import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { BsPenFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row gap-8 items-center justify-center">
        <div
          onClick={() => {}}
          className="
        hidden md:flex
        items-center
        text-white
        text-lg font-bold
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

        <div onClick={toggleDropdown}>
          <GiHamburgerMenu className="text-white text-[36px] cursor-pointer" />
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            w-[60vw] md:w-[40vw] lg:w-[15vw] min-w-[250px] max-w-[500px]
            bg-gray-800
            overflow-hidden
            right-0
            top-16
            border-4 border-white
            text-sm text-white
          "
        >
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => {}} label="idk" />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
