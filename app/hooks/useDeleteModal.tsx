import { create } from "zustand";

interface DeleteModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useDeleteModal;
