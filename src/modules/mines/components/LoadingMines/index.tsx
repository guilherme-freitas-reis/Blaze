import React from "react";
import { Box, CircularProgress, Container } from "@mui/joy";

function LoadingMines() {
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: "652px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "#1a242d",
        }}
      >
        <CircularProgress size={"lg"} color="primary" />
        Aguarde...
      </Box>
    </Container>
  );
}

export default LoadingMines;
