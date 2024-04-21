import { PositionPixels } from "./getPixels";
export interface TranslationStyle {
  position: "absolute";
  left: number;
  top: number;
}

export default function getTranslationStyle({
  xPx,
  yPx,
}: PositionPixels): TranslationStyle {
  // return { transform: `translate(${xPx}px, ${yPx}px)` };
  return { position: "absolute", left: xPx, top: yPx };
}
