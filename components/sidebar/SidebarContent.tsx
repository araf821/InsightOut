"use client";

import { SafeUser } from "@/types";
import { FC } from "react";
import SidebarButton from "./SidebarButton";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { useSidebarContext } from "@/app/context/sidebar_context";
import SidebarFooterLink from "./SidebarFooterLink";
import TroubleSigningIn from "./TroubleSigningIn";

interface SidebarContentProps {
  currentUser: SafeUser | null;
}

const SidebarContent: FC<SidebarContentProps> = ({ currentUser }) => {
  const router = useRouter();
  const { closeSidebar } = useSidebarContext();

  let body = <></>;

  if (!currentUser) {
    body = (
      <div className="flex flex-col gap-2">
        <p className="text-center text-lg font-semibold lg:text-xl">
          Sign in to view your dashboard.
        </p>
        <SidebarButton
          title="Sign In with Google"
          onClick={() => {
            signIn("google");
          }}
          icon={FcGoogle}
        />
        <SidebarButton
          title="Sign In with Github"
          onClick={() => {
            signIn("github");
          }}
          icon={FaGithub}
        />
        <SidebarButton
          title="Sign In with Discord"
          onClick={() => {
            signIn("discord");
          }}
          icon={FaDiscord}
        />
        <TroubleSigningIn />
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col gap-2">
        <SidebarButton
          title="Dashboard"
          onClick={() => {
            closeSidebar();
            router.push("/profile/dashboard");
          }}
        />
        <SidebarButton
          title="Settings"
          onClick={() => {
            closeSidebar();
            router.push("/profile/settings");
          }}
        />
      </div>
    );
  }

  return (
    <section className="relative mx-4 flex flex-grow flex-col space-y-4 p-4 md:px-0">
      {body}
      {/* Sidebar Footer */}
      <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-zinc-800 p-2 shadow-2xl md:bottom-0">
        {currentUser ? (
          <>
            <p className="text-center sm:text-lg lg:text-xl">
              Signed in as {currentUser?.name}
            </p>
            <SidebarButton title="Sign Out" onClick={signOut} />
          </>
        ) : null}
        <div className="flex flex-col gap-1.5 rounded-md bg-zinc-800 p-4">
          <div className="flex flex-col items-center justify-center gap-2.5 font-semibold tracking-wider text-neutral-300 transition md:text-lg ">
            <SidebarFooterLink
              label="About Us"
              onClick={() => {
                closeSidebar();
                router.push("/about");
              }}
            />
            <SidebarFooterLink
              label="Contact"
              onClick={() => {
                closeSidebar();
                router.push("/contact");
              }}
            />
            <SidebarFooterLink
              label="Help and FAQs"
              onClick={() => {
                closeSidebar();
                router.push("/help");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SidebarContent;
