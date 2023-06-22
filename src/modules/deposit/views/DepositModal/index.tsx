import React from "react";
import { toast } from "react-toastify";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import axios from "axios";

import { isAxiosError } from "@/utils/error";

import { useDepositModal } from "../../store/depositModel.store";

import Loading from "./components/Loading";
import PaymentMethods from "./components/PaymentMethods";

function DepositModal() {
  const { user } = useUser();
  const { open, handleClose } = useDepositModal();

  const [loading, setLoading] = React.useState(false);

  if (!user) return null;

  async function handleSelectMethod() {
    setLoading(true);

    try {
      await axios.post("/api/deposit/create");

      toast.success("Depósito realizado com sucesso");

      handleClose();
    } catch (e) {
      if (isAxiosError(e)) {
        const code = (e.response?.data as { code: string }).code;

        switch (code) {
          case "DEPOSIT_LIMIT_REACHED":
            toast.error("Você atingiu o limite de depósitos diários");
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
          <PaymentMethods handleSelectMethod={handleSelectMethod} />
        )}
      </ModalDialog>
    </Modal>
  );
}

export default DepositModal;
