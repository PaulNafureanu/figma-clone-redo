import getPixels from "@/lib/personal/getPixels";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Cursor, CursorMode } from "../../hooks/useCursor";
import { Reaction } from "../../hooks/useReaction";
import FlyingReaction from "./FlyingReaction";
import ReactionSelector from "./ReactionButton";

interface Props {
  cursor: Cursor;
  reaction: Reaction;
  onReactionSelected: (value: string) => void;
}

export const ReactionWrapper = ({
  cursor,
  reaction,
  onReactionSelected,
}: Props) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  // Add reactions
  const handleSetReactions = useCallback<
    () => NodeJS.Timeout | undefined
  >(() => {
    if (cursor.mode === CursorMode.Reaction) {
      const { xPx, yPx } = getPixels(cursor.position);
      const tick = () => {
        setReactions((reactions) =>
          reactions.concat([
            {
              point: { x: xPx, y: yPx },
              value: reaction.value,
              timestamp: Date.now(),
            },
          ])
        );
      };

      return setInterval(tick, 100);
    }
  }, [cursor.mode, cursor.position, reaction.value]);

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

  return (
    <Fragment>
      {cursor.mode === CursorMode.ReactionSelector && (
        <ReactionSelector onReactionSelected={onReactionSelected} />
      )}
      {cursor.mode === CursorMode.Reaction &&
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
