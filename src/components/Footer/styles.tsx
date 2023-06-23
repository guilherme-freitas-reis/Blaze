import { Box, styled, Typography } from "@mui/joy";

export const FooterContainer = styled(Box)`
  background: #1a242d;
  padding: 48px 0;
  margin-top: auto;
`;

export const FooterTitle = styled(Typography)`
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  margin-top: 8px;
  margin-bottom: 26px;
  text-transform: uppercase;
`;

export const FooterLink = styled(Typography)`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: #7b8ca9;
  margin-bottom: 26px;
`;

export const FooterCopyright = styled(Typography)`
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  color: #7b8ca9;
`;
