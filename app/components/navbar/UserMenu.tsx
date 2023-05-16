"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsPenFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: SafeUser | null | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const router = useRouter();
  const dropdownRef = useRef<any>(null);
  const menuBtnRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback((e: any) => {
    if (!dropdownRef?.current?.contains(e.target)) {
      if (!menuBtnRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, [handleClickOutside]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-center gap-4">
        <div
          onClick={() => router.push("/explore")}
          className=" hidden cursor-pointer px-6 py-2 text-xl font-bold text-white transition hover:translate-x-1 md:block"
        >
          Explore
        </div>
        <div
          onClick={() => router.push("/post/write")}
          className="
        hidden cursor-pointer
        items-center
        gap-2
        rounded-lg
        border-[2px] border-white
        bg-white px-6 py-2
        text-lg font-bold
        text-black
       transition
       duration-300
        hover:bg-transparent
        hover:text-white
        md:flex
        "
        >
          <BsPenFill />
          Write
        </div>

        <div
          ref={menuBtnRef}
          onClick={() => {
            toggleDropdown();
          }}
          className="flex cursor-pointer items-center gap-4 rounded-lg border-[2px] border-white
        bg-white px-4 py-1.5 text-[32px] text-black transition duration-300 hover:bg-transparent hover:text-white"
        >
          <GiHamburgerMenu />
          <div>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {/* {isOpen && ( */}
      <div
        ref={dropdownRef}
        className={`
            text-md
            absolute
            right-0 top-20 z-50 w-[60vw] min-w-[250px]
            max-w-[500px]
            overflow-hidden rounded-xl
            text-black shadow-lg
            transition
            duration-300
            md:w-[40vw]
            lg:w-[15vw]
            ${
              isOpen
                ? "translate-y-0"
                : currentUser
                ? "-translate-y-96 duration-500"
                : "-translate-y-56"
            }
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
      >
        <div className="flex cursor-pointer flex-col">
          {currentUser ? (
            <>
              <MenuItem
                onClick={() => {
                  router.push("/dashboard");
                  toggleDropdown();
                }}
                label="Dashboard"
              />
              <MenuItem
                onClick={() => {
                  router.push("/post/write");
                  toggleDropdown();
                }}
                label="Write A New Post"
              />
              <MenuItem
                onClick={() => {
                  router.push('/drafts');
                  toggleDropdown();
                }}
                label="Drafts"
              />
              <hr />
              <MenuItem
                onClick={() => {
                  router.push("/settings");
                  toggleDropdown();
                }}
                label="Settings"
              />
              <MenuItem onClick={() => signOut()} label="Sign Out" />
            </>
          ) : (
            <>
              <MenuItem onClick={loginModal.open} label="Login" />
              <MenuItem onClick={registerModal.open} label="Sign Up" />
            </>
          )}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
export default UserMenu;
