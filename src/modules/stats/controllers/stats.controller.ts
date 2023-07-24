import { prisma } from "@/lib/prisma";

import { StatsProps } from "../types/stats.type";

export const getStats = async (): Promise<StatsProps> => {
  const [bets, wallets] = await prisma.$transaction([
    prisma.bet.findMany(),
    prisma.wallet.findMany(),
  ]);

  const totalUsers = wallets.length;

  const totalBets = bets.length;

  const totalBetsWins = bets.reduce((acc, bet) => {
    if (bet.status === "WIN") {
      return acc + 1;
    }
    return acc;
  }, 0);

  const totalBetsAmount = bets.reduce((acc, bet) => acc + bet.amount, 0);

  const totalUsersGains = bets.reduce((acc, bet) => {
    if (bet.status === "WIN") {
      return acc + bet.amount;
    }
    return acc;
  }, 0);

  return {
    totalUsers,
    totalBets,
    totalBetsWins,
    totalBetsAmount,
    totalUsersGains,
  };
};
