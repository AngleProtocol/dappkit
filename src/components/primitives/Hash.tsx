import { useMemo } from "react";
import { type Styled, mergeClass } from "../..";
import Text, { type TextProps } from "./Text";

import Copy from "./Copy";
import type { textStyles } from "./Text";

export type HashProps = Omit<TextProps, "children" | "value"> & {
  format: "full" | "short" | "prefix";
  children?: string;
  size?: Styled<typeof textStyles>["size"];
  copy?: boolean;
  value?: boolean;
};

export default function Hash({ value, format, copy, size, children: hash, className, ...props }: HashProps) {
  const formatted: string = useMemo(() => {
    if (!hash) return "";

    switch (format) {
      case "prefix":
        return hash.slice(0, 6);
      case "short":
        return `${hash?.substring(0, 6)}…${hash.substring(hash.length - 4)}`;
      default:
        return hash;
    }
  }, [hash, format]);

  if (value) return formatted;
  return (
    <Text
      size={size}
      {...props}
      className={mergeClass("items-center gap-sm font-text", copy && "select-none inline-flex", className)}>
      {formatted}
      {copy && <Copy value={hash} className="cursor-pointer" />}
    </Text>
  );
}
