import { Box, styled } from "@mui/joy";

export const GameMinesContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 16px;
  width: 100%;
  margin: auto;
  max-width: 560px;
`;
