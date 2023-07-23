import { Bet } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function createBet({
  walletId,
  amount,
  game,
  status,
}: Pick<Bet, "walletId" | "amount" | "game" | "status">) {
  const bet = await prisma.bet.create({
    data: {
      amount,
      walletId,
      game,
      status,
    },
  });

  return bet;
}
