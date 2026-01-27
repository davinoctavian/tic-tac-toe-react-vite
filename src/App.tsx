import { useState, useContext, useEffect } from "react";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Settings from "./components/Settings/Settings";
import { calculateWinner } from "./utils/gameLogic";
import useLocalStorage from "./hooks/useLocalStorage";
import { SettingsContext } from "./context/SettingsContext";
import { launchConfetti } from "./utils/confetti";
import "./App.css";

export default function App() {
  const { settings } = useContext(SettingsContext);

  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const squares = history[currentMove];
  const [xIsNext, setXIsNext] = useState(settings?.player1Symbol === "X");
  const [scores, setScores] = useLocalStorage<{ X: number; O: number }>(
    "scores",
    { X: 0, O: 0 },
  );
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);

  const winner = calculateWinner(squares);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, newSquares]);
    setCurrentMove(newHistory.length);

    setXIsNext(!xIsNext);
  };

  const handleClear = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  };

  const handleUndo = () => {
    if (currentMove > 0) {
      const newMove = currentMove - 1;
      setCurrentMove(newMove);
      setXIsNext(newMove % 2 === 0);
    }
  };

  const handleReset = () => {
    setScores({ X: 0, O: 0 });
    handleClear();
  };

  if (winner) {
    setTimeout(() => {
      setScores({ ...scores, [winner]: scores[winner as "X" | "O"] + 1 });
      handleClear();
    }, 500);
  }

  useEffect(() => {
    // whenever player assignments change, reset scores and change turn
    setScores({ X: 0, O: 0 });
    setXIsNext(settings.player1Symbol === "X");
  }, [settings.player1Symbol, settings.player2Symbol]);

  const player1Score = settings.player1Symbol
    ? scores[settings.player1Symbol]
    : 0;
  const player2Score = settings.player2Symbol
    ? scores[settings.player2Symbol]
    : 0;

  useEffect(() => {
    const requiredWins = Math.ceil((settings.match ?? 1) / 2);

    if (
      settings.player1Symbol &&
      scores[settings.player1Symbol] >= requiredWins
    ) {
      setWinnerMessage("🎉 Player 1 Wins the Match!");
      const color =
        settings.player1Symbol === "X"
          ? settings.xBoardColor
          : settings.oBoardColor;
      launchConfetti(color);
    }

    if (
      settings.player2Symbol &&
      scores[settings.player2Symbol] >= requiredWins
    ) {
      setWinnerMessage("🎉 Player 2 Wins the Match!");
      const color =
        settings.player2Symbol === "X"
          ? settings.xBoardColor
          : settings.oBoardColor;
      launchConfetti(color);
    }
  }, [scores, settings]);

  return (
    <div
      className="container"
      style={{
        backgroundColor: settings.backgroundColor,
      }}
    >
      {winnerMessage && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{winnerMessage}</h2>
            <button
              onClick={() => {
                setScores({ X: 0, O: 0 });
                setWinnerMessage(null);
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="title-content">
        <h1 style={{ color: settings.borderColor }}>Tic Tac Toe</h1>
      </div>
      <div>
        <h3 style={{ color: settings.borderColor }}>
          Player 1: {settings.player1Symbol} | Player 2:{" "}
          {settings.player2Symbol}
        </h3>
        <h3 style={{ color: settings.borderColor }}>
          Player {xIsNext ? 1 : 2} Turn
        </h3>
      </div>
      <div className="main-content">
        <div className="content-board">
          <Scoreboard
            player1Score={player1Score}
            player2Score={player2Score}
            player1Symbol={settings.player1Symbol}
            player2Symbol={settings.player2Symbol}
            xBoardColor={settings.xBoardColor}
            oBoardColor={settings.oBoardColor}
          />
          <Board
            disabled={
              settings.player1Symbol === undefined ||
              settings.player2Symbol === undefined
            }
            squares={squares}
            onClick={handleClick}
            borderColor={settings.borderColor}
            xColor={settings.xColor}
            oColor={settings.oColor}
          />
          <div className="button-content">
            <button onClick={handleUndo} disabled={currentMove === 0}>
              Undo
            </button>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
        <div className="content-settings">
          <Settings />
        </div>
      </div>
    </div>
  );
}
