export function getContrastColor(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  // luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function getHoverColor(hex: string): string {
  let usePound = false;
  if (hex[0] === "#") {
    hex = hex.slice(1);
    usePound = true;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // if bright (like white), make hover slightly darker
  const amount = brightness > 180 ? -20 : 20;

  const newR = Math.min(255, Math.max(0, r + amount));
  const newG = Math.min(255, Math.max(0, g + amount));
  const newB = Math.min(255, Math.max(0, b + amount));

  return (
    (usePound ? "#" : "") +
    ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)
  );
}
