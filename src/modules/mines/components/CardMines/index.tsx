import React from "react";

import { PositionProps } from "../../types/mines_match.type";

import { CardImageResult, CardMinesContainer } from "./styles";

interface CardMinesProps {
  position: PositionProps;
  onClick: () => void;
}

function CardMines({ position, onClick }: CardMinesProps) {
  return (
    <CardMinesContainer
      onClick={onClick}
      sx={{
        opacity: position.isRevealed ? 1 : 0.35,
        background:
          position.isRevealed && position.type === "mine"
            ? "linear-gradient(44.55deg,#a60f3d 2.53%,#f12c4c 94.15%)"
            : position.isRevealed && position.type !== "mine"
            ? "#0f1923"
            : "linear-gradient(135.41deg, #484c54 0.47%, #232f39 99.56%)",
      }}
    >
      {position.isRevealed ? (
        position.type === "mine" ? (
          <CardImageResult alt="Mina" src="/icons/bomb.svg" />
        ) : (
          <CardImageResult alt="Diamante" src="/icons/diamond.svg" />
        )
      ) : null}
    </CardMinesContainer>
  );
}

export default CardMines;
