import React, { Fragment } from "react";
import ReactionSelector from "./ReactionButton";
import { CursorData } from "../live/Live";
import { CursorMode } from "@/types/type";
import FlyingReaction from "./FlyingReaction";
import { Presence } from "@/liveblocks.config";

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
  return (
    <Fragment>
      {cursorData.mode === CursorMode.ReactionSelector && (
        <ReactionSelector onReactionSelected={onReactionSelected} />
      )}
      {cursorData.mode === CursorMode.Reaction && (
        <FlyingReaction x={0} y={0} timestamp={Date.now()} value={""} />
      )}
    </Fragment>
  );
};
