import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import { useRouter } from "next/router";

import { useLoggedOutModalStore } from "./store/loggedOutModal.store";

function LoggedOutModal() {
  const { push } = useRouter();
  const { open, handleClose } = useLoggedOutModalStore();

  function handleLogin() {
    push("/api/auth/login");
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog>
        <ModalClose />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Image src="/logo.svg" alt="Blaze Logo" width={109} height={39} />
          <Typography textAlign="center">
            Você precisa estar logado para jogar.
          </Typography>

          <Button onClick={handleLogin} fullWidth>
            Entrar/Cadastrar-se
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}

export default LoggedOutModal;
