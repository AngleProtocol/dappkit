import { mergeClass } from "src/utils/css";
import type { Component } from "src/utils/types";

export type DividerProps = Component<{
  vertical?: boolean;
  horizontal?: boolean;
}>;

export default function Divider({ vertical, horizontal, className, ...props }: DividerProps) {
  return <div className={mergeClass("border-r-1 w-0 h-full", className)} {...props} />;
}
