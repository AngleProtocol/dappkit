import { mergeClass } from "dappkit/src";
import type { Component, Styled } from "dappkit/src";
import { format } from "numerable";
import { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const valueStyles = tv({
  base: "text-main-11 font-text font-normal",
  variants: {
    look: {
      soft: "text-main-8",
      base: "text-main-11",
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

export type ValueFormatProps = { children?: number | string; format: string; value?: boolean, fallback?: (value: number | string) => ReactNode };
export type ValueProps = Component<Styled<typeof valueStyles> & ValueFormatProps, HTMLDivElement>;

export default function Value({
  look,
  size,
  value,
  className,
  format: _format,
  children,
  fallback,
  ...props
}: ValueProps) {
  if (value) return format(children, _format, { currency: "USD" });
  return (
    <div
      className={mergeClass(valueStyles({ size, look }), className)}
      {...props}
    >
      {children && (fallback?.(children) || format(children, _format, { currency: "USD" }))}
    </div>
  );
}
