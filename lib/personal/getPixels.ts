export interface PositionPercentage {
  x?: number;
  y?: number;
}

export interface PositionPixels {
  xPx: number;
  yPx: number;
}

export default function getPixels(
  position?: PositionPercentage
): PositionPixels {
  const xPx = Math.round((position?.x || 0) * (window.innerWidth || 1));
  const yPx = Math.round((position?.y || 0) * (window.innerHeight || 1));
  return { xPx, yPx };
}
