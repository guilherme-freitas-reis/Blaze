import { Box, Typography } from "@mui/joy";
import React from "react";
import { PaymentMethodCard } from "../../styles";
import Image from "next/image";

interface PaymentMethodsProps {
  handleSelectMethod: (method: "coin" | "pix") => void;
}

function PaymentMethods({ handleSelectMethod }: PaymentMethodsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Image
        src="/logo.svg"
        alt="Blaze Logo"
        width={109}
        height={39}
        style={{
          margin: "0 auto",
        }}
      />
      <Typography
        component="h2"
        level="h5"
        fontWeight="bold"
        textAlign="center"
        textColor="common.white"
        my={2}
      >
        Escolha seu método de pagamento
      </Typography>

      <Typography
        component="p"
        level="h6"
        fontSize="12px"
        textTransform="uppercase"
        fontWeight="bold"
        textColor="#ebf3fa"
      >
        Recomendado
      </Typography>

      <PaymentMethodCard onClick={() => void handleSelectMethod("coin")}>
        GuihermeCoin ($50)
      </PaymentMethodCard>

      <Typography
        component="p"
        level="h6"
        fontSize="12px"
        textTransform="uppercase"
        fontWeight="bold"
        textColor="#ebf3fa"
      >
        Outras métodos
      </Typography>

      <PaymentMethodCard disabled>Pix</PaymentMethodCard>
      <PaymentMethodCard disabled>Visa/Mastercard</PaymentMethodCard>
      <PaymentMethodCard disabled>PayPal</PaymentMethodCard>
    </Box>
  );
}

export default PaymentMethods;
