import { calculateWinner } from "./gameLogic";

export function getBotMove(squares: (string | null)[], size: number): number {
  const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((idx) => idx !== null) as number[];

  if (emptyIndices.length === 0) return -1;

  const botSymbol = "O"; // assume bot is O
  const playerSymbol = "X"; // assume player is X

  // Helper: check if placing symbol at index wins
  const isWinningMove = (idx: number, symbol: string): boolean => {
    const testSquares = squares.slice() as string[];
    testSquares[idx] = symbol;
    return calculateWinner(testSquares, size) === symbol;
  };

  // 1. Try to win
  for (const idx of emptyIndices) {
    if (isWinningMove(idx, botSymbol)) return idx;
  }

  // 2. Block opponent’s win
  for (const idx of emptyIndices) {
    if (isWinningMove(idx, playerSymbol)) return idx;
  }

  // 3. Prefer center (if board size is odd)
  const center = Math.floor((size * size) / 2);
  if (emptyIndices.includes(center)) return center;

  // 4. Prefer corners
  const corners = [0, size - 1, size * (size - 1), size * size - 1];
  for (const corner of corners) {
    if (emptyIndices.includes(corner)) return corner;
  }

  // 5. Fallback: random
  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
}
