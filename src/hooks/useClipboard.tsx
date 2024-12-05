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
  }, [isCopied]);

  const copy = useCallback((value: string | undefined) => {
    if (!value) return;

    navigator.clipboard.writeText(value);
    setIsCopied(true);
  }, []);

  return { copy, isCopied };
}
