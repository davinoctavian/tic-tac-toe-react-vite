import "./Scoreboard.css";

interface ScoreboardProps {
  scores: { X: number; O: number };
  xBoardColor?: string;
  oBoardColor?: string;
}

export default function Scoreboard({
  scores,
  xBoardColor,
  oBoardColor,
}: ScoreboardProps) {
  return (
    <div className="scoreboard">
      <div className="score" style={{ color: xBoardColor }}>
        X: {scores.X}
      </div>
      <div className="score" style={{ color: oBoardColor }}>
        O: {scores.O}
      </div>
    </div>
  );
}
