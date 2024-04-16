import CursorSVG from "@/public/assets/CursorSVG";
import React from "react";

interface Props {
  color: string;
  x: number;
  y: number;
  message?: string;
}

function Cursor({ color, x, y, message }: Props) {
  const xPx = Math.round(x * (window?.innerWidth || 1));
  const yPx = Math.round(y * (window?.innerHeight || 1));

  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{ transform: `translate(${xPx}px, ${yPx}px)` }}
    >
      <CursorSVG color={color} />

      {message && (
        <div
          className="left-2 top-5 rounded-3xl px-4 py-2"
          style={{ backgroundColor: color }}
        >
          <p className="text-white whitespace-nowrap text-sm leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cursor;
