import { mergeClass } from "src/utils/css";
import type { Component, Styled } from "src/utils/types";
import { tv } from "tailwind-variants";
import Block from "./Block";
import Icon from "./Icon";

export const buttonStyles = tv({
  base: "text-main-11 flex items-center gap-1 border-1 outline-offset-0 outline-0 text-nowrap",
  variants: {
    look: {
      base: "bg-main-4 border-main-7 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
      soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      bold: "bg-primary-4 border-primary-6 hover:bg-primary-5 active:bg-primary-3 text-primary-12 focus-visible:border-primary-9",
      hype: "bg-primary-9 border-primary-6 hover:bg-primary-10 active:bg-primary-8 text-primary-12 focus-visible:border-primary-10",
    },
    size: {
      xs: "px-2 py-1 text-xs rounded-xs",
      sm: "px-3 py-2 text-sm rounded-sm",
      md: "px-4 py-3 text-md rounded-md",
      lg: "px-5 py-4 text-lg rounded-lg",
      xl: "px-6 py-5 text-xl rounded-xl",
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
