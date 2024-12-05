import { useEffect } from "react";

const modifiers = ["altKey", "ctrlKey", "shiftKey", "metaKey"] as const satisfies (keyof KeyboardEvent)[];

export function useShortcut(modifier: (typeof modifiers)[number], key: string, callback: () => unknown) {
  const keyDownHandler = (event: KeyboardEvent) => {
    if (event[modifier] && event.key === key) {
      callback?.();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });
}
