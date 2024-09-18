import clsx from "clsx";
import { mergeClass } from "src/utils/css";
import { sizeScale } from "src/utils/tailwind";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import type { Component, Styled, Themable } from "../../utils/types";
import useThemedVariables from "src/hooks/theming/useThemedVariables";

export const boxStyles = tv({
  base: "flex flex-col border-1 gap-1",
  variants: {
    look: {
      soft: "bg-main-1 border-main-0",
      base: "bg-main-2 border-main-0 text-main-12",
      bold: "bg-main-2 border-main-6 text-main-12",
      tint: "bg-accent-4 border-main-0 text-main-12",
      hype: "bg-accent-4 border-accent-6 text-main-12",
    },
    size: {
      xs: "p-xs gap-xs",
      sm: "p-sm gap-sm",
      md: "p-md gap-md",
      lg: "p-lg gap-lg",
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
  compoundVariants: sizeScale.flatMap((size) =>
    sizeScale.flatMap((content) => [
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

export default function Box({
  look,
  size,
  coloring,
  accent,
  style,
  container,
  content,
  className,
  ...props
}: BoxProps) {
  const themeVars = useThemedVariables(coloring, accent);

  return (
    <div
      style={Object.assign(style ?? {}, themeVars)}
      className={mergeClass(
        boxStyles({ look, size, content, container: container !== "false" }),
        className,
      )}
      {...props}
    />
  );
}
