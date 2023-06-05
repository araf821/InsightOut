import { SafeUser } from "@/app/types";
import { FC } from "react";
import SidebarButton from "./SidebarButton";

interface SidebarContentProps {
  currentUser: SafeUser | null;
}

const SidebarContent: FC<SidebarContentProps> = ({ currentUser }) => {
  let body = <></>;

  if (!currentUser) {
    body = (
      <div className="flex flex-col gap-4">
        <SidebarButton title="Login" onClick={() => {}} />
        <SidebarButton title="Sign Up" onClick={() => {}} />
      </div>
    );
  } else {
    body = (
      <div>
        <p>Hello, {currentUser.name?.split(" ")[0]}</p>
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
