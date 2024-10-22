import { useLocation, useSearchParams } from "@remix-run/react";
import { useCallback, useMemo } from "react";

type Options = Parameters<ReturnType<typeof useSearchParams>["1"]>["1"];

export default function useSearchParamState<T>(
  key: string,
  store: (v: T) => string,
  transform: (v: string) => T,
  options?: Options,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const set = useCallback(
    (value: T) => {
      setSearchParams(params => {
        const v = store?.(value);

        if (!v && params.has(key)) params.delete(key);
        else params.set(key, v);

        return params;
      }, options);
    },
    [key, store, setSearchParams, options],
  );

  const state = useMemo(() => {
    const value = searchParams.get(key);

    if (value === null) return;
    return transform(value);
  }, [key, location, searchParams, transform]);

  return [state, set] as [typeof state, typeof set];
}
