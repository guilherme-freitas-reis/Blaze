import React from "react";
import { toast } from "react-toastify";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Typography,
} from "@mui/joy";

import { useLoggedOutModalStore } from "@/components/LoggedOutModal/store/loggedOutModal.store";

import { useMineStore } from "../../store/mine.store";
import MinesNumberOptions from "../MinesNumberOptions";

import { MinesForm } from "./styles";

function InfoMines() {
  const { user } = useUser();
  const { handleOpen: handleOpenLoggedOutModal } = useLoggedOutModalStore();
  const {
    moneyValue,
    minesNumber,
    setMoneyValue,
    setMinesNumber,
    createMineMatch,
    hasActiveGame,
    mineMatch,
  } = useMineStore();

  function handleStartGame() {
    if (!user) {
      handleOpenLoggedOutModal();
      return;
    }

    if (!moneyValue || !minesNumber) {
      toast.warning("Preencha todos os campos");
      return;
    }

    createMineMatch({
      moneyValue,
      minesNumber,
    });
  }

  function handleStopGame() {
    return null;
  }

  const balanceFormatted = mineMatch?.profitOnStop?.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  const betAmountFormatted = mineMatch?.betAmount?.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  return (
    <MinesForm>
      {hasActiveGame ? (
        <>
          <Typography fontWeight={600} textColor={"common.white"}>
            Quantia apostada: ${betAmountFormatted}
          </Typography>
        </>
      ) : (
        <>
          <Input
            placeholder="Quantia"
            value={moneyValue}
            onChange={(e) => setMoneyValue(e.target.value)}
          />

          <FormControl>
            <FormLabel>NÚMERO DE MINAS</FormLabel>
            <Select
              value={minesNumber}
              onChange={(_, value) => {
                if (!value) return;
                setMinesNumber(value);
              }}
            >
              <MinesNumberOptions />
            </Select>
          </FormControl>
        </>
      )}

      {hasActiveGame ? (
        <Button
          onClick={handleStopGame}
          disabled={!mineMatch?.isAllowedWithdraw}
        >
          Retirar ${balanceFormatted}
        </Button>
      ) : (
        <Button onClick={handleStartGame}>Começar o jogo</Button>
      )}
    </MinesForm>
  );
}

export default InfoMines;
