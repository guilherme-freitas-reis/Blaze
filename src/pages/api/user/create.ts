import { NextApiRequest, NextApiResponse } from "next";

import { createUser } from "@/modules/user/controllers/user.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { auth0Id, email, name } = req.body;

    const response = await createUser({
      auth0Id,
      email,
      name,
    });

    res.status(201).json(response);
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
