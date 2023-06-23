import { Container } from "@mui/joy";

import GameContainer from "@/components/GameContainer";

import GameMines from "./components/GameMines";
import InfoMines from "./components/InfoMines";

function MinesPage() {
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
