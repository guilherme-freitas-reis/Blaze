import { Button, styled } from "@mui/joy";

export const PaymentMethodCard = styled(Button)`
  width: 100%;
  display: flex;
  background: #242b37;
  padding: 8px 16px;
  border: 1px solid #323b45;
  justify-content: start;

  &:hover {
    background: #0f1923;
  }
`;
