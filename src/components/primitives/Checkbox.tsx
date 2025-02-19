import { type CheckboxProps as RadixCheckboxProps, Root } from "@radix-ui/react-checkbox";
import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import { blockEvent } from "../../utils/event";
import type { Component, GetSet, Styled } from "../../utils/types";
import Icon from "./Icon";

export const checkboxStyles = tv({
  base: "text-accent-11 aspect-square flex items-center bg-gradient-to-tr border-1 outline-offset-0 outline-0 text-nowrap font-text font-bold",
  variants: {
    look: {
      soft: "bg-accent-0 border-accent-0 hover:bg-accent-4 active:bg-accent-3 hover:text-accent-12  focus-visible:border-accent-9",
      base: "bg-accent-0 border-accent-6 hover:bg-accent-4 active:bg-accent-3 hover:text-accent-12  focus-visible:border-accent-9",
      bold: "bg-accent-4 border-accent-4 hover:bg-accent-5 active:bg-accent-3 text-accent-12 focus-visible:border-accent-9",
      tint: "bg-gray-3 border-gray-3 hover:bg-gray-5 active:bg-gray-3 text-gray-11 focus-visible:border-gray-9",
      hype: "bg-gray-11 border-gray-11 text-gray-1 focus-visible:border-gray-10",
    },
    checked: {
      true: "",
      false: "bg-accent-0",
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
      <Icon className={!getter ? "text-accent-0" : ""} size={size} remix="RiCheckFill" />
    </Root>
  );
}
