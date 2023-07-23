import { Box, styled } from "@mui/joy";

export const CardMinesContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  aspect-ratio: 1/1;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }
`;

export const CardImageResult = styled("img")`
  width: 70%;
  height: auto;
  object-fit: cover;
`;
