import { type VariantProps, tv } from "tailwind-variants";
import useThemableProps from "../../hooks/theming/useThemableProps";
import { mergeClass } from "../../utils/css";
import type { Component, Themable } from "../../utils/types";

export const primitiveTagStyles = tv({
  base: "flex items-center select-none !leading-none rounded-full text-nowrap ease focus-visible:outline focus-visible:outline-dashed focus-visible:outline-accent-12 font-text font-bold text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
  variants: {
    look: {
      soft: "text-accent-12 bg-transparent border-1 border-accent-9",
      base: "text-accent-12 bg-accent-5 active:bg-accent-6",
      bold: "text-accent-12 bg-accent-10 active:bg-accent-11",
      tint: "text-accent-1 bg-accent-11 active:bg-accent-12",
      hype: "text-accent-1 bg-gray-11 active:bg-gray-12",
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
      noClick?: boolean;
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
  noClick,
  ...props
}: PrimitiveTagProps) {
  const themeVars = useThemableProps(props);

  const styleProps = primitiveTagStyles({ look, size });
  const styleLabel = noClick ? "active:text-accent-12 pointer-events-none" : "dim";

  return (
    <button
      style={themeVars}
      className={mergeClass(styleProps, styleLabel, className)}
      type="button"
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
}
