import { Root, Indicator, CheckboxProps as RadixCheckboxProps } from "@radix-ui/react-checkbox";
import { mergeClass } from "src/utils/css";
import { Component, GetSet, Styled } from "src/utils/types";
import { tv } from "tailwind-variants";

export const checkboxStyles = tv({
  base: "text-main-11 flex items-center bg-gradient-to-tr border-1 outline-offset-0 outline-0 text-nowrap font-main font-bold",
  variants: {
    look: {
      soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      base: "bg-main-0 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      bold: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
      tint: "bg-accent-3 border-accent-3 hover:bg-accent-5 active:bg-accent-3 text-accent-11 focus-visible:border-accent-9",
      hype: "bg-accent-9 border-accent-9 hover:bg-accent-10 active:bg-accent-8 text-main-12 focus-visible:border-accent-10",
    },
    size: {
      xs: "min-h-sm px-xs*2 py-xs text-xs rounded-xs gap-xs",
      sm: "min-h-sm px-sm py-sm/2 text-sm rounded-sm gap-sm",
      md: " px-md py-md/2 text-md rounded-md gap-md",
      lg: "min-h-sm px-lg py-lg/2 text-lg rounded-lg gap-lg",
      xl: "min-h-sm px-xl py-xl/2 text-xl rounded-xl gap-xl",
    },
  },
});

export type CheckboxProps = Component<
  Styled<typeof checkboxStyles> & { state?: GetSet<boolean> },
  RadixCheckboxProps
>;

export default function Checkbox({ look, size, state, className }: CheckboxProps) {
  const [getter, setter] = state ?? [];

  return (
    <Root
      checked={!!getter}
      onCheckedChange={(v) => setter?.(v === "indeterminate" ? false : v)}
      className={mergeClass(checkboxStyles({ look: look ?? "base", size: size ?? "md" }), className)}
      defaultChecked
      id="c1"
    >
      x<Indicator className="text-violet11">x</Indicator>
    </Root>
  );
}
