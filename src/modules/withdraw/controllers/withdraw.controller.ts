import { Withdraw } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  decrementWalletBalance,
  getWalletById,
} from "@/modules/wallet/controllers/wallet.controller";

export const createWithdraw = async ({
  amount,
  walletId,
}: Pick<Withdraw, "amount" | "walletId">) => {
  const wallet = await getWalletById(walletId);

  if (!wallet) throw new Error("WALLET_NOT_FOUND");

  if (wallet.balance < amount) throw new Error("INSUFFICIENT_BALANCE");

  const withdraw = await prisma.withdraw.create({
    data: {
      amount,
      status: "APPROVED",
      wallet: {
        connect: {
          id: walletId,
        },
      },
    },
  });

  if (withdraw.status === "APPROVED") {
    await decrementWalletBalance({
      id: walletId,
      balance: amount,
    });
  }

  return withdraw;
};
