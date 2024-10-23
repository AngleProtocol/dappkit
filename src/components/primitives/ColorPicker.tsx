import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, GetSet, Styled } from "../../utils/types";

export const colorPickerStyles = tv({
  base: "bg-main-0 border-none p-0 h-6 w-6",
  variants: {
    look: {
      soft: "h-1",
      base: "",
      bold: "",
      hype: "",
    },
    size: {
      xs: "text-xs rounded",
      sm: "text-sm rounded-sm",
      md: "text-md rounded-md",
      lg: "text-lg rounded-lg",
      xl: "text-xl rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
    look: "base",
  },
});

export type ColorPickerProps = Component<
  Styled<typeof colorPickerStyles> & { state: GetSet<string> },
  HTMLInputElement
>;

export default function ColorPicker({ look, size, state, className, ...props }: ColorPickerProps) {
  return (
    <input
      className={mergeClass(colorPickerStyles({ look, size }), className)}
      value={state?.[0]}
      onChange={e => state?.[1]?.(e?.target?.value)}
      {...props}
      type="color"
    />
  );
}
