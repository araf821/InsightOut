"use client";

import { FC, ReactNode } from "react";
import { SidebarProvider } from "../context/sidebar_context";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default Providers;
