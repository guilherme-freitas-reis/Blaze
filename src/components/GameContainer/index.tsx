import React from "react";
import { Grid } from "@mui/joy";

import { ContentContainer } from "./styles";

interface GameContainerProps {
  infoComponent: React.ReactNode;
  gameComponent: React.ReactNode;
}

function GameContainer({ infoComponent, gameComponent }: GameContainerProps) {
  return (
    <Grid
      container
      sx={{
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
      }}
    >
      <Grid
        md={4}
        xs={12}
        sx={{
          borderRight: {
            xs: "none",
            md: "1px solid #323b45",
          },
          borderBottom: {
            xs: "1px solid #323b45",
            md: "none",
          },
        }}
      >
        <ContentContainer>{infoComponent}</ContentContainer>
      </Grid>
      <Grid xs={12} md={8}>
        <ContentContainer>{gameComponent}</ContentContainer>
      </Grid>
    </Grid>
  );
}

export default GameContainer;
