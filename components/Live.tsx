import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CursorMode } from "@/types/type";
import CursorChat, { CursorChatData } from "./cursor/CursorChat";

export default function Live() {
  const others = useOthers();
  const [myPresence, setMyPresence] = useMyPresence();
  const [myCursorData, setMyCursorData] = useState<CursorChatData>({
    mode: CursorMode.Default,
  });

  const cursorModeRef = useRef<CursorMode>(myCursorData.mode);
  cursorModeRef.current = myCursorData.mode;

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();
      switch (event.key) {
        case "Alt": {
          console.log(cursorModeRef.current);
          const isChatMode = cursorModeRef.current === CursorMode.Chat;
          setMyCursorData({
            mode: isChatMode ? CursorMode.Default : CursorMode.Chat,
            message: undefined,
          });
          break;
        }

        case "Escape": {
          setMyPresence({ message: "" });
          break;
        }

        default: {
          break;
        }
      }
    };

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [setMyPresence]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const x = event.clientX / (window?.innerWidth || 1);
      const y = event.clientY / (window?.innerHeight || 1);

      setMyPresence({ cursor: { x, y } });
    },
    [setMyPresence]
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setMyPresence({ cursor: undefined });
    },
    [setMyPresence]
  );

  const handleCursorChatChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Test");
    setMyCursorData({
      ...myCursorData,
      message: event.currentTarget.value,
    });
  };

  const handleCursorChatKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    switch (event.key) {
      case "Enter": {
        setMyPresence({ message: myCursorData.message });
        setMyCursorData({
          mode: CursorMode.Default,
          message: undefined,
        });
        break;
      }

      case "Escape": {
        setMyPresence({ message: "" });
        setMyCursorData({
          mode: CursorMode.Default,
          message: undefined,
        });
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center text-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <h1 className="text-2xl text-white">Hello Figma Clone </h1>
      <CursorChat
        presence={myPresence}
        cursorData={myCursorData}
        onChange={handleCursorChatChange}
        onKeyUp={handleCursorChatKeyUp}
      />
      <LiveCursors others={others} />
    </div>
  );
}
