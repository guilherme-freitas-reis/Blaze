import React from "react";

import { useMineStore } from "../../store/mine.store";
import { PositionProps } from "../../types/mines_match.type";
import CardMines from "../CardMines";

import { GameMinesContainer } from "./styles";

function GameMines() {
  const { mineMatch, hasActiveGame, createRoundMineMatch } = useMineStore();

  async function handleClickMine(index: number) {
    if (!hasActiveGame) return;

    await createRoundMineMatch(String(index));
  }

  const positions =
    mineMatch?.positions ??
    Array.from(
      { length: 25 },
      (_, index) =>
        ({
          position: index,
          isRevealed: false,
          type: "empty",
        } as PositionProps)
    );

  return (
    <GameMinesContainer>
      {positions.map((item) => (
        <CardMines
          onClick={() => void handleClickMine(item.position)}
          key={item.position}
          position={item}
        />
      ))}
    </GameMinesContainer>
  );
}

export default GameMines;
