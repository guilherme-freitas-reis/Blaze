import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

import {
  endMineMatch,
  getMineMatchActive,
} from "@/modules/mines/controllers/mines.controller";
import { getUserByAuth0Id } from "@/modules/user/controllers/user.controller";
import { getWalletByUserId } from "@/modules/wallet/controllers/wallet.controller";
import { isError } from "@/utils/error";

export interface EndMineMatchResponse {
  profit: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const session = await getSession(req, res);
    if (!session) return res.status(500).end();

    const user = await getUserByAuth0Id(session.user.sub);
    if (!user) return res.status(500).end();

    const wallet = await getWalletByUserId(user.id);
    if (!wallet) return res.status(500).end();

    const mineMatchIdActive = await getMineMatchActive(wallet.id);
    if (!mineMatchIdActive) return res.status(500).end();

    const profit = await endMineMatch(mineMatchIdActive.id);

    const response: EndMineMatchResponse = {
      profit,
    };

    res.status(201).json(response);
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
