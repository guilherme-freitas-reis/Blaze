import { styled, Typography } from "@mui/joy";

export const Title = styled(Typography)`
  margin-bottom: 1rem;
  font-size: 42px;
  color: #fff;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    font-size: 24px;
  }
`;

export const StatsCard = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: #1a242d;
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: 2rem;
  font-size: 14px;

  span {
    font-size: 32px;
    font-weight: 700;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    span {
      font-size: 22px;
    }
  }
`;
