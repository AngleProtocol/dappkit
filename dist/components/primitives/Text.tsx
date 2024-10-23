import clsx from "clsx";
import { tv } from "tailwind-variants";
import type { Component, Styled } from "../../utils/types";

export const textStyles = tv({
  base: "text-main-11 font-default font-normal",
  variants: {
    look: {
      base: "text-main-11",
      soft: "text-main-11",
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
    { look: "base", interactable: true, class: "hover:text-main-12 active:text-main-11" },
    { look: "bold", interactable: true, class: "hover:text-main-12" },
    { look: "tint", interactable: true, class: "hover:text-main-12" },
    { look: "hype", interactable: true, class: "hover:text-main-12" },
  ],
});

export type TextProps = Component<Styled<typeof textStyles>, HTMLParagraphElement>;

export default function Text({ look, size, interactable, className, ...props }: TextProps) {
  return <p className={clsx(textStyles({ look, size, interactable }), className)} {...props} />;
}
