import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "next/image";

import { useWithdrawModal } from "@/modules/withdraw/store/withdrawModel.store";

import { useWallet } from "../../store/wallet.store";

import { BalanceWidgetButton } from "./styles";

function BalanceWidget() {
  const { handleOpen } = useWithdrawModal();
  const { balance, getBalance } = useWallet();

  React.useEffect(() => {
    getBalance();
  }, [getBalance]);

  if (balance === null)
    return (
      <SkeletonTheme baseColor="#ffffff21" highlightColor="#19181826">
        <Skeleton width={120} height={45} />
      </SkeletonTheme>
    );

  function handleClickBalanceWidget() {
    handleOpen();
  }

  const balanceFormatted = balance.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  return (
    <BalanceWidgetButton onClick={handleClickBalanceWidget}>
      $ {balanceFormatted}
      <Image width={16} height={16} src="/icons/money.svg" alt="balance icon" />
    </BalanceWidgetButton>
  );
}

export default BalanceWidget;
