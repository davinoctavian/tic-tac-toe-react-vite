import Square from "../Square/Square";
import "./Board.css";

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
  borderColor: string;
  xColor: string;
  oColor: string;
}

export default function Board({
  squares,
  onClick,
  borderColor,
  xColor,
  oColor,
}: BoardProps) {
  return (
    <div className="board">
      {squares.map((val, i) => (
        <Square
          key={i}
          value={val}
          onClick={() => onClick(i)}
          borderColor={borderColor}
          valueColor={val === "X" ? xColor : val === "O" ? oColor : undefined}
        />
      ))}
    </div>
  );
}
