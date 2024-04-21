import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "../cursor/LiveCursors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CursorMode } from "@/types/type";
import CursorChat from "../cursor/CursorChat";
import { ReactionWrapper } from "../reaction/ReactionWrapper";

export interface CursorData {
  mode: CursorMode;
  message?: string;
  reaction?: string;
}

export default function Live() {
  const others = useOthers();
  const [myPresence, setMyPresence] = useMyPresence();
  const [myCursorData, setMyCursorData] = useState<CursorData>({
    mode: CursorMode.Default,
  });

  // Create a reference for the cursor data to be readonly in the useEffect and useCallback
  const cursorDataRef = useRef(myCursorData);
  useEffect(() => {
    cursorDataRef.current = myCursorData;
  }, [myCursorData]);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      switch (key) {
        case "\\": {
          setMyCursorData((cursorData) => {
            const newCursorMode =
              cursorData.mode === CursorMode.Chat
                ? CursorMode.Default
                : CursorMode.Chat;
            return { mode: newCursorMode };
          });

          break;
        }

        case "ENTER": {
          setMyPresence({ message: cursorDataRef.current.message });
          setMyCursorData(() => {
            return {
              mode: CursorMode.Default,
              message: undefined,
            };
          });
          break;
        }

        case "ESCAPE": {
          setMyPresence({ message: undefined });
          setMyCursorData(() => {
            return {
              mode: CursorMode.Default,
              message: undefined,
            };
          });
          break;
        }

        case "E": {
          setMyCursorData((cursorData) => {
            const newCursorMode =
              cursorData.mode === CursorMode.ReactionSelector
                ? CursorMode.Default
                : CursorMode.ReactionSelector;
            return { mode: newCursorMode };
          });

          break;
        }

        default: {
          break;
        }
      }

      return () => {
        setMyPresence({ cursor: undefined, message: undefined });
        setMyCursorData((cursorData) => {
          return {
            mode: CursorMode.Default,
            message: undefined,
            reaction: undefined,
          };
        });
      };
    },

    [setMyPresence]
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  // Event handlers for mouse events

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      const x = event.clientX / (window?.innerWidth || 1);
      const y = event.clientY / (window?.innerHeight || 1);
      setMyPresence({ cursor: { x, y } });
    },
    [setMyPresence]
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      setMyPresence({ cursor: undefined });
      setMyCursorData((cursorData) => {
        return { ...cursorData, mode: CursorMode.Default };
      });
    },
    [setMyPresence]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (myCursorData.mode === CursorMode.ReactionSelector) {
        setMyCursorData((cursorData) => {
          return { ...cursorData, mode: CursorMode.Reaction };
        });
      }
    },
    [myCursorData.mode]
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (myCursorData.mode === CursorMode.Reaction) {
        setMyCursorData((cursorData) => {
          return { ...cursorData, mode: CursorMode.Default };
        });
      }
    },
    [myCursorData.mode]
  );

  // Event handlers for cursor chat

  const handleCursorChatChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Here");
      setMyCursorData({
        ...cursorDataRef.current,
        message: event.currentTarget?.value,
      });
    },
    []
  );

  const handleReactionSelection = useCallback((reaction: string) => {
    setMyCursorData((cursorData) => {
      return { ...cursorData, reaction };
    });
  }, []);

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
        presence={myPresence}
        cursorData={myCursorData}
        onChange={handleCursorChatChange}
      />
      <ReactionWrapper
        presence={myPresence}
        cursorData={myCursorData}
        onReactionSelected={handleReactionSelection}
      />
    </div>
  );
}
