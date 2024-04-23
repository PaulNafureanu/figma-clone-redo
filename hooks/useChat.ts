import { useReducer } from "react";

export interface Chat {
  message: string;
}

export type ChatAction =
  | { event: React.ChangeEvent<HTMLInputElement>; type: "CHANGE_MESSAGE" }
  | { type: "CLEAR_MESSAGE" };

function ChatReducer(chat: Chat, action: ChatAction) {
  switch (action.type) {
    case "CHANGE_MESSAGE": {
      const message = action.event.currentTarget?.value || "";
      return { ...chat, message };
    }

    case "CLEAR_MESSAGE": {
      return { ...chat, message: "" };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export default function useChat(initialState?: Chat) {
  return useReducer(ChatReducer, initialState ?? { message: "" });
}
