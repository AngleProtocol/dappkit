import { mergeClass } from "dappkit/src";
import type { Component, Styled } from "dappkit/src";
import { format } from "numerable";
import { tv } from "tailwind-variants";

export const valueStyles = tv({
  base: "text-main-11 font-mono font-normal",
  variants: {
    look: {
      base: "text-main-11",
      soft: "text-main-11",
      bold: "text-secondary-12",
      tint: "text-accent-12",
      hype: "text-accent-11",
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

export type ValueFormatProps = { children?: number; format: string; value?: boolean };
export type ValueProps = Component<Styled<typeof valueStyles> & ValueFormatProps, HTMLDivElement>;

export default function Value({ look, size, value, className, format: _format, children, ...props }: ValueProps) {
  if (value) return format(children, _format, { currency: "USD" });
  return (
    <div className={mergeClass(valueStyles({ size, look }), className)} {...props}>
      {format(children, _format, { currency: "USD" })}
    </div>
  );
}
