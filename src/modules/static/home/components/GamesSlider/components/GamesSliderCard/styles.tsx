import { Box, styled, Typography } from "@mui/joy";

export const GamesSliderCardContainer = styled(Box)`
  position: relative;

  width: 158px;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 4px;

  padding: 10px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

export const GamesSliderCardName = styled(Typography)`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
  color: white;
` as typeof Typography;

export const GamesSliderCardDescription = styled(Typography)`
  font-size: 12px;
  color: white;
` as typeof Typography;
