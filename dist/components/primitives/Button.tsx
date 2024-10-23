import { Link } from "@remix-run/react";
import { tv } from "tailwind-variants";
import useThemedVariables from "../../hooks/theming/useThemedVariables";
import { mergeClass } from "../../utils/css";
import type { Component, Styled, Themable } from "../../utils/types";

export const buttonStyles = tv({
  base: "text-main-11 flex items-center outline-offset-0 outline-0 text-nowrap font-main font-bold",
  variants: {
    look: {
      soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      base: "bg-main-0 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      bold: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
      tint: "bg-accent-3 border-accent-3 hover:bg-accent-5 active:bg-accent-3 text-accent-11 focus-visible:border-accent-9",
      hype: "bg-accent-9 border-accent-9 hover:bg-accent-10 active:bg-accent-8 text-main-1 focus-visible:border-accent-10",
    },
    size: {
      xs: "px-xs py-xs text-xs rounded-xs gap-xs",
      sm: "px-sm py-sm/2 text-sm rounded-sm gap-sm",
      md: "px-md py-md/2 text-md rounded-md gap-md",
      lg: "px-lg py-lg/2 text-lg rounded-lg gap-lg",
      xl: "px-xl py-xl/2 text-xl rounded-xl gap-xl",
    },
  },
});

export type ButtonProps = Component<Styled<typeof buttonStyles> & Themable, {a: string}>;

export default function Button({
  look,
  size,
  to,
  theme,
  coloring,
  accent,
  className,
  children,
  ...props
}: ButtonProps & { to?: string }) {
  const themeVars = useThemedVariables(coloring, accent);

  if (to) {
    return (
      <Link
        {...{ size, look }}
        className={mergeClass(buttonStyles({ look: look ?? "base", size: size ?? "md" }), className)}
        to={to}
        type="button">
        {children}
      </Link>
    );
  }

  return (
    <button
      style={themeVars}
      className={mergeClass(buttonStyles({ look: look ?? "base", size: size ?? "md" }), className)}
      {...props}
      type="button">
      {children}
    </button>
  );
}
