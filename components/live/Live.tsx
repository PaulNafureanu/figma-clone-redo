import { useMyPresence, useOthers } from "@/liveblocks.config";
import React from "react";
import useChat from "../../hooks/useChat";
import useCursor, { CursorMode } from "../../hooks/useCursor";
import useKeyboard from "../../hooks/useKeyboard";
import useReaction from "../../hooks/useReaction";
import CursorChat from "../cursor/CursorChat";
import LiveCursors from "../cursor/LiveCursors";
import { ReactionWrapper } from "../reaction/ReactionWrapper";

export default function Live() {
  const others = useOthers();
  const [presence, setPresence] = useMyPresence();
  const [cursor, dispatchCursorEvent] = useCursor();
  const [chat, dispatchChatEvent] = useChat();
  const [reaction, dispatchReactionEvent] = useReaction();

  // Listen for keyboard events
  useKeyboard(chat, dispatchCursorEvent, dispatchChatEvent, setPresence);

  // Event handlers for pointer events
  const handlePointerMove = (event: React.PointerEvent) => {
    dispatchCursorEvent({ type: "MOVE_POINTER", event });
    setPresence({ cursor: cursor.position });
  };

  const handlePointerLeave = () => {
    dispatchCursorEvent({ type: "REVERT_TO_DEFAULT" });
  };

  const handlePointerDown = () => {
    if (cursor.mode === CursorMode.ReactionSelector) {
      dispatchCursorEvent({ type: "START_REACTION" });
    }
  };

  const handlePointerUp = () => {
    if (cursor.mode === CursorMode.Reaction) {
      dispatchCursorEvent({ type: "REVERT_TO_DEFAULT" });
    }
  };

  // Event handlers for chat events
  const handleCursorChatChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchChatEvent({ type: "CHANGE_MESSAGE", event });
  };

  // Event handlers for reactions' events
  const handleReactionSelection = (value: string) => {
    dispatchReactionEvent({ type: "SELECT_REACTION", value });
  };

  return (
    <div
      className="relative w-full h-full flex justify-center items-center text-center"
      style={{ zIndex: 0 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <h1 className="text-2xl text-white">Hello Figma Clone </h1>

      <LiveCursors others={others} />
      <CursorChat
        presence={presence}
        cursor={cursor}
        chat={chat}
        onChange={handleCursorChatChange}
      />
      <ReactionWrapper
        cursor={cursor}
        reaction={reaction}
        onReactionSelected={handleReactionSelection}
      />
    </div>
  );
}
