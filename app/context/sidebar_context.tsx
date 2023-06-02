import { ReactNode, createContext, useContext, useState } from "react";

export const SidebarContext = createContext<{
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}>({
  isOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setIsOpen(true);
    console.log("isOpen: ", isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => useContext(SidebarContext);
