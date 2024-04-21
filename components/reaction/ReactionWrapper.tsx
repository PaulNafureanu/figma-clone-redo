import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactionSelector from "./ReactionButton";
import { CursorData } from "../live/Live";
import { CursorMode, Reaction } from "@/types/type";
import FlyingReaction from "./FlyingReaction";
import { Presence } from "@/liveblocks.config";
import getPixels from "@/lib/personal/getPixels";

interface Props {
  presence: Presence;
  cursorData: CursorData;
  onReactionSelected: (reaction: string) => void;
}

export const ReactionWrapper = ({
  presence,
  cursorData,
  onReactionSelected,
}: Props) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  // Add reactions

  const handleSetReactions = useCallback<
    () => NodeJS.Timeout | undefined
  >(() => {
    if (cursorData.mode === CursorMode.Reaction && presence.cursor) {
      const { xPx, yPx } = getPixels(presence.cursor);
      const tick = () => {
        setReactions((reactions) =>
          reactions.concat([
            {
              point: { x: xPx, y: yPx },
              value: cursorData.reaction || "",
              timestamp: Date.now(),
            },
          ])
        );
      };

      return setInterval(tick, 100);
    }
  }, [cursorData.mode, cursorData.reaction, presence.cursor]);

  useEffect(() => {
    const timeout = handleSetReactions();
    return () => (timeout === undefined ? undefined : clearTimeout(timeout));
  }, [handleSetReactions]);

  // Remove reactions

  const handleRemoveReactions = useCallback(() => {
    if (reactions.length > 0) {
      const tick = () => {
        setReactions((reactions) =>
          reactions.filter((reaction) => reaction.timestamp > Date.now() - 3000)
        );
      };
      return setInterval(tick, 100);
    }
  }, [reactions.length]);

  useEffect(() => {
    const timeout = handleRemoveReactions();
    return () => (timeout === undefined ? undefined : clearTimeout(timeout));
  }, [handleRemoveReactions]);

  // render

  return (
    <Fragment>
      {cursorData.mode === CursorMode.ReactionSelector && (
        <ReactionSelector onReactionSelected={onReactionSelected} />
      )}
      {cursorData.mode === CursorMode.Reaction &&
        reactions.map((reaction) => (
          <FlyingReaction
            key={reaction.timestamp.toString()}
            x={reaction.point.x}
            y={reaction.point.y}
            timestamp={reaction.timestamp}
            value={reaction.value}
          />
        ))}
    </Fragment>
  );
};
