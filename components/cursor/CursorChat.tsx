import { Presence } from "@/liveblocks.config";
import CursorSVG from "@/public/assets/CursorSVG";
import { CursorMode } from "@/types/type";
import React, { Fragment } from "react";
import { CursorData } from "../live/Live";
import getPixels from "@/lib/personal/getPixels";
import getTranslationStyle from "@/lib/personal/getTranslationStyle";

interface Props {
  presence: Presence;
  cursorData: CursorData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CursorChat({ presence, cursorData, onChange }: Props) {
  const translationSyle = getTranslationStyle(getPixels(presence.cursor));

  return (
    <div className="absolute" style={{ ...translationSyle, zIndex: 10 }}>
      {cursorData.mode === CursorMode.Chat && (
        <div className="bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
          <input
            className="w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
            autoFocus={true}
            onChange={onChange}
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
