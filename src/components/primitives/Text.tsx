import clsx from "clsx";
import { tv } from "tailwind-variants";
import type { Component, Styled } from "../../utils/types";

export const textStyles = tv({
  base: "text-main-11 font-default font-normal text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
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
        "font-bold leading-tight !text-[clamp(92px,3.33vw+4.5rem,130px)]",
      1: "text-3xl",
      2: "font-bold leading-tight !text-[clamp(52px,1.1667vw+2.8125rem,66px)]",
      3: "font-bold leading-normal !text-[clamp(28px,1vw+1.375rem,40px)]",
      4: "text-md",
      5: "font-bold leading-normal text-[clamp(15px,0.4167vw+0.78125rem,20px)] uppercase tracking-[1.6px] ",
      6: "text-sm",
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
