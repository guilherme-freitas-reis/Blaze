import axios from "axios";
import { create } from "zustand";

export interface WalletStoreProps {
  balance: number | null;
  getBalance: () => void;
}

export const useWallet = create<WalletStoreProps>((set) => ({
  balance: null,
  getBalance: async () => {
    const { data } = await axios.get("/api/wallet/balance");

    set({ balance: data.balance });
  },
}));
