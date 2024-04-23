import { useReducer } from "react";

export interface Reaction {
  value: string;
  timestamp: number;
  point: { x: number; y: number };
}

export type ReactionAction = {
  value: string;
  type: "SELECT_REACTION";
};

function ReactionReducer(reaction: Reaction, action: ReactionAction) {
  switch (action.type) {
    case "SELECT_REACTION": {
      const { value } = action;
      return { ...reaction, value };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export default function useReaction(initialState?: Reaction) {
  return useReducer(
    ReactionReducer,
    initialState ?? {
      value: "",
      timestamp: Date.now(),
      point: { x: 0, y: 0 },
    }
  );
}
