import "./Scoreboard.css";

interface ScoreboardProps {
  player1Score: number;
  player2Score: number;
  player1Symbol?: "X" | "O";
  player2Symbol?: "X" | "O";
  xBoardColor: string;
  oBoardColor: string;
}

export default function Scoreboard({
  player1Score,
  player2Score,
  player1Symbol,
  player2Symbol,
  xBoardColor,
  oBoardColor,
}: ScoreboardProps) {
  return (
    <div className="scoreboard">
      <div style={{ color: player1Symbol === "X" ? xBoardColor : oBoardColor }}>
        Player 1 ({player1Symbol}): {player1Score}
      </div>
      <div style={{ color: player2Symbol === "X" ? xBoardColor : oBoardColor }}>
        Player 2 ({player2Symbol}): {player2Score}
      </div>
    </div>
  );
}
