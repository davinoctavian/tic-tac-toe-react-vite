export function calculateWinner(
  squares: string[],
  size: number,
): string | null {
  const winLength = size === 3 ? 3 : 4; // dynamic win condition

  // helper to check sequence
  const checkLine = (indices: number[]) => {
    const first = squares[indices[0]];
    if (!first) return null;
    if (indices.every((i) => squares[i] === first)) return first;
    return null;
  };

  // horizontal, vertical, diagonal checks
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      // horizontal
      if (col + winLength <= size) {
        const indices = Array.from(
          { length: winLength },
          (_, k) => row * size + col + k,
        );
        const winner = checkLine(indices);
        if (winner) return winner;
      }
      // vertical
      if (row + winLength <= size) {
        const indices = Array.from(
          { length: winLength },
          (_, k) => (row + k) * size + col,
        );
        const winner = checkLine(indices);
        if (winner) return winner;
      }
      // diagonal down-right
      if (row + winLength <= size && col + winLength <= size) {
        const indices = Array.from(
          { length: winLength },
          (_, k) => (row + k) * size + (col + k),
        );
        const winner = checkLine(indices);
        if (winner) return winner;
      }
      // diagonal down-left
      if (row + winLength <= size && col - winLength + 1 >= 0) {
        const indices = Array.from(
          { length: winLength },
          (_, k) => (row + k) * size + (col - k),
        );
        const winner = checkLine(indices);
        if (winner) return winner;
      }
    }
  }

  return null;
}
