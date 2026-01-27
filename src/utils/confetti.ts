import confetti from "canvas-confetti";

export function launchConfetti(color: string) {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: [color],
  });
}
