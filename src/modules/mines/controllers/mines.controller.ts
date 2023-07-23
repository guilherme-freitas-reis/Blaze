import { MineMatch } from "@prisma/client";

import { decrypt, encrypt } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { createBet } from "@/modules/bet/controllers/bet.controller";
import {
  decrementWalletBalance,
  getWalletById,
  incrementWalletBalance,
} from "@/modules/wallet/controllers/wallet.controller";

import { PositionProps } from "../types/mines_match.type";
import { createMineResult } from "../utils/createMineResult";

import { getCountRoundMinesByMatchId } from "./mines_round.controller";

interface CreateMineMatchProps
  extends Pick<MineMatch, "betAmount" | "walletId"> {
  minesNumber: number;
}

interface CreateMineRoundProps {
  mineMatchId: string;
  position: number;
}

const winMineMatch = async (mineMatchId: string) => {
  const mineMatch = await getMineMatchById(mineMatchId);
  if (!mineMatch) throw new Error("MINE_MATCH_NOT_FOUND");

  const wallet = await getWalletById(mineMatch.walletId);
  if (!wallet) throw new Error("WALLET_NOT_FOUND");

  await prisma.mineMatch.update({
    where: {
      id: mineMatchId,
    },
    data: {
      endedAt: new Date(),
      status: "WIN",
    },
  });

  await createBet({
    amount: mineMatch.betAmount,
    walletId: mineMatch.walletId,
    game: "MINE",
    status: "WIN",
  });

  const profit = await calculateProfit(mineMatch);

  await incrementWalletBalance({
    id: wallet.id,
    balance: profit,
  });

  return profit;
};

const loseMineMatch = async (mineMatchId: string) => {
  const mineMatch = await getMineMatchById(mineMatchId);
  if (!mineMatch) throw new Error("MINE_MATCH_NOT_FOUND");

  const wallet = await getWalletById(mineMatch.walletId);
  if (!wallet) throw new Error("WALLET_NOT_FOUND");

  await prisma.mineMatch.update({
    where: {
      id: mineMatchId,
    },
    data: {
      endedAt: new Date(),
      status: "LOSE",
    },
  });

  await createBet({
    amount: mineMatch.betAmount,
    walletId: mineMatch.walletId,
    game: "MINE",
    status: "LOSE",
  });
};

export const calculateProfit = async (mineMatch: MineMatch) => {
  const roundsNumber = await getCountRoundMinesByMatchId(mineMatch.id);

  if (roundsNumber === 0) return mineMatch.betAmount;

  return mineMatch.betAmount * (0.075 * mineMatch.mines * roundsNumber);
};

export const getMineMatchById = async (id: string) => {
  const mineMatch = await prisma.mineMatch.findUnique({
    where: {
      id,
    },
  });

  return mineMatch;
};

export const getMineMatchActive = async (walletId: string) => {
  const mineMatch = await prisma.mineMatch.findFirst({
    where: {
      walletId,
      endedAt: null,
    },
  });

  return mineMatch;
};

export const getMineMatchPositions = async (mineMatchId: string) => {
  const mineMatch = await getMineMatchById(mineMatchId);
  if (!mineMatch) throw new Error("MINE_MATCH_NOT_FOUND");

  const gameResult = decrypt({
    encryptedData: mineMatch.gameResult,
  });

  const gameResultArray = gameResult.split(",");

  const positions = gameResultArray.map((position, index) => ({
    position: index,
    isRevealed: true,
    type: position,
  })) as PositionProps[];

  return positions;
};

export const createMineMatch = async ({
  betAmount,
  walletId,
  minesNumber,
}: CreateMineMatchProps) => {
  const wallet = await getWalletById(walletId);
  if (!wallet) throw new Error("WALLET_NOT_FOUND");

  if (wallet.balance < betAmount) throw new Error("INSUFFICIENT_FUNDS");

  if (minesNumber < 1 || minesNumber > 24)
    throw new Error("INVALID_MINES_NUMBER");

  const gameResult = createMineResult({
    minesNumber,
  });

  const gameResultEncrypted = encrypt({ data: gameResult });

  await decrementWalletBalance({
    id: walletId,
    balance: betAmount,
  });

  return await prisma.mineMatch.create({
    data: {
      betAmount,
      walletId,
      mines: minesNumber,
      gameResult: gameResultEncrypted,
    },
  });
};

export const createMineRound = async ({
  mineMatchId,
  position,
}: CreateMineRoundProps) => {
  const mineMatch = await getMineMatchById(mineMatchId);
  if (!mineMatch) throw new Error("MINE_MATCH_NOT_FOUND");

  const gameResult = decrypt({
    encryptedData: mineMatch.gameResult,
  });

  const gameResultArray = gameResult.split(",");
  const isMine = gameResultArray[position] === "mine";

  await prisma.mineRound.create({
    data: {
      mineMatchId: mineMatch.id,
      position: position,
    },
  });

  if (isMine) await loseMineMatch(mineMatchId);

  return {
    isMine,
  };
};

export const endMineMatch = async (mineMatchId: string) => {
  const hasRound = await prisma.mineRound.findFirst({
    where: {
      mineMatchId,
    },
  });

  if (!hasRound) throw "NO_ROUNDS";

  return await winMineMatch(mineMatchId);
};
