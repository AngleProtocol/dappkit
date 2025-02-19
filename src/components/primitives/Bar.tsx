import { tv } from "tailwind-variants";
import { type Component, type Styled, type Themable, mergeClass } from "../..";
import useThemedVariables from "../../hooks/theming/useThemedVariables";

export const barStyles = tv({
  slots: {
    base: "bg-accent-1 rounded-full flex",
    bar: "",
  },
  variants: {
    look: {
      soft: "",
      base: "",
      bold: "",
      tint: "",
      hype: "",
    },
    size: {
      xs: "",
      sm: "",
      md: {
        base: "h-md p-xs gap-xs",
        bar: "h-full rounded-md",
      },
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
});

export type BarProps = Component<
  Styled<typeof barStyles> & Themable & { total: number; values: { value: number; className: string }[] }
>;

export default function Bar({ total, values, look, size, coloring, accent, className }: BarProps) {
  const themeVars = useThemedVariables(coloring, accent);
  const { base, bar } = barStyles({ look, size });

  return (
    <div style={themeVars} className={mergeClass(base(), className)}>
      {values?.map(({ value, className: _class }, index) => {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: not a problem in this instance
          <div key={index} style={{ width: `${(value / total) * 100}%` }} className={mergeClass(bar(), _class)} />
        );
      })}
    </div>
  );
}
