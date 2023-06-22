import { create } from "zustand";

export interface LoggedOutModalStoreProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useLoggedOutModalStore = create<LoggedOutModalStoreProps>(
  (set) => ({
    open: false,
    handleOpen: () => set({ open: true }),
    handleClose: () => set({ open: false }),
  })
);
