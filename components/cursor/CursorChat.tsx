import getPixels from "@/lib/personal/getPixels";
import getTranslationStyle from "@/lib/personal/getTranslationStyle";
import { Presence } from "@/liveblocks.config";
import React from "react";
import { Chat } from "../../hooks/useChat";
import { Cursor, CursorMode } from "../../hooks/useCursor";

interface Props {
  presence: Presence;
  cursor: Cursor;
  chat: Chat;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CursorChat({ presence, cursor, chat, onChange }: Props) {
  const translationSyle = getTranslationStyle(getPixels(cursor.position));

  return (
    <div className="absolute" style={{ ...translationSyle, zIndex: 10 }}>
      {cursor.mode === CursorMode.Chat && (
        <div className="bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
          <input
            className="w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
            autoFocus={true}
            onChange={onChange}
            placeholder={presence.message || "Type a message..."}
            value={chat.message}
            maxLength={50}
          />
        </div>
      )}
    </div>
  );
}

export default CursorChat;
