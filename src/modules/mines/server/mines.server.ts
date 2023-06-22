import { MinesFormProps } from "../types/mines.form";

export function play(props: MinesFormProps) {
  const mines = Array.from({ length: Number(props.minesNumber) }, () => ({
    isMine: true,
    isRevealed: true,
  }));

  const diamond = Array.from(
    { length: 25 - Number(props.minesNumber) },
    () => ({
      isMine: false,
      isRevealed: true,
    })
  );

  const game = [...mines, ...diamond].sort(() => Math.random() - 0.5);

  const result = [];
  const subarraySize = 5;

  for (let i = 0; i < game.length; i += subarraySize) {
    const subarray = game.slice(i, i + subarraySize);
    result.push(subarray);
  }

  return result;
}
