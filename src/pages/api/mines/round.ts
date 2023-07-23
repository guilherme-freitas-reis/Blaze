import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

import {
  calculateProfit,
  createMineRound,
  endMineMatch,
  getMineMatchActive,
  getMineMatchPositions,
} from "@/modules/mines/controllers/mines.controller";
import { getPositionsAlreadyPlayed } from "@/modules/mines/controllers/mines_round.controller";
import {
  MinesMatchProps,
  PositionProps,
} from "@/modules/mines/types/mines_match.type";
import { getUserByAuth0Id } from "@/modules/user/controllers/user.controller";
import { getWalletByUserId } from "@/modules/wallet/controllers/wallet.controller";
import { isError } from "@/utils/error";

export interface CreateRoundMineResponse {
  minesMatch: MinesMatchProps;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { position } = req.body;

    const session = await getSession(req, res);
    if (!session) return res.status(500).end();

    const user = await getUserByAuth0Id(session.user.sub);
    if (!user) return res.status(500).end();

    const wallet = await getWalletByUserId(user.id);
    if (!wallet) return res.status(500).end();

    const mineMatchActive = await getMineMatchActive(wallet.id);
    if (!mineMatchActive) return res.status(200).send(null);

    const mineRoundResult = await createMineRound({
      mineMatchId: mineMatchActive.id,
      position: Number(position),
    });

    if (mineRoundResult.isMine) {
      const positions = await getMineMatchPositions(mineMatchActive.id);

      const response: CreateRoundMineResponse = {
        minesMatch: {
          endGame: true,
          positions,
          profitOnStop: 0,
          betAmount: mineMatchActive.betAmount,
          isAllowedWithdraw: false,
        },
      };

      return res.status(201).json(response);
    }

    const profitOnStop = -(await calculateProfit(mineMatchActive));

    const positionsAlreadyPlayed = await getPositionsAlreadyPlayed(
      mineMatchActive.id
    );

    if (25 - positionsAlreadyPlayed.length === mineMatchActive.mines) {
      const positions = await getMineMatchPositions(mineMatchActive.id);

      const profit = await endMineMatch(mineMatchActive.id);

      const response: CreateRoundMineResponse = {
        minesMatch: {
          endGame: true,
          positions,
          profitOnStop: profit,
          betAmount: mineMatchActive.betAmount,
          isAllowedWithdraw: false,
        },
      };

      return res.status(201).json(response);
    }

    const positions = Array.from(
      { length: 25 },
      (_, index) =>
        ({
          position: index,
          isRevealed: positionsAlreadyPlayed.includes(index),
          type: positionsAlreadyPlayed.includes(index) ? "diamond" : "empty",
        } as PositionProps)
    );

    const response: CreateRoundMineResponse = {
      minesMatch: {
        endGame: false,
        positions,
        profitOnStop,
        betAmount: mineMatchActive.betAmount,
        isAllowedWithdraw: positionsAlreadyPlayed.length > 0,
      },
    };

    return res.status(201).json(response);
  } catch (e) {
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
