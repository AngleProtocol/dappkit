import { useCallback, useEffect, useRef, useState } from "react";

export function useOverflowingRef<T extends HTMLElement>() {
  const [overflowing, setOverflowing] = useState(false);
  const ref = useRef<T>(null);

  const onResize = useCallback(() => {
    const span = ref.current;

    if (span) {
      setOverflowing(span.scrollWidth > span.clientWidth);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return { overflowing, ref };
}
