import "./Square.css";
import { getHoverColor } from "../../utils/colorUtils";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  borderColor: string;
  bgColor: string;
  valueColor?: string;
}

export default function Square({
  value,
  onClick,
  borderColor,
  bgColor,
  valueColor,
}: SquareProps) {
  const hoverColor = getHoverColor(bgColor);
  return (
    <button
      className="square"
      style={
        {
          borderColor: borderColor,
          "--hover-color": hoverColor,
        } as React.CSSProperties
      }
      onClick={onClick}
      disabled={value !== null}
    >
      <div className="value" style={{ color: valueColor }}>
        {value}
      </div>
    </button>
  );
}
