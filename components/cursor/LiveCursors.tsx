import { COLORS } from "@/constants";
import { Presence } from "@/liveblocks.config";
import { BaseUserMeta, User } from "@liveblocks/client";
import Cursor from "./Cursor";

interface Props {
  others: readonly User<Presence, BaseUserMeta>[];
}

function LiveCursors({ others }: Props) {
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
