import React from "react";
import { Grid } from "@mui/joy";

import CardMines from "../CardMines";

function GameMines() {
  const emptyArrayGame = Array.from({ length: 25 }, () => ({
    isMine: false,
    isRevealed: false,
  }));

  const defaultGame = [];
  const subarraySize = 5;

  for (let i = 0; i < emptyArrayGame.length; i += subarraySize) {
    const subarray = emptyArrayGame.slice(i, i + subarraySize);
    defaultGame.push(subarray);
  }

  return (
    <Grid container>
      {defaultGame.map((row, rowIndex) => (
        <Grid xs={12} key={rowIndex}>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {row.map((col, colIndex) => (
              <Grid xs={4} key={colIndex}>
                <CardMines isMine={col.isMine} isRevealed={col.isRevealed} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default GameMines;
