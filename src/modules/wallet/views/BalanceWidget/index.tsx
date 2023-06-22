import React from "react";
import Image from "next/image";

import { useWallet } from "../../store/wallet.store";

import { BalanceWidgetButton } from "./styles";

function BalanceWidget() {
  const { balance, getBalance } = useWallet();

  React.useEffect(() => {
    getBalance();
  }, [getBalance]);

  if (balance === null) return null;

  const balanceFormatted = balance.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  return (
    <BalanceWidgetButton>
      $ {balanceFormatted}
      <Image width={16} height={16} src="/icons/money.svg" alt="balance icon" />
    </BalanceWidgetButton>
  );
}

export default BalanceWidget;
