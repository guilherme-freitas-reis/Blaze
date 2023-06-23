import { Alert, styled } from "@mui/joy";

export const PromotionalBannerContainer = styled(Alert)`
  height: 40px;
  border-radius: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    height: 50px;

    p {
      font-size: 12px;
    }

    > div {
      flex-direction: column;

      button {
        display: none;
      }
    }
  }
`;
