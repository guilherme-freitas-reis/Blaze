import { create } from "zustand";

import { MinesFormProps } from "../types/mines.form";

export interface MineStoreProps {
  moneyValue: string;
  minesNumber: string;
  setMoneyValue: (moneyValue: string) => void;
  setMinesNumber: (minesNumber: string) => void;
  startGame: (props: MinesFormProps) => Promise<void>;
}

export const useMineStore = create<MineStoreProps>((set) => ({
  moneyValue: "",
  minesNumber: "2",
  setMoneyValue: (moneyValue: string) => set({ moneyValue }),
  setMinesNumber: (minesNumber: string) => set({ minesNumber }),
  startGame: async (props: MinesFormProps) => {
    const { moneyValue, minesNumber } = props;

    const response = await fetch("/api/games/mines", {
      method: "POST",
      body: JSON.stringify({ moneyValue, minesNumber }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  },
}));
