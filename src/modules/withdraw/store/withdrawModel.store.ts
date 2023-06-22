import { create } from "zustand";

export interface WithdrawStoreProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useWithdrawModal = create<WithdrawStoreProps>((set) => ({
  open: false,
  handleOpen: () => set({ open: true }),
  handleClose: () => set({ open: false }),
}));
