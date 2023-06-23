import React from "react";

import GamesSliderCard from "./components/GamesSliderCard";
import { GAMES_LIST } from "./constants/games";
import {
  GamesSliderCardContainer,
  GamesSliderContainer,
  GamesSliderTitle,
} from "./styles";

function GamesSlider() {
  return (
    <GamesSliderContainer>
      <GamesSliderTitle component={"h3"}>Originais</GamesSliderTitle>

      <GamesSliderCardContainer>
        {GAMES_LIST.sort((game) => (game.disabled === false ? -1 : 1)).map(
          (game) => (
            <GamesSliderCard key={game.name} {...game} />
          )
        )}
      </GamesSliderCardContainer>
    </GamesSliderContainer>
  );
}

export default GamesSlider;
