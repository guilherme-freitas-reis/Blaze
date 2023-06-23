import { styled } from "@mui/joy";

export const NavbarContainer = styled("nav")`
  width: 100%;
  height: 72px;
  border-bottom: 1px solid #323b45;

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    button {
      height: 42px;
      min-height: unset;
      padding-block: 0;
      padding-inline: 12px;
      font-size: 12px;
    }
  }
`;
