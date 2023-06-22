import React from "react";

import { CardImageResult, CardMinesContainer } from "./styles";

interface CardMinesProps {
  isMine: boolean;
  isRevealed: boolean;
}

function CardMines({ isMine, isRevealed }: CardMinesProps) {
  isRevealed = true;
  isMine = true;
  return (
    <CardMinesContainer
      sx={{
        opacity: isRevealed ? 1 : 0.35,
        background:
          isRevealed && isMine
            ? "linear-gradient(44.55deg,#a60f3d 2.53%,#f12c4c 94.15%)"
            : isRevealed && !isMine
            ? "#0f1923"
            : "linear-gradient(135.41deg, #484c54 0.47%, #232f39 99.56%)",
      }}
    >
      {isRevealed ? (
        isMine ? (
          <CardImageResult alt="Mina" src="/icons/bomb.svg" />
        ) : (
          <CardImageResult alt="Diamante" src="/icons/diamond.svg" />
        )
      ) : null}
    </CardMinesContainer>
  );
}

export default CardMines;
