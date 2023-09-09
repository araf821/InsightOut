import { User } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "followersModal" | "followingModal";

interface ModalData {
  user?: User;
  followers?: { follower: User | null }[];
  following?: { following: User | null }[];
}

interface ModalStoreProps {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStoreProps>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => set({ type: null, isOpen: false }),
}));
