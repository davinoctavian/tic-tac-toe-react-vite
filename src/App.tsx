import { useState, useContext, useEffect } from "react";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Settings from "./components/Settings/Settings";
import { calculateWinner } from "./utils/gameLogic";
import useLocalStorage from "./hooks/useLocalStorage";
import { SettingsContext } from "./context/SettingsContext";
import { launchConfetti } from "./utils/confetti";
import { getBotMove } from "./utils/bot";
import "./App.css";

export default function App() {
  const { settings } = useContext(SettingsContext);
  const size = parseInt(settings.board ?? "3", 10);

  const [history, setHistory] = useState<string[][]>([
    Array(size * size).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const squares = history[currentMove];
  const [scores, setScores] = useLocalStorage<{ X: number; O: number }>(
    "scores",
    { X: 0, O: 0 },
  );
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);

  const winner = calculateWinner(squares, size);

  const xIsNext = currentMove % 2 === 0;

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    const newHistory = history.slice(0, currentMove + 1);
    const updatedHistory = [...newHistory, newSquares];
    setHistory(updatedHistory);
    setCurrentMove(updatedHistory.length - 1);

    if (settings.mode === "bot") {
      setTimeout(() => {
        const botMove = getBotMove(newSquares, size);
        if (botMove !== -1) {
          const botSquares = newSquares.slice();
          botSquares[botMove] = settings.player2Symbol!;

          const botHistory = [...updatedHistory, botSquares];
          setHistory(botHistory);
          setCurrentMove(botHistory.length - 1);
        }
      }, 1000);
    }
  };

  const handleClear = () => {
    const size = parseInt(settings.board ?? "3", 10);
    setHistory([Array(size * size).fill(null)]);
    setCurrentMove(0);
  };

  const handleUndo = () => {
    if (currentMove > 0) {
      if (settings.mode === "bot" && currentMove > 1) {
        setCurrentMove(currentMove - 2);
        return;
      }
      setCurrentMove(currentMove - 1);
    }
  };

  const handleReset = () => {
    setScores({ X: 0, O: 0 });
    handleClear();
  };

  useEffect(() => {
    const newSize = parseInt(settings.board ?? "3", 10);
    setHistory([Array(newSize * newSize).fill(null)]);
    setCurrentMove(0);
  }, [settings.board, settings.mode]);

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setScores((prev) => ({
          ...prev,
          [winner]: prev[winner as "X" | "O"] + 1,
        }));
        handleClear();
      }, 500);
    }
  }, [winner]);

  useEffect(() => {
    // whenever player assignments change, reset scores and change turn
    setScores({ X: 0, O: 0 });
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
            board={settings.board}
            onClick={handleClick}
            borderColor={settings.borderColor}
            bgColor={settings.backgroundColor}
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
