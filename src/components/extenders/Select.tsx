import React, { useState, type PropsWithChildren, type ReactNode } from "react";
import type { GetSet, Variant } from "src/utils/types";
import { tv } from "tailwind-variants";
import * as RadixSelect from "@radix-ui/react-select";
import { buttonStyles } from "src/components/primitives/Button";
import Icon from "src/components/primitives/Icon";
import { useTheme } from "../../context/Theme.context";
import clsx from "clsx";
import Block from "src/components/primitives/Block";
import Divider from "src/components/primitives/Divider";
import { mergeClass } from "src/utils/css";

export const selectStyles = tv({
  base: [
    "text-main-11 flex items-center justify-between gap-1 border-1 outline-offset-0 outline-0 text-nowrap font-main font-medium",
  ],
  slots: {
    dropdown: "border-1 bg-main-4 mt-sm p-lg shadow-md font-main font-normal",
    item: "p-sm outline-offset-0 outline-0 text-nowrap",
    icon: "border-l-1 h-full flex items-center",
    value: "flex",
  },
  variants: {
    look: {
      soft: {
        base: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-0",
        dropdown: "bg-main-2 border-main-6",
        item: "hover:bg-main-5 data-[highlighted]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      base: {
        base: "bg-main-2 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-6",
        dropdown: "bg-main-2 border-main-6",
        item: "hover:bg-main-5 data-[highlighted]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      bold: {
        base: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
        icon: "border-main-6",
        dropdown: "bg-main-4 border-main-6",
        item: "hover:bg-main-6 data-[highlighted]:bg-main-6 active:bg-main-5 text-main-12 focus-visible:border-main-8",
      },
      tint: {
        base: "bg-primary-4 border-primary-4 hover:bg-primary-5 active:bg-primary-3 text-main-12 focus-visible:border-primary-9",
        icon: "border-primary-6",
        dropdown: "bg-primary-4 border-primary-6",
        item: "hover:bg-primary-6 data-[highlighted]:bg-primary-6 active:bg-primary-5 text-main-12 focus-visible:border-main-8",
      },
      hype: {
        base: "bg-primary-9 border-primary-9 hover:bg-primary-10 active:bg-primary-8 text-primary-12 focus-visible:border-primary-10",
        icon: "border-primary-11",
        dropdown: "bg-primary-9 border-primary-6",
        item: "hover:bg-primary-10 data-[highlighted]:bg-primary-10 active:bg-primary-4 text-main-12 focus-visible:border-primary-10",
      },
    },
    size: {
      xs: {
        base: "text-xs rounded-xs",
        value: "px-xs*2 py-xs*2",
        icon: "px-0",
        dropdown: "p-xs rounded-xs+xs",
        item: "px-sm text-xs rounded-xs",
      },
      sm: {
        base: "text-sm rounded-sm",
        value: "px-sm py-sm/2",
        icon: "px-xs/2",
        dropdown: "p-sm rounded-sm+sm",
        item: "px-md text-sm rounded-sm",
      },
      md: {
        base: "text-md rounded-md",
        value: "px-md text-md py-md/2",
        dropdown: "p-sm rounded-md+md",
        icon: "px-md/2",
        item: "px-md text-md rounded-md",
      },
      lg: {
        base: " text-lg rounded-lg",
        value: "px-lg py-lg/2",
        dropdown: "p-md rounded-md+md",
        icon: "px-md/2",
        item: "px-lg text-lg rounded-md",
      },
      xl: {
        base: " text-xl rounded-xl",
        value: "px-lg py-lg/2",
        dropdown: "p-md rounded-lg+md",
        icon: "px-lg/2",
        item: "px-xl text-xl rounded-lg",
      },
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
  compoundVariants: [
    {
      size: "xs",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-0" },
    },
    {
      size: "sm",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-0" },
    },
    {
      size: "md",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-sm/2" },
    },
    {
      size: "lg",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-md/2" },
    },
    {
      size: "xl",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-lg/2"},
    },
  ],
});

export type SelectProps<Value extends string | number | symbol = string> = PropsWithChildren<{
  size?: Variant<typeof selectStyles, "size">;
  look?: Variant<typeof selectStyles, "look">;
  value?: Value;
  state?: GetSet<Value>;
  options?: { [key: string | number | symbol]: ReactNode };
}> &
  RadixSelect.SelectProps;

const SelectItem = React.forwardRef(function Item(
  { children, ...props }: PropsWithChildren<{ className: string }>,
  forwardedRef,
) {
  return (
    <RadixSelect.Item {...props} ref={forwardedRef}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center"></RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

export default function Select<Value extends string | number | symbol = string>({
  look,
  size,
  state,
  options,
  ...props
}: SelectProps<Value>) {
  const { vars } = useTheme();
  const [getter, setter] = state ?? [];

  const { base, dropdown, item, icon, value } = selectStyles({ look, size });

  return (
    <RadixSelect.Root {...props} value={getter && `${String(getter)}`} onValueChange={setter}>
      <RadixSelect.Trigger className={base({ look, size })} aria-label="Food">
        <div className={value()}>
          <RadixSelect.Value placeholder="Select a fruit" />
        </div>
        <div className={icon()}>
          <Icon remix="RiArrowDropDownLine" />
        </div>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          style={vars}
          className={mergeClass(dropdown(), "min-w-[var(--radix-select-trigger-width)]")}
        >
          <RadixSelect.Viewport>
            <RadixSelect.Group>
              {Object.entries(options ?? {}).map(([value, label]) => {
                return (
                  <SelectItem className={item()} key={value} value={value}>
                    {label}
                  </SelectItem>
                );
              })}
            </RadixSelect.Group>
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
