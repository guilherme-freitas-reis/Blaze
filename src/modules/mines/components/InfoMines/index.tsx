import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, FormControl, FormLabel, Input, Select } from "@mui/joy";

import { useLoggedOutModalStore } from "@/components/LoggedOutModal/store/loggedOutModal.store";

import { useMineStore } from "../../store/mine.store";
import MinesNumberOptions from "../MinesNumberOptions";

import { MinesForm } from "./styles";

function InfoMines() {
  const { user } = useUser();
  const { handleOpen } = useLoggedOutModalStore();
  const { moneyValue, setMoneyValue, minesNumber, setMinesNumber, startGame } =
    useMineStore();

  function handleStartGame() {
    if (!user) {
      handleOpen();
      return;
    }

    if (!moneyValue || !minesNumber) return;

    startGame({
      moneyValue,
      minesNumber,
    });
  }

  return (
    <MinesForm>
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

      <Button onClick={handleStartGame}>Começar o jogo</Button>
    </MinesForm>
  );
}

export default InfoMines;
