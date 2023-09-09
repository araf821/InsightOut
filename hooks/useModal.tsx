import { Connection, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "followersModal" | "followingModal";

interface ModalData {
  user?: User;
  followers?: Connection[];
  following?: Connection[];
}

interface ModalStoreProps {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
}

export const useModal = create<ModalStoreProps>((set) => ({
  // default values
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => set({ isOpen: false, type: null }),
}));
