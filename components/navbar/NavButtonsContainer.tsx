import { FC, useContext } from "react";
import NavButton from "./NavButton";

import { FaSearch, FaPenFancy } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { SidebarContext } from "@/app/context/sidebar_context";

interface NavButtonsContainerProps {}

const NavButtonsContainer: FC<NavButtonsContainerProps> = ({}) => {
  const router = useRouter();
  const { openSidebar, closeSidebar } = useContext(SidebarContext);

  return (
    <div className="flex items-center justify-center gap-3">
      <NavButton
        title="Explore"
        icon={FaSearch}
        onClick={() => {
          router.push("/explore");
          closeSidebar();
        }}
      />
      <NavButton
        title="Write"
        icon={FaPenFancy}
        onClick={() => {
          router.push("/post/write");
          closeSidebar();
        }}
      />
      <NavButton title="Profile" icon={BsPersonFill} onClick={openSidebar} />
    </div>
  );
};

export default NavButtonsContainer;
