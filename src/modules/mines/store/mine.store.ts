import { toast } from "react-toastify";
import axios, { isAxiosError } from "axios";
import { create } from "zustand";

import { GetMineMatchActiveResponse } from "@/pages/api/mines/active";
import { CreateMineMatchResponse } from "@/pages/api/mines/create";
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
  endMineMatch: () => Promise<void>;
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
      if (isAxiosError(e)) {
        const code = (e.response?.data as { code: string }).code;

        switch (code) {
          case "INSUFFICIENT_FUNDS":
            toast.error("Você não tem saldo suficiente para criar a partida");
            break;
          case "INVALID_MINES_NUMBER":
            toast.error("Número de minas inválido");
            break;
          default:
            toast.error("Erro ao criar partida");
            break;
        }
      }
    }
  },
  endMineMatch: async () => {
    try {
      await axios.post("/api/mines/end");

      set({
        hasActiveGame: false,
        mineMatch: null,
      });
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
