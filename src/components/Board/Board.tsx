import Square from "../Square/Square";
import "./Board.css";

interface BoardProps {
  squares: (string | null)[];
  board: "3" | "4" | "5" | "6";
  onClick: (i: number) => void;
  borderColor: string;
  bgColor: string;
  xColor: string;
  oColor: string;
  disabled?: boolean;
}

export default function Board({
  squares,
  board,
  onClick,
  borderColor,
  bgColor,
  xColor,
  oColor,
  disabled,
}: BoardProps) {
  const size = parseInt(board ?? "3", 10);
  return (
    <div
      className={`board ${disabled ? "disabled" : ""}`}
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {squares.map((val, i) => (
        <Square
          key={i}
          value={val}
          onClick={() => onClick(i)}
          borderColor={borderColor}
          bgColor={bgColor}
          valueColor={val === "X" ? xColor : val === "O" ? oColor : undefined}
        />
      ))}
    </div>
  );
}
