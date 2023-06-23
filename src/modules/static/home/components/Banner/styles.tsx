import { Box, styled, Typography } from "@mui/joy";

export const BannerContainer = styled(Box)`
  display: flex;
  flex-direction: column;

  height: 320px;
  padding: 48px 58px;
  border-radius: 4px;

  background-image: url("/banners/money_banner.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const BannerTitle = styled(Typography)`
  font-size: 34px;
  line-height: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
` as typeof Typography;

export const BannerDescription = styled(Typography)`
  font-size: 16px;
  line-height: 32px;
  font-weight: 400;
  color: white;
  margin-bottom: 32px;
` as typeof Typography;
