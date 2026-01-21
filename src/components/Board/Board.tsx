import Square from "../Square/Square";
import "./Board.css";

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
  borderColor: string;
  xColor: string;
  oColor: string;
  disabled?: boolean;
}

export default function Board({
  squares,
  onClick,
  borderColor,
  xColor,
  oColor,
  disabled,
}: BoardProps) {
  return (
    <div className={`board ${disabled ? "disabled" : ""}`}>
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
