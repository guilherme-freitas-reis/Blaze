import axios, { isAxiosError } from "axios";
import { create } from "zustand";

import { GetMineMatchActiveResponse } from "@/pages/api/mines/active";
import { CreateMineMatchResponse } from "@/pages/api/mines/create";
import { EndMineMatchResponse } from "@/pages/api/mines/end";
import { CreateRoundMineResponse } from "@/pages/api/mines/round";

import { MinesFormProps } from "../types/mines.form";
import { MinesMatchProps } from "../types/mines_match.type";

export interface MineStoreProps {
  moneyValue: string;
  minesNumber: string;
  setMoneyValue: (moneyValue: string) => void;
  setMinesNumber: (minesNumber: string) => void;

  hasActiveGame: boolean;

  mineMatch: MinesMatchProps | null;

  getMineMatchActive: () => Promise<GetMineMatchActiveResponse | undefined>;
  createMineMatch: (props: MinesFormProps) => Promise<void>;
  endMineMatch: () => Promise<EndMineMatchResponse | undefined>;
  createRoundMineMatch: (position: string) => Promise<void>;
}

export const useMineStore = create<MineStoreProps>((set) => ({
  moneyValue: "",
  minesNumber: "2",

  hasActiveGame: false,
  mineMatch: null,

  setMoneyValue: (moneyValue: string) => set({ moneyValue }),
  setMinesNumber: (minesNumber: string) => set({ minesNumber }),

  getMineMatchActive: async () => {
    try {
      const { data } = await axios.get<GetMineMatchActiveResponse>(
        "/api/mines/active"
      );

      set({
        hasActiveGame: !!data,
        mineMatch: data?.minesMatch ?? null,
      });

      return data;
    } catch (e) {
      if (isAxiosError(e)) console.error(e);
    }
  },
  createMineMatch: async (props: MinesFormProps) => {
    try {
      const { moneyValue, minesNumber } = props;

      const { data } = await axios.post<CreateMineMatchResponse>(
        "/api/mines/create",
        {
          betAmount: moneyValue,
          minesNumber,
        }
      );

      set({
        hasActiveGame: true,
        mineMatch: data?.minesMatch ?? null,
      });
    } catch (e) {
      if (isAxiosError(e)) console.error(e);
    }
  },
  endMineMatch: async () => {
    try {
      return await axios.post("/api/mines/end");
    } catch (e) {
      if (isAxiosError(e)) console.error(e);
    }
  },
  createRoundMineMatch: async (position: string) => {
    try {
      const { data } = await axios.post<CreateRoundMineResponse>(
        "/api/mines/round",
        {
          position,
        }
      );

      set({
        hasActiveGame: !data.minesMatch.endGame,
        mineMatch: data?.minesMatch ?? null,
      });
    } catch (e) {
      if (isAxiosError(e)) console.error(e);
    }
  },
}));
