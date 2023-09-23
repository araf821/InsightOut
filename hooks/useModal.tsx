import { User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "followersModal"
  | "followingModal"
  | "profileSettingsModal";

interface ModalData {
  user?: User;
  followers?: ({ follower: User | null } & { isFollowed?: boolean })[];
  following?: ({ following: User | null } & { isFollowed?: boolean })[];
  userPage?: boolean;
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
