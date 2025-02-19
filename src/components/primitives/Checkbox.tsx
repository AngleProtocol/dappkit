import { type CheckboxProps as RadixCheckboxProps, Root } from "@radix-ui/react-checkbox";
import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import { blockEvent } from "../../utils/event";
import type { Component, GetSet, Styled } from "../../utils/types";
import Icon from "./Icon";

export const checkboxStyles = tv({
  base: "text-main-11 aspect-square flex items-center bg-gradient-to-tr border-1 outline-offset-0 outline-0 text-nowrap font-text font-bold",
  variants: {
    look: {
      soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      base: "bg-main-0 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
      bold: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
      tint: "bg-accent-3 border-accent-3 hover:bg-accent-5 active:bg-accent-3 text-accent-11 focus-visible:border-accent-9",
      hype: "bg-accent-11 border-accent-11 text-accent-1 focus-visible:border-accent-10",
    },
    checked: {
      true: "",
      false: "bg-main-0",
    },
    size: {
      xs: "min-h-sm px-xs*2 py-x m-xs text-xs rounded-xs gap-xs",
      sm: "min-h-sm px-sm py-sm/2 m-sm text-sm rounded-sm gap-sm",
      md: " px-md py-md/2 text-md m-md rounded-md gap-md",
      lg: "min-h-sm px-lg py-lg/2 text-lg rounded-lg gap-lg",
      xl: "min-h-sm px-xl py-xl/2 text-xl rounded-xl gap-xl",
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
});

export type CheckboxProps = Component<Styled<typeof checkboxStyles> & { state?: GetSet<boolean> }, RadixCheckboxProps>;

export default function Checkbox({ look, size, state, className }: CheckboxProps) {
  const [getter, setter] = state ?? [];

  return (
    <Root
      checked={!!getter}
      onClick={blockEvent(() => setter?.(!getter))}
      onCheckedChange={v => setter?.(!v)}
      className={mergeClass(checkboxStyles({ look: look ?? "base", size: size ?? "md", checked: getter }), className)}
      defaultChecked>
      <Icon className={!getter ? "text-main-0" : ""} size={size} remix="RiCheckFill" />
    </Root>
  );
}
