import { mergeClass } from "../../utils/css";
import type { Component } from "../../utils/types";

export type DividerProps = Component<{
  vertical?: boolean;
  horizontal?: boolean;
}>;

export default function Divider({
  vertical,
  horizontal,
  className,
  ...props
}: DividerProps) {
  if (horizontal)
    return (
      <div
        className={mergeClass(
          "border-t-1 border-b-0 h-1 box-border w-full bg-main-0",
          className
        )}
        {...props}
      />
    );
  return (
    <div
      className={mergeClass("border-r-1 self-stretch w-px h-auto", className)}
      {...props}
    />
  );
}
