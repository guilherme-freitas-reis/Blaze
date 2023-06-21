import { prisma } from "@/lib/prisma";
import { Wallet } from "@prisma/client";

export const getWalletById = async (id: string) => {
  return await prisma.wallet.findFirst({
    where: {
      id,
    },
  });
};

export const getWalletByUserId = async (userId: string) => {
  return await prisma.wallet.findFirst({
    where: {
      userId,
    },
  });
};

export const createWallet = async ({ userId }: Pick<Wallet, "userId">) => {
  return await prisma.wallet.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const incrementWalletBalance = async ({
  id,
  balance,
}: Pick<Wallet, "id" | "balance">) => {
  return await prisma.wallet.update({
    where: {
      id,
    },
    data: {
      balance: {
        increment: balance,
      },
    },
  });
};

export const decrementWalletBalance = async ({
  id,
  balance,
}: Pick<Wallet, "id" | "balance">) => {
  return await prisma.wallet.update({
    where: {
      id,
    },
    data: {
      balance: {
        decrement: balance,
      },
    },
  });
};
