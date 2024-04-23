import { useCallback, useEffect, useRef } from "react";
import { Chat, ChatAction } from "./useChat";
import { Cursor, CursorAction, CursorMode } from "./useCursor";
import { Presence } from "@/liveblocks.config";

type PressenceSetter = (
  patch: Partial<Presence>,
  options?:
    | {
        addToHistory: boolean;
      }
    | undefined
) => void;

// Event handlers for keyboard events
export default function useKeyboard(
  chat: Chat,
  cursor: Cursor,
  dispatchChatEvent: React.Dispatch<ChatAction>,
  dispatchCursorEvent: React.Dispatch<CursorAction>,
  setPresence: PressenceSetter
) {
  // Define refs for the reactive values to use them within a non-reactive logic,
  // thus not rerunning Callback unnecessarily and bypassing react linter.
  const chatRef = useRef(chat);
  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  const cursorRef = useRef(cursor);
  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  const dispatchCursorEventRef = useRef(dispatchCursorEvent);
  useEffect(() => {
    dispatchCursorEventRef.current = dispatchCursorEvent;
  }, [dispatchCursorEvent]);

  const dispatchChatEventRef = useRef(dispatchChatEvent);
  useEffect(() => {
    dispatchChatEventRef.current = dispatchChatEvent;
  }, [dispatchChatEvent]);

  const setPresenceRef = useRef(setPresence);
  useEffect(() => {
    setPresenceRef.current = setPresence;
  }, [setPresence]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    switch (event.key.toUpperCase()) {
      case "\\": {
        if (cursorRef.current.mode !== CursorMode.Chat) {
          dispatchCursorEventRef.current({ type: "CHANGE_TO_CHAT_MODE" });
        }
        break;
      }
      case "E": {
        if (cursorRef.current.mode !== CursorMode.Chat) {
          dispatchCursorEventRef.current({
            type: "CHANGE_TO_REACTION_SELECTION_MODE",
          });
        }
        break;
      }
      case "ESCAPE": {
        setPresenceRef.current({ message: "" });
        dispatchChatEventRef.current({ type: "CLEAR_MESSAGE" });
        dispatchCursorEventRef.current({
          type: "CHANGE_TO_DEFAULT_MODE",
        });
        break;
      }
      case "ENTER": {
        setPresenceRef.current({ message: chatRef.current.message });
        dispatchChatEventRef.current({ type: "CLEAR_MESSAGE" });
        dispatchCursorEventRef.current({
          type: "CHANGE_TO_DEFAULT_MODE",
        });
        break;
      }
      default: {
        // console.log("Key");
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);
}
