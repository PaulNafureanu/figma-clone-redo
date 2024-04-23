import { useReducer } from "react";

export enum CursorMode {
  Default,
  Chat,
  ReactionSelector,
  Reaction,
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface Cursor {
  mode: CursorMode;
  position: CursorPosition;
}

export type CursorAction =
  | {
      event: React.PointerEvent;
      type: "MOVE_POINTER";
    }
  | {
      type:
        | "REVERT_TO_DEFAULT"
        | "START_REACTION"
        | "CHANGE_TO_CHAT_MODE"
        | "CHANGE_TO_REACTION_SELECTION_MODE"
        | "CHANGE_TO_DEFAULT_MODE";
    };

function CursorReducer(cursor: Cursor, action: CursorAction) {
  switch (action.type) {
    case "MOVE_POINTER": {
      const { clientX, clientY } = action.event;
      const x = clientX / (window?.innerWidth || 1);
      const y = clientY / (window?.innerHeight || 1);
      return { ...cursor, position: { x, y } };
    }

    case "REVERT_TO_DEFAULT": {
      return { ...cursor, mode: CursorMode.Default };
    }

    case "START_REACTION": {
      return { ...cursor, mode: CursorMode.Reaction };
    }

    case "CHANGE_TO_CHAT_MODE": {
      const mode =
        cursor.mode === CursorMode.Chat ? CursorMode.Default : CursorMode.Chat;
      return { ...cursor, mode };
    }

    case "CHANGE_TO_REACTION_SELECTION_MODE": {
      const mode =
        cursor.mode === CursorMode.ReactionSelector
          ? CursorMode.Default
          : CursorMode.ReactionSelector;
      return { ...cursor, mode };
    }

    case "CHANGE_TO_DEFAULT_MODE": {
      return { ...cursor, mode: CursorMode.Default };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export default function useCursor(initialState?: Cursor) {
  return useReducer(
    CursorReducer,
    initialState ?? {
      mode: CursorMode.Default,
      position: { x: 0, y: 0 },
    }
  );
}
