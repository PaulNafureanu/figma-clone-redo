import { LiveCursorProps } from "@/types/type";
import React from "react";
import Cursor from "./Cursor";
import { COLORS } from "@/constants";

function LiveCursors({ others }: LiveCursorProps) {
  return others.map(({ connectionId, presence }) => {
    if (presence && presence.cursor) {
      return (
        <Cursor
          key={connectionId}
          color={COLORS[Number(connectionId) % COLORS.length]}
          position={presence.cursor}
          message={presence.message}
        />
      );
    }
  });
}

export default LiveCursors;
