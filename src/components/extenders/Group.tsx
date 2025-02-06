import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";

export const groupStyles = tv({
  base: "flex flex-row flex-wrap",
  variants: {
    size: {
      xs: "gap-xs",
      sm: "gap-sm",
      md: "gap-md",
      lg: "gap-lg",
      xl: "gap-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type GroupProps = Component<Styled<typeof groupStyles>, HTMLDivElement>;

export default function Group({ size, className, children, ...props }: GroupProps) {
  return (
    <div className={mergeClass(groupStyles({ size }), className)} {...props}>
      {children}
    </div>
  );
}
