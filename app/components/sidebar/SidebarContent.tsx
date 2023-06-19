"use client";

import { SafeUser } from "@/app/types";
import { FC } from "react";
import SidebarButton from "./SidebarButton";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

interface SidebarContentProps {
  currentUser: SafeUser | null;
}

const SidebarContent: FC<SidebarContentProps> = ({ currentUser }) => {
  const router = useRouter();

  let body = <></>;

  if (!currentUser) {
    body = (
      <div className="flex flex-col gap-4">
        <SidebarButton
          title="Login with Google"
          onClick={() => {
            signIn("google");
          }}
          icon={FcGoogle}
        />
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col gap-4">
        <SidebarButton
          title="Dashboard"
          onClick={() => {
            router.push("/profile/dashboard");
          }}
        />
        <SidebarButton
          title="Preferences"
          onClick={() => {
            router.push("/profile/preferences");
          }}
        />
        <hr className="rounded-full border-2 border-[#A57864]" />
        <p className="sm:text-lg lg:text-xl">Signed in as {currentUser.name}</p>
        <SidebarButton title="Sign Out" onClick={signOut} />
      </div>
    );
  }

  return (
    <section className="sidebar-content mx-auto max-w-[800px] px-4 py-8 md:px-0">
      {body}
      <hr className="rounded-full my-4 border-2 border-[#A57864]" />
    </section>
  );
};

export default SidebarContent;
