import { forwardRef } from "react";
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

  switch (h) {
    case 1:
      return <h1 ref={ref} className={mergeClass(titleStyles({ look, size }), className)} children={" "} {...props} />;
    case 2:
      return <h2 ref={ref} className={mergeClass(titleStyles({ look, size }), className)} children={" "} {...props} />;
    case 3:
      return <h3 ref={ref} className={mergeClass(titleStyles({ look, size }), className)} children={" "} {...props} />;
    case 4:
      return <h4 ref={ref} className={mergeClass(titleStyles({ look, size }), className)} children={" "} {...props} />;
    case 5:
      return <h5 ref={ref} className={mergeClass(titleStyles({ look, size }), className)} children={" "} {...props} />;
    default:
      break;
  }
});

export default Title;
