import { Presence } from "@/liveblocks.config";
import CursorSVG from "@/public/assets/CursorSVG";
import { CursorMode } from "@/types/type";
import React, { Fragment } from "react";

export interface CursorChatData {
  mode: CursorMode;
  message?: string;
}

interface Props {
  presence: Presence;
  cursorData: CursorChatData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function CursorChat({ presence, cursorData, onChange, onKeyUp }: Props) {
  const xPx = Math.round((presence.cursor?.x || 0) * (window.innerWidth || 1));
  const yPx = Math.round((presence.cursor?.y || 0) * (window.innerHeight || 1));

  return (
    <div
      className="absolute z-10 top-0 left-0"
      style={{ transform: `translate(${xPx}px, ${yPx}px)` }}
    >
      {presence.cursor && <CursorSVG color="#000" />}
      {cursorData.mode === CursorMode.Chat && (
        <div className="z-10 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
          <input
            className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
            autoFocus={true}
            onChange={onChange}
            onKeyUp={onKeyUp}
            placeholder={presence.message ?? "Type a message..."}
            value={cursorData.message ?? ""}
            maxLength={50}
          />
        </div>
      )}
    </div>
  );
}

export default CursorChat;
