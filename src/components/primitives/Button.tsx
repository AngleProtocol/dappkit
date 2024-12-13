import { Link } from "@remix-run/react";
import { type VariantProps, tv } from "tailwind-variants";
import useThemableProps from "../../hooks/theming/useThemableProps";
import { mergeClass } from "../../utils/css";
import type { Component, Themable } from "../../utils/types";
import EventBlocker from "./EventBlocker";

export const buttonStyles = tv(
  {
    base: "flex items-center dim !leading-none select-none rounded-full focus-visible:outline focus-visible:outline-main-12 text-nowrap font-text ease font-bold text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
    variants: {
      look: {
        soft: "text-main-12 !p-0 active:text-main-11 outline-offset-4",
        base: "text-main-12 border-1 border-main-11 active:border-main-10",
        bold: "text-main-1 bg-main-11 active:bg-main-10",
        tint: "text-main-1 bg-accent-10 active:bg-accent-9",
        hype: "text-main-1 bg-accent-11 active:bg-accent-10",
      },
      size: {
        xs: "px-sm py-xs gap-sm text-xs",
        sm: "px-sm py-md gap-sm text-sm",
        md: "px-md py-md gap-sm text-base",
        lg: "px-lg py-lg gap-sm text-lg",
        xl: "px-xl py-xl gap-sm text-xl",
      },
    },
    defaultVariants: {
      look: "base",
      size: "md",
    },
  },
  { twMerge: false },
);

type ButtonStyleProps = VariantProps<typeof buttonStyles>;

export type ButtonProps = Component<
  ButtonStyleProps &
    Themable & {
      to?: string;
      external?: boolean;
      className?: string;
      type?: "button" | "submit" | "reset";
      bold?: boolean;
      disabled?: boolean;
    },
  HTMLButtonElement
>;

export default function Button({
  look,
  size,
  to,
  theme,
  className,
  bold,
  children,
  external,
  disabled,
  ...props
}: ButtonProps) {
  const themeVars = useThemableProps(props);
  const styleProps = buttonStyles({ look, size });
  const styleBold = bold ? "font-bold" : "";

  if (to && external)
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => window.open(to, "_blank", "noopener noreferrer")}
        className={mergeClass(styleProps, styleBold, className, disabled && "disabled")}>
        {children}
      </a>
    );

  if (to) {
    return (
      <EventBlocker>
        <Link
          prefetch="intent"
          to={to}
          className={mergeClass(styleProps, styleBold, className, disabled && "disabled")}
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}>
          {children}
        </Link>
      </EventBlocker>
    );
  }

  return (
    <button
      style={themeVars}
      className={mergeClass(styleProps, styleBold, className, disabled && "disabled")}
      type="button"
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
}
