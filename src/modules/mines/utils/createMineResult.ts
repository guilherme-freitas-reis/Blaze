interface CreateMineResultProps {
  minesNumber: number;
}

export const createMineResult = ({
  minesNumber,
}: CreateMineResultProps): string => {
  const result: string[] = [];

  const mines = Array.from({ length: Number(minesNumber) }, () => "mine");
  const diamonds = Array.from(
    { length: Number(25 - minesNumber) },
    () => "diamond"
  );

  result.push(...mines, ...diamonds);

  return result.sort(() => Math.random() - 0.5).join(",");
};
