import clsx from "clsx";
import { tv } from "tailwind-variants";
import type { Component, Styled } from "../../utils/types";

export const textStyles = tv({
  base: "text-main-11 font-text font-normal text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
  variants: {
    look: {
      base: "text-main-11",
      soft: "text-main-11",
      bold: "text-secondary-12",
      tint: "text-accent-12",
      hype: "text-accent-11",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      display1:
        "font-title font-bold leading-tight italic uppercase !text-[clamp(44px,5vw+0.875rem,104px)]",
      1: "font-title !text-3xl",
      2: "font-title font-bold leading-none !text-[clamp(52px,1vw+2.875rem,64px)]",
      3: "font-title font-bold leading-snug italic !text-[clamp(28px,1vw+1.375rem,40px)]",
      4: "font-title leading-normal !text-[clamp(16px,1vw+1.375rem,30px)]",
      5: "font-title font-semibold leading-normal !text-[clamp(15px,0.25vw+0.84375rem,18px)] uppercase tracking-[1.6px] ",
      6: "font-title !text-sm",
    },
    interactable: {
      true: "cursor-pointer select-none",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    look: "base",
    interactable: false,
  },
  compoundVariants: [
    { look: "soft", interactable: true, class: "hover:text-main-12" },
    {
      look: "base",
      interactable: true,
      class: "hover:text-main-12 active:text-main-11",
    },
    { look: "bold", interactable: true, class: "hover:text-main-12" },
    { look: "tint", interactable: true, class: "hover:text-main-12" },
    { look: "hype", interactable: true, class: "hover:text-main-12" },
  ],
});

export type TextProps = Component<
  Styled<typeof textStyles>,
  HTMLParagraphElement
>;

export default function Text({
  look,
  size,
  style,
  interactable,
  className,
  ...props
}: TextProps) {
  return (
    <p
      className={clsx(textStyles({ look, size, interactable }), className)}
      {...props}
    />
  );
}
