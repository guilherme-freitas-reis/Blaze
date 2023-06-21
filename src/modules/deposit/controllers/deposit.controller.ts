import { prisma } from "@/lib/prisma";
import {
  getWalletById,
  incrementWalletBalance,
} from "@/modules/wallet/controllers/wallet.controller";
import { Deposit } from "@prisma/client";

export const createDeposit = async ({
  amount,
  walletId,
}: Pick<Deposit, "amount" | "walletId">) => {
  const wallet = await getWalletById(walletId);

  if (!wallet) throw new Error("WALLET_NOT_FOUND");

  const lastDeposit = await prisma.deposit.findFirst({
    where: {
      walletId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (lastDeposit) {
    const lastDepositDate = new Date(lastDeposit.createdAt);
    const currentDate = new Date();

    if (
      lastDepositDate.getFullYear() === currentDate.getFullYear() &&
      lastDepositDate.getMonth() === currentDate.getMonth() &&
      lastDepositDate.getDate() === currentDate.getDate()
    )
      throw new Error("LIMIT_DEPOSIT_EXCEEDED");
  }

  const deposit = await prisma.deposit.create({
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

  if (deposit.status === "APPROVED")
    await incrementWalletBalance({
      id: walletId,
      balance: amount,
    });

  return deposit;
};
