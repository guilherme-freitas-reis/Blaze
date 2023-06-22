import React from "react";
import { Box, CircularProgress, Typography } from "@mui/joy";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="primary" />

      <Typography>Aguarde...</Typography>
    </Box>
  );
}

export default Loading;
