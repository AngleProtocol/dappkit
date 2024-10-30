import { Link } from "@remix-run/react";
import { tv, type VariantProps } from "tailwind-variants";
import useThemedVariables from "../../hooks/theming/useThemedVariables";
import { mergeClass } from "../../utils/css";
import type { Component, Themable } from "../../utils/types";

export const buttonStyles = tv({
  base: "text-main-11 flex items-center outline-offset-0 outline-0 text-nowrap font-main font-bold text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
  variants: {
    look: {
      soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12 focus-visible:border-main-9",
      base: "bg-main-4 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12 focus-visible:border-main-9",
      bold: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
      tint: "bg-accent-3 border-accent-3 hover:bg-accent-5 active:bg-accent-3 text-accent-11 focus-visible:border-accent-9",
      hype: "bg-accent-9 border-accent-9 hover:bg-accent-10 active:bg-accent-8 text-main-1 focus-visible:border-accent-10",
      text: "!p-0 lg:opacity-100 lg:hover:opacity-70 transition-opacity text-main-12",
    },
    size: {
      xs: "px-xs py-xs rounded-xs gap-xs text-xs",
      sm: "px-sm py-sm/2 rounded-sm gap-sm text-sm",
      md: "px-md py-md/2 rounded-md gap-md text-base",
      lg: "px-lg py-lg/2 rounded-lg gap-lg text-lg",
      xl: "px-xl py-xl/2 rounded-xl gap-xl text-xl",
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
});

type ButtonStyleProps = VariantProps<typeof buttonStyles>;

export type ButtonProps = Component<
  ButtonStyleProps &
    Themable & {
      to?: string;
      external?: boolean;
      className?: string;
      type?: "button" | "submit" | "reset";
    },
  HTMLButtonElement
>;

export default function Button({
  look,
  size,
  to,
  theme,
  coloring,
  accent,
  className,
  children,
  external,
  ...props
}: ButtonProps) {
  const themeVars = useThemedVariables(coloring, accent);

  const styleProps = buttonStyles({ look, size });

  if (to) {
    return (
      <Link
        to={to}
        className={mergeClass(styleProps, className)}
        {...(external && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      style={themeVars}
      className={mergeClass(styleProps, className)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
