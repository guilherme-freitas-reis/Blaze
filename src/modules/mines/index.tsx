import { Container } from "@mui/joy";

import GameContainer from "@/components/GameContainer";
import Layout from "@/layouts/Layout";

import GameMines from "./components/GameMines";
import InfoMines from "./components/InfoMines";

function MinesPage() {
  return (
    <Layout>
      <Container>
        <GameContainer
          infoComponent={<InfoMines />}
          gameComponent={<GameMines />}
        />
      </Container>
    </Layout>
  );
}

export default MinesPage;
