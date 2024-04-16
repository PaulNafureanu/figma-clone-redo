import { LiveCursorProps } from "@/types/type";
import React from "react";
import Cursor from "./Cursor";
import { COLORS } from "@/constants";

function LiveCursors({ others }: LiveCursorProps) {
  return others.map(({ connectionId, presence }) => {
    if (presence && presence.cursor) {
      const { cursor } = presence;
      const isOutside =
        cursor.x < 0.005 ||
        cursor.y < 0.005 ||
        cursor.x > 99.995 ||
        cursor.y > 99.995;
      if (isOutside) return;

      return (
        <Cursor
          key={connectionId}
          color={COLORS[Number(connectionId) % COLORS.length]}
          x={presence.cursor.x || 0}
          y={presence.cursor.y || 0}
          message={presence.message}
        />
      );
    }
  });
}

export default LiveCursors;
