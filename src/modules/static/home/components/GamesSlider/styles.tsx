import { Box, styled, Typography } from "@mui/joy";

export const GamesSliderContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const GamesSliderTitle = styled(Typography)`
  font-size: 22px;
  line-height: 32px;
  font-weight: 600;
  color: white;
` as typeof Typography;

export const GamesSliderCardContainer = styled(Box)`
  display: flex;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;
