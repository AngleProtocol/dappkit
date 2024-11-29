import { tv, type VariantProps } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Themable } from "../../utils/types";
import useThemableProps from "../../hooks/theming/useThemableProps";

export const primitiveTagStyles = tv({
  base: "flex items-center select-none !leading-none rounded-full text-nowrap ease font-text font-bold text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
  variants: {
    look: {
      soft: "text-main-12 bg-transparent border-1 border-main-9 focus-visible:border-main-9",
      base: "text-main-12 bg-main-5 hover:bg-main-3 active:bg-main-7 focus-visible:border-main-9",
      bold: "text-main-12 bg-main-10 hover:bg-main-8 active:bg-main-3 focus-visible:border-main-9",
      tint: "text-main-1 bg-main-11 hover:bg-main-9 active:bg-accent-3 focus-visible:border-accent-9",
      hype: "text-main-1 bg-accent-11 hover:bg-accent-12 active:bg-accent-8 focus-visible:border-accent-10",
    },
    size: {
      xs: "px-md py-sm gap-sm rounded-md text-xs",
      sm: "px-md py-sm gap-sm rounded-md text-sm",
      md: "px-md py-md gap-sm rounded-md text-base",
      lg: "px-md py-md gap-sm rounded-md text-lg",
      xl: "px-md py-md gap-sm rounded-md text-xl",
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
});

type PrimitiveTagStyleProps = VariantProps<typeof primitiveTagStyles>;

export type PrimitiveTagProps = Component<
  PrimitiveTagStyleProps &
    Themable & {
      external?: boolean;
      className?: string;
      type?: "button" | "submit" | "reset";
      disabled?: boolean;
    },
  HTMLButtonElement
>;

export default function PrimitiveTag({
  look,
  size,
  theme,
  className,
  children,
  external,
  disabled,
  ...props
}: PrimitiveTagProps) {
  const themeVars = useThemableProps(props);

  const styleProps = primitiveTagStyles({ look, size });

  return (
    <button
      style={themeVars}
      className={mergeClass(styleProps, className)}
      type="button"
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
