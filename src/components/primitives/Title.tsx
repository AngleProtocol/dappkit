import clsx from "clsx";
import { tv } from "tailwind-variants";
import type { Component, Styled } from "../../utils/types";
import { textStyles } from "./Text";
import { mergeClass } from "../../utils/css";

export const titleStyles = tv(
  {
    extend: textStyles,
    base: "font-title font-bold",
    variants: {
      look: {
        base: "text-main-12",
        soft: "text-main-11",
        bold: "text-main-12",
        hype: "text-accent-12",
      },
    },
    defaultVariants: {
      size: "md",
      look: "base",
    },
  },
  { twMerge: false }
);

export type TitleProps = Component<
  Styled<typeof titleStyles> & {
    h?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: Styled<typeof textStyles>["size"];
  },
  HTMLHeadingElement
>;

export default function Title({
  look,
  h,
  size: _size,
  className,
  ...props
}: TitleProps) {
  const size = _size ?? h;
  switch (h) {
    case 1:
      return (
        <h1
          className={mergeClass(titleStyles({ look, size }), className)}
          {...props}
        />
      );
    case 2:
      return (
        <h2
          className={mergeClass(titleStyles({ look, size }), className)}
          {...props}
        />
      );
    case 3:
      return (
        <h3
          className={mergeClass(titleStyles({ look, size }), className)}
          {...props}
        />
      );
    case 4:
      return (
        <h4
          className={mergeClass(titleStyles({ look, size }), className)}
          {...props}
        />
      );
    case 5:
      return (
        <h5
          className={mergeClass(titleStyles({ look, size }), className)}
          {...props}
        />
      );
    default:
      break;
  }
}
