import React from "react";
import { Box, Container } from "@mui/joy";

import Banner from "./components/Banner";
import GamesSlider from "./components/GamesSlider";

function HomePage() {
  return (
    <Container>
      <Box component={"section"} mb={"40px"}>
        <Banner />
      </Box>

      <GamesSlider />
    </Container>
  );
}

export default HomePage;
