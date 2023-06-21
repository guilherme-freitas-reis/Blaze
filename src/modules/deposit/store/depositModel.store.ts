import { create } from "zustand";

export interface DepositModalStoreProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useDepositModal = create<DepositModalStoreProps>((set) => ({
  open: false,
  handleOpen: () => set({ open: true }),
  handleClose: () => set({ open: false }),
}));
