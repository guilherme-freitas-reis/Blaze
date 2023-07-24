import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

import { createMineMatch } from "@/modules/mines/controllers/mines.controller";
import { MinesMatchProps } from "@/modules/mines/types/mines_match.type";
import { getUserByAuth0Id } from "@/modules/user/controllers/user.controller";
import { getWalletByUserId } from "@/modules/wallet/controllers/wallet.controller";
import { isError } from "@/utils/error";

export interface CreateMineMatchResponse {
  minesMatch: MinesMatchProps;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { betAmount, minesNumber } = req.body;

    const session = await getSession(req, res);
    if (!session) return res.status(500).end();

    const user = await getUserByAuth0Id(session.user.sub);
    if (!user) return res.status(500).end();

    const wallet = await getWalletByUserId(user.id);
    if (!wallet) return res.status(500).end();

    const mineMatch = await createMineMatch({
      betAmount: Number(betAmount),
      minesNumber: Number(minesNumber),
      walletId: wallet.id,
    });

    const response: CreateMineMatchResponse = {
      minesMatch: {
        endGame: false,
        betAmount: mineMatch.betAmount,
        profitOnStop: mineMatch.betAmount,
        isAllowedWithdraw: false,
        positions: null,
      },
    };

    res.status(201).send(response);
  } catch (e) {
    console.error(e);
    if (isError(e))
      return res.status(500).json({
        code: e.message,
      });

    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      error: e,
    });
  }
}
