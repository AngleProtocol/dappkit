import { Link } from "@remix-run/react";
import { type VariantProps, tv } from "tailwind-variants";
import useThemableProps from "../../hooks/theming/useThemableProps";
import { mergeClass } from "../../utils/css";
import type { Component, Themable } from "../../utils/types";
import EventBlocker from "./EventBlocker";

export const buttonStyles = tv(
  {
    base: "flex items-center dim !leading-none select-none rounded-full disabled:opacity-60 disabled:pointer-events-none focus-visible:outline focus-visible:outline-main-12 font-text ease font-bold text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
    variants: {
      look: {
        soft: "bg-main-0 !p-0 text-main-12 border-1 border-main-0 active:text-accent-11 disabled:text-main-11 outline-offset-4",
        base: "bg-main-0 text-main-12 border-1 border-accent-10 active:text-accent-11 disabled:border-main-11 disabled:text-accent-12",
        bold: "bg-accent-10 text-accent-12 border-1 border-main-0 active:bg-accent-7 active:text-main-12 disabled:bg-main-11 disabled:text-accent-1",
        tint: "bg-accent-7 text-accent-12 border-1 border-main-0 active:bg-accent-7 active:text-main-12 disabled:bg-main-11 disabled:text-accent-1",
        hype: "bg-accent-11 text-accent-1 border-1 border-main-0 active:bg-accent-12 active:text-main-1 disabled:bg-main-11 disabled:text-accent-1",
      },
      size: {
        xs: "px-sm py-sm gap-sm text-xs",
        sm: "px-sm py-md gap-sm text-sm",
        md: "px-md py-md gap-sm text-base",
        lg: "px-lg py-lg gap-sm text-lg",
        xl: "px-xl py-xl gap-sm text-xl",
      },
      center: {
        true: "justify-center",
        false: "",
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
      onLink?: () => void;
      bold?: boolean;
      disabled?: boolean;
    },
  HTMLButtonElement
>;

export default function Button({
  look,
  size,
  center,
  to,
  theme,
  className,
  bold,
  onLink,
  children,
  external,
  disabled,
  ...props
}: ButtonProps) {
  const themeVars = useThemableProps(props);
  const styleProps = buttonStyles({ look, size, center });
  const styleBold = bold ? "font-bold" : "";

  if (to && external)
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={() => {
          onLink?.();
          return window.open(to, "_blank", "noopener noreferrer");
        }}
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
          onClick={() => {
            onLink?.();
          }}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
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
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      {...props}>
      {children}
    </button>
  );
}
