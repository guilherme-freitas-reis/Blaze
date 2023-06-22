import React from "react";
import { toast } from "react-toastify";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import axios from "axios";
import Image from "next/image";

import { useWallet } from "@/modules/wallet/store/wallet.store";
import { isAxiosError } from "@/utils/error";

import { useWithdrawModal } from "../../store/withdrawModel.store";

import Loading from "./components/Loading";

function WithdrawModal() {
  const { user } = useUser();
  const { balance, getBalance } = useWallet();
  const { open, handleClose } = useWithdrawModal();

  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  if (!user) return null;

  const balanceFormatted = balance?.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  async function handleClickWithdraw() {
    if (!amount) {
      toast.error("Informe o valor do saque");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/withdraw/create", {
        amount: Number(amount),
      });

      toast.success("Saque realizado com sucesso");

      getBalance();

      handleClose();
    } catch (e) {
      if (isAxiosError(e)) {
        const code = (e.response?.data as { code: string }).code;

        switch (code) {
          case "INSUFFICIENT_BALANCE":
            toast.error("Você não possui saldo suficiente");
            break;
          case "WALLET_NOT_FOUND":
            toast.error("Você não possui uma carteira cadastrada");
            break;
          default:
            toast.error("Erro ao criar depósito");
            break;
        }
      }
    }

    setLoading(false);
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog>
        <ModalClose />

        {loading ? (
          <Loading />
        ) : (
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
              Informe quanto deseja sacar
            </Typography>

            <Typography
              component="p"
              level="h6"
              fontSize="12px"
              textTransform="uppercase"
              fontWeight="bold"
              textColor="#ebf3fa"
            >
              Saldo disponível: $ {balanceFormatted}
            </Typography>

            <Input
              placeholder="R$ 0,00"
              slotProps={{
                input: {
                  min: 0,
                },
              }}
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />

            <Button onClick={handleClickWithdraw}>Solicitar saque</Button>
          </Box>
        )}
      </ModalDialog>
    </Modal>
  );
}

export default WithdrawModal;
