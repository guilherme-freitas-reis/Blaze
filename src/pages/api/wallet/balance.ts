import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

import { getUserByAuth0Id } from "@/modules/user/controllers/user.controller";
import { getWalletByUserId } from "@/modules/wallet/controllers/wallet.controller";
import { isError } from "@/utils/error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const session = await getSession(req, res);
    if (!session) return res.status(200).end();

    const user = await getUserByAuth0Id(session.user.sub);
    if (!user) return res.status(200).end();

    const wallet = await getWalletByUserId(user.id);
    if (!wallet) return res.status(200).end();

    res.status(200).json({ balance: wallet.balance });
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
