import { tv } from "tailwind-variants";
import useThemedVariables from "../../hooks/theming/useThemedVariables";
import { mergeClass } from "../../utils/css";
import { sizeScale } from "../../utils/tailwind";
import type { Component, Styled, Themable } from "../../utils/types";

export const boxStyles = tv({
  base: "flex flex-col border-1",
  variants: {
    look: {
      soft: "bg-main-1 border-main-0",
      base: "bg-main-3 border-main-0 text-main-12",
      bold: "bg-main-2 border-main-6 text-main-12",
      tint: "bg-accent-4 border-main-0 text-main-12",
      hype: "bg-accent-4 border-accent-6 text-main-12",
    },
    size: {
      xs: "p-xs gap-xs",
      sm: "p-sm gap-sm",
      md: "p-md gap-md",
      lg: "p-lg gap-md",
      xl: "p-xl gap-xl",
    },
    container: {
      true: "",
      false: "",
    },
    content: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    size: "md",
    content: "md",
    look: "base",
    container: true,
  },
  compoundVariants: sizeScale.flatMap(size =>
    sizeScale.flatMap(content => [
      {
        size,
        content,
        container: true as const,
        class: `rounded-${size}+${content}` as `rounded-${typeof size}+${typeof content}`,
      },
      {
        size,
        content,
        container: false as const,
        class: `rounded-${size}` as `rounded-${typeof size}`,
      },
    ]),
  ),
});

export type BoxProps = Component<Styled<typeof boxStyles> & Themable>;

/**
 * Box Component
 *
 * A flexible container component that serves as a fundamental building block for layouts.
 * It provides various visual styles and sizing options through variants.
 *
 * @variants
 * content:
 *  - xs to xl: Content size variants
 *
 * container:
 *  - true/false: Controls container behavior
 *
 * @compoundVariants
 * The component uses compound variants to determine border radius (rounded corners):
 * - When container=true: Uses both size and content values (rounded-${size}+${content})
 * - When container=false: Uses only size value (rounded-${size})
 *
 * @example
 * <Box look="soft" size="md" content="sm" container={true}>
 *   Content goes here
 * </Box>
 */

export default function Box({
  look,
  size,
  coloring,
  accent,
  style,
  container,
  content,
  className,
  children,
  ...props
}: BoxProps) {
  const themeVars = useThemedVariables(coloring, accent);

  return (
    <div
      style={Object.assign(style ?? {}, themeVars)}
      className={mergeClass(boxStyles({ look, size, content, container: container !== false }), className)}
      {...props}>
      {children}
    </div>
  );
}
