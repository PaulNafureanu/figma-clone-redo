import { useEffect, useRef } from "react";

export default function useReactiveValueRef<T>(state: T) {
  const ref = useRef(state);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref.current;
}
