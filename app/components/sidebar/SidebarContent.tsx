"use client";

import { SafeUser } from "@/app/types";
import { FC } from "react";
import SidebarButton from "./SidebarButton";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { useSidebarContext } from "@/app/context/sidebar_context";

interface SidebarContentProps {
  currentUser: SafeUser | null;
}

const SidebarContent: FC<SidebarContentProps> = ({ currentUser }) => {
  const router = useRouter();
  const { closeSidebar } = useSidebarContext();

  let body = <></>;

  if (!currentUser) {
    body = (
      <div className="flex flex-col gap-4">
        <p className="text-center font-semibold sm:text-lg lg:text-xl">
          Login to view your dashboard.
        </p>
        <SidebarButton
          title="Login with Google"
          onClick={() => {
            signIn("google");
          }}
          icon={FcGoogle}
        />
        <SidebarButton
          title="Login with Github"
          onClick={() => {
            signIn("github");
          }}
          icon={FaGithub}
        />
        <SidebarButton
          title="Login with Discord"
          onClick={() => {
            signIn("discord");
          }}
          icon={FaDiscord}
        />
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col gap-4">
        <SidebarButton
          title="Dashboard"
          onClick={() => {
            closeSidebar();
            router.push("/profile/dashboard");
          }}
        />
        <SidebarButton
          title="Preferences"
          onClick={() => {
            router.push("/profile/preferences");
            closeSidebar();
          }}
        />
        <hr className="rounded-full border-zinc-800" />
        <p className="text-center sm:text-lg lg:text-xl">
          Signed in as {currentUser.name}
        </p>
        <SidebarButton title="Sign Out" onClick={signOut} />
      </div>
    );
  }

  return (
    <section className="sidebar-content mx-auto max-w-[800px] px-4 py-8 md:px-0">
      {body}
      <hr className="my-4 rounded-full border-zinc-800" />
      <SidebarButton
        title="Help and FAQs"
        onClick={() => router.push("/help")}
      />
    </section>
  );
};

export default SidebarContent;
