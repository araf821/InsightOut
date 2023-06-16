import { SafeUser } from "@/app/types";
import { FC } from "react";
import SidebarButton from "./SidebarButton";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";

interface SidebarContentProps {
  currentUser: SafeUser | null;
}

const SidebarContent: FC<SidebarContentProps> = ({ currentUser }) => {
  const { open } = useLoginModal();

  let body = <></>;

  if (!currentUser) {
    body = (
      <div className="flex flex-col gap-4">
        <SidebarButton
          title="Login"
          onClick={() => {
            open();
          }}
        />
        <SidebarButton title="Sign Up" onClick={() => {}} />
      </div>
    );
  } else {
    body = (
      <div>
        <p>Hello, {currentUser.name?.split(" ")[0]}</p>
        <SidebarButton title="Out" onClick={signOut} />
      </div>
    );
  }

  return (
    <section className="sidebar-content mx-auto max-w-[800px] px-4 py-8">
      {body}
    </section>
  );
};

export default SidebarContent;
