import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";

export const textStyles = tv(
  {
    base: "font-text text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
    variants: {
      look: {
        base: "text-main-12",
        soft: "text-main-11",
        bold: "text-main-12",
        tint: "text-accent-12",
        hype: "text-accent-11",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        display1: "font-title font-bold leading-tight uppercase !text-[clamp(44px,5vw+0.875rem,104px)]",
        1: "font-title font-bold leading-none !text-[clamp(44px,4.333vw+1.125rem,96px)]",
        2: "font-title font-bold leading-none !text-[clamp(38px,0.667vw+2.125rem,46px)]",
        3: "font-text font-bold leading-none !text-[clamp(26px,0.667vw+1.375rem,34px)]",
        4: "font-text font-bold leading-[1.18] !text-[clamp(18px,0.667vw+0.875rem,26px)]",
        5: "font-text font-bold leading-normal !text-[clamp(15px,0.25vw+0.84375rem,18px)] uppercase tracking-[0.8px] ",
        6: "font-title !text-sm",
      },
      interactable: {
        true: "cursor-pointer select-none",
        false: "",
      },
    },
    defaultVariants: {
      look: "soft",
      size: "md",
    },
  },
  { twMerge: false },
);

export type TextProps = Component<Styled<typeof textStyles> & { bold?: boolean }, HTMLParagraphElement>;

export default function Text({ look, size, style, bold, interactable, className, ...props }: TextProps) {
  const styleBold = bold ? "font-bold" : "";
  return <span className={mergeClass(textStyles({ look, size, interactable }), styleBold, className)} {...props} />;
}
