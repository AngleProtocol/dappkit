import { mergeClass } from "dappkit/src";
import { useMemo } from "react";
import Text, { type TextProps } from "./Text";

export type HashProps = Omit<TextProps, "children"> & {
  format: "full" | "short" | "prefix";
  value?: boolean;
  children?: string;
};

export default function Hash({ format, value, children: hash, className, ...props }: HashProps) {
  const formatted: string = useMemo(() => {
    switch (format) {
      case "prefix":
        return hash.slice(0, 7);
      case "short":
        return `${hash.substring(0, 7)}…${hash.substring(hash.length, hash.length - 5)}`;
      default:
        return hash;
    }
  }, [hash, format]);

  if (value) return <span className="font-mono">{formatted}</span>;
  return (
    <Text {...props} className={mergeClass("hover:underline cursor-pointer font-mono", className)}>
      {formatted}
    </Text>
  );
}
