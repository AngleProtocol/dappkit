import { format } from "numerable";
import type { ReactNode } from "react";
import { textStyles } from "./Text";

import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";

export const valueStyles = tv({
  base: "text-main-11 font-text font-normal",
  variants: {
    look: textStyles.variants.look,
    size: textStyles.variants.size,
  },
  defaultVariants: {
    size: "md",
    look: "base",
  },
});

export type ValueFormatProps = {
  children?: number | string;
  format: string;
  value?: boolean;
  fallback?: (value: number | string) => ReactNode;
};
export type ValueProps = Component<Styled<typeof valueStyles> & ValueFormatProps, HTMLDivElement>;

export default function Value({
  look,
  size,
  value,
  prefix,
  className,
  format: _format,
  children,
  fallback,
  ...props
}: ValueProps) {
  if (value) return format(children, _format, { currency: "USD" });
  return (
    <p className={mergeClass(valueStyles({ size, look }), className)} {...props}>
      {children != null && (fallback?.(children) || format(children, _format, { currency: "USD" }))}
    </p>
  );
}
