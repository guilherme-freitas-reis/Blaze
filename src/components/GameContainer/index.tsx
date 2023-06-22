import React from "react";
import { Grid } from "@mui/joy";

import { ContentContainer } from "./styles";

interface GameContainerProps {
  infoComponent: React.ReactNode;
  gameComponent: React.ReactNode;
}

function GameContainer({ infoComponent, gameComponent }: GameContainerProps) {
  return (
    <Grid container>
      <Grid
        md={4}
        sx={{
          borderRight: "1px solid #323b45",
        }}
      >
        <ContentContainer>{infoComponent}</ContentContainer>
      </Grid>
      <Grid md={8}>
        <ContentContainer>{gameComponent}</ContentContainer>
      </Grid>
    </Grid>
  );
}

export default GameContainer;
