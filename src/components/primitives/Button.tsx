import { Link } from "@remix-run/react";
import { tv, type VariantProps } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Themable } from "../../utils/types";
import useThemableProps from "../../hooks/theming/useThemableProps";
import EventBlocker from "./EventBlocker";

export const buttonStyles = tv(
  {
    base: "flex items-center !leading-none select-none rounded-full text-nowrap font-text ease font-bold text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
    variants: {
      look: {
        soft: "text-main-12 !p-0 lg:opacity-100 lg:hover:opacity-70 transition-opacity focus-visible:border-main-9",
        base: "text-main-12 hover:text-main-12 border-1 border-main-11 hover:bg-main-4 active:bg-main-3 focus-visible:border-main-9",
        bold: "text-main-1 bg-main-11 hover:bg-main-5 active:bg-main-3 focus-visible:border-main-9",
        tint: "text-main-1 bg-accent-10 hover:bg-accent-5 active:bg-accent-3 focus-visible:border-accent-9",
        hype: "text-main-1 bg-accent-11 hover:bg-accent-12 active:bg-accent-8 focus-visible:border-accent-10",
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
  { twMerge: false }
);

type ButtonStyleProps = VariantProps<typeof buttonStyles>;

export type ButtonProps = Component<
  ButtonStyleProps &
    Themable & {
      to?: string;
      external?: boolean;
      className?: string;
      type?: "button" | "submit" | "reset";
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
  children,
  external,
  disabled,
  ...props
}: ButtonProps) {
  const themeVars = useThemableProps(props);

  const styleProps = buttonStyles({ look, size });

  if (to) {
    return (
      <EventBlocker>
        <Link
          to={to}
          className={mergeClass(styleProps, className, disabled && "disabled")}
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {children}
        </Link>
      </EventBlocker>
    );
  }

  return (
    <button
      style={themeVars}
      className={mergeClass(styleProps, className, disabled && "disabled")}
      type="button"
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
