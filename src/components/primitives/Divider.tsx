import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";

export const dividerStyles = tv(
  {
    base: "border-t-1 border-b-0 box-border bg-main-0",
    variants: {
      look: {
        soft: "border-main-8",
        base: "border-main-11",
        bold: "border-accent-11",
        tint: "border-t-2 border-main-1",
        hype: "border-t-2 border-accent-11",
      },
      vertical: {
        true: "self-stretch w-px h-auto border-t-0",
        false: "h-1 w-full",
      },
    },
    defaultVariants: {
      look: "base",
    },
    compoundVariants: [
      { look: "soft", vertical: true, class: "border-r-1" },
      {
        look: "base",
        vertical: true,
        class: "border-r-1",
      },
      { look: "bold", vertical: true, class: "border-r-1" },
      { look: "tint", vertical: true, class: "border-r-2" },
      { look: "hype", vertical: true, class: "border-r-2" },
    ],
  },
  { twMerge: false }
);

export type DividerProps = Component<
  Styled<typeof dividerStyles> & {
    vertical?: boolean;
    horizontal?: boolean;
  }
>;

export default function Divider({
  vertical = false,
  horizontal = true,
  look,
  className,
  ...props
}: DividerProps) {
  if (horizontal)
    return (
      <div
        className={mergeClass(dividerStyles({ look }), className)}
        {...props}
      />
    );

  return (
    <div
      className={mergeClass(
        dividerStyles({ look, vertical: vertical ?? !horizontal }),
        className
      )}
      {...props}
    />
  );
}
