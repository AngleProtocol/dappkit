import { createElement, forwardRef } from "react";
import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";
import { textStyles } from "./Text";

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
  { twMerge: false },
);

export type TitleProps = Component<
  Styled<typeof titleStyles> & {
    h?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: Styled<typeof textStyles>["size"];
  },
  HTMLHeadingElement
>;

const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title(
  { look, h, size: _size, className, ...props }: TitleProps,
  ref,
) {
  const size = _size ?? h;
  const tag = `h${h}` as keyof JSX.IntrinsicElements;

  return createElement(
    tag,
    {
      ref,
      className: mergeClass(titleStyles({ look, size }), className),
      ...props,
    },
    props.children,
  );
});

export default Title;
