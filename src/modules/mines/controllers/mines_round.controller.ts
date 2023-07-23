import { prisma } from "@/lib/prisma";

export const getCountRoundMinesByMatchId = async (mineMatchId: string) => {
  return await prisma.mineRound.count({
    where: {
      mineMatchId: mineMatchId,
    },
  });
};

export const getPositionsAlreadyPlayed = async (mineMatchId: string) => {
  const mineRounds = await prisma.mineRound.findMany({
    where: {
      mineMatchId: mineMatchId,
    },
  });

  return mineRounds.map((round) => round.position);
};
