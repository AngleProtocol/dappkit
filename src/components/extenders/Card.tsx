import { Link } from "@remix-run/react";
import { tv } from "tailwind-variants";
import useThemedVariables from "../../hooks/theming/useThemedVariables";
import { mergeClass } from "../../utils/css";
import type { Component, Styled, Themable } from "../../utils/types";
import { boxStyles } from "../primitives/Box";
import { ButtonProps } from "../primitives/Button";

export const cardStyles = tv({
  extend: boxStyles,
  base: "text-main-11 flex !justify-start items-center outline-offset-0 outline-0 text-nowrap font-text font-bold",
  variants: {
    look: {
      soft: "",
      base: "",
      bold: "bg-main-2 border-main-2",
      tint: "",
      hype: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
});

export type CardProps = Component<
  Styled<typeof cardStyles> & Themable,
  HTMLButtonElement
>;

export default function Card({
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
        className={mergeClass(
          cardStyles({
            look: look === "text" ? "base" : look ?? "base",
            size: size ?? "md",
          }),
          className
        )}
        to={to}
        type="button"
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      style={themeVars}
      className={mergeClass(
        cardStyles({
          look: look === "text" ? "base" : look ?? "base",
          size: size ?? "md",
        }),
        className
      )}
      {...props}
      type="button"
    >
      {children}
    </button>
  );
}
