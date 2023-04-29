import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useRegisterModal;
