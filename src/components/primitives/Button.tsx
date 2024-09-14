import { mergeClass } from "src/utils/css";
import type { Component, Styled } from "src/utils/types";
import { tv } from "tailwind-variants";
import Block from "./Block";
import Icon from "./Icon";
import { Link } from "@remix-run/react";

export const buttonStyles = tv({
  base: "text-main-11 flex items-center bg-gradient-to-tr border-1 outline-offset-0 outline-0 text-nowrap font-main font-bold",
  variants: {
    look: {
      soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      base: "bg-main-0 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      bold: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
      tint: "bg-primary-3 border-primary-3 hover:bg-primary-5 active:bg-primary-3 text-primary-11 focus-visible:border-primary-9",
      hype: "bg-primary-9 border-primary-9 hover:bg-primary-10 active:bg-primary-8 text-main-12 focus-visible:border-primary-10",
    },
    size: {
      xs: "px-xs*2 py-xs text-xs rounded-xs gap-xs",
      sm: "px-sm py-sm/2 text-sm rounded-sm gap-sm",
      md: "px-md py-md/2 text-md rounded-md gap-md",
      lg: "px-lg py-lg/2 text-lg rounded-lg gap-lg",
      xl: "px-xl py-xl/2 text-xl rounded-xl gap-xl",
    },
  },
});

export type ButtonProps = Component<
  Styled<typeof buttonStyles> & { to?: string },
  HTMLButtonElement
>;

export default function Button({ look, size, to, className, children, ...props }: ButtonProps) {
  if (to)
    return (
      <Link
        className={mergeClass(
          buttonStyles({ look: look ?? "base", size: size ?? "md" }),
          className,
        )}
        {...props}
        to={to}
        type="button"
      >
        {children}
      </Link>
    );
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
