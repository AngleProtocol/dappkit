import { useCallback, useEffect, useState } from "react";

const COPY_TIMEOUT = 500;

export default function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false);
      }, COPY_TIMEOUT);

      return () => {
        clearTimeout(hide);
      };
    }
    return;
  }, [isCopied, setIsCopied, COPY_TIMEOUT]);

  const copy = useCallback(
    (value: string | undefined) => {
      if (!value) return;

      navigator.clipboard.writeText(value);
      setIsCopied(true);
    },
    [setIsCopied],
  );

  return { copy, isCopied };
}
