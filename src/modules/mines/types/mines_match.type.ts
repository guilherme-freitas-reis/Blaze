export interface PositionProps {
  position: number;
  isRevealed: boolean;
  type: "diamond" | "mine" | "empty";
}

export interface MinesMatchProps {
  endGame: boolean;
  betAmount: number;
  profitOnStop: number;
  isAllowedWithdraw: boolean;
  positions: PositionProps[] | null;
}
