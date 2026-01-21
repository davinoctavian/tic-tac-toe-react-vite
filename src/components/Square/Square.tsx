import "./Square.css";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  borderColor: string;
  valueColor?: string;
}

export default function Square({
  value,
  onClick,
  borderColor,
  valueColor,
}: SquareProps) {
  return (
    <button
      className="square"
      style={{ borderColor }}
      onClick={onClick}
      disabled={value !== null}
    >
      <div className="value" style={{ color: valueColor }}>
        {value}
      </div>
    </button>
  );
}
