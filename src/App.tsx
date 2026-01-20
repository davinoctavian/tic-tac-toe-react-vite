import { useState, useContext } from "react";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Settings from "./components/Settings/Settings";
import { calculateWinner } from "./utils/gameLogic";
import useLocalStorage from "./hooks/useLocalStorage";
import { SettingsContext } from "./context/SettingsContext";

export default function App() {
  const { settings } = useContext(SettingsContext);

  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null),
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useLocalStorage<{ X: number; O: number }>(
    "scores",
    { X: 0, O: 0 },
  );

  const winner = calculateWinner(squares);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  if (winner) {
    setTimeout(() => {
      setScores({ ...scores, [winner]: scores[winner as "X" | "O"] + 1 });
      handleReset();
    }, 500);
  }

  return (
    <div
      style={{
        backgroundColor: settings.backgroundColor,
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: settings.borderColor }}>Tic Tac Toe</h1>
      <Scoreboard
        scores={scores}
        xBoardColor={settings.xBoardColor}
        oBoardColor={settings.oBoardColor}
      />
      <Board
        squares={squares}
        onClick={handleClick}
        borderColor={settings.borderColor}
        xColor={settings.xColor}
        oColor={settings.oColor}
      />
      <button onClick={handleReset}>Reset Game</button>
      <Settings />
    </div>
  );
}
