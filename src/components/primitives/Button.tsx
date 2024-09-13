import { mergeClass } from "src/utils/css";
import type { Component, Styled } from "src/utils/types";
import { tv } from "tailwind-variants";
import Block from "./Block";
import Icon from "./Icon";

export const buttonStyles = tv({
  base: "text-main-11 flex items-center gap-1 border-1 outline-offset-0 outline-0 text-nowrap",
  variants: {
    look: {
      base: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
      soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      bold: "bg-primary-4 border-primary-4 hover:bg-primary-5 active:bg-primary-3 text-primary-12 focus-visible:border-primary-9",
      hype: "bg-primary-9 border-primary-9 hover:bg-primary-10 active:bg-primary-8 text-main-12 focus-visible:border-primary-10",
    },
    size: {
      xs: "px-xs py-xs/2 text-xs rounded-xs",
      sm: "px-sm py-xs text-sm rounded-sm",
      md: "px-md py-sm text-md rounded-md",
      lg: "px-lg py-md text-lg rounded-lg",
      xl: "px-xl py-lg text-xl rounded-xl",
    },
  },
});

export type ButtonProps = Component<Styled<typeof buttonStyles>, HTMLButtonElement>;

export default function Button({ look, size, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={mergeClass(buttonStyles({ look: look ?? "base", size: size ?? "md" }), className)}
      {...props}
      type="button"
    >
      {children}
    </button>
  );
}
