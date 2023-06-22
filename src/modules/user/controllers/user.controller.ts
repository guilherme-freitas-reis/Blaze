import { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { createWallet } from "@/modules/wallet/controllers/wallet.controller";

export const getUserByAuth0Id = async (auth0Id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  return user;
};

export const createUser = async ({
  auth0Id,
  name,
  email,
}: Pick<User, "auth0Id" | "name" | "email">) => {
  const user = await prisma.user.create({
    data: {
      auth0Id,
      email,
      name,
    },
  });

  await createWallet({ userId: user.id });

  return user;
};
