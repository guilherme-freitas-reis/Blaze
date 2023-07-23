import { useCallback, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Container } from "@mui/joy";

import GameContainer from "@/components/GameContainer";
import { useWallet } from "@/modules/wallet/store/wallet.store";

import GameMines from "../components/GameMines";
import InfoMines from "../components/InfoMines";
import LoadingMines from "../components/LoadingMines";
import { useMineStore } from "../store/mine.store";

function MinesPage() {
  const { user } = useUser();
  const { getBalance } = useWallet();
  const { hasActiveGame, getMineMatchActive } = useMineStore();

  const [isLoading, setIsLoading] = useState(true);

  const handleGetMineMatchActive = useCallback(async () => {
    setIsLoading(true);

    await getMineMatchActive();

    setIsLoading(false);
  }, [getMineMatchActive]);

  useEffect(() => {
    handleGetMineMatchActive();
  }, [user, handleGetMineMatchActive]);

  useEffect(() => {
    getBalance();
  }, [hasActiveGame, getBalance]);

  if (isLoading) return <LoadingMines />;

  return (
    <Container>
      <GameContainer
        infoComponent={<InfoMines />}
        gameComponent={<GameMines />}
      />
    </Container>
  );
}

export default MinesPage;
