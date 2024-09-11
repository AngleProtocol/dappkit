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
    "text-main-11 flex items-center justify-between gap-1 border-1 outline-offset-0 outline-0 text-nowrap",
  ],
  slots: {
    dropdown: "border-1 bg-main-4 mt-2 p-4 shadow-md",
    item: "p-2 outline-offset-0 outline-0 text-nowrap",
    icon: "border-l-1 h-full flex items-center",
    value: "flex",
  },
  variants: {
    look: {
      base: {
        base: "bg-main-4 border-main-7 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
        dropdown: "bg-main-4 border-main-7",
        item: "hover:bg-main-6 data-[highlighted]:bg-main-6 active:bg-main-5 text-main-12",
        icon: "border-main-7",
      },
      soft: {
        base: "bg-main-0 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-6",
        dropdown: "bg-main-2 border-main-6",
        item: "hover:bg-main-5 data-[highlighted]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      bold: {
        base: "bg-primary-4 border-primary-6 hover:bg-primary-5 active:bg-primary-3 text-main-12 focus-visible:border-primary-9",
        icon: "border-primary-6",
        dropdown: "bg-primary-4 border-primary-6",
        item: "hover:bg-primary-6 data-[highlighted]:bg-primary-6 active:bg-primary-5 text-main-12 focus-visible:border-main-8",
      },
      hype: {
        base: "bg-primary-9 border-primary-6 hover:bg-primary-10 active:bg-primary-8 text-primary-12 focus-visible:border-primary-10",
        icon: "border-primary-11",
        dropdown: "bg-primary-9 border-primary-6",
        item: "hover:bg-primary-10 data-[highlighted]:bg-primary-10 active:bg-primary-4 text-main-12 focus-visible:border-primary-10",
      },
    },
    size: {
      xs: {
        base: "text-xs rounded-xs",
        value: "px-2 py-1",
        icon: "px-0",
        dropdown: "p-2 rounded-sm",
        item: "px-2 text-xs rounded-xs",
      },
      sm: {
        base: " text-sm rounded-sm",
        icon: "px-1",
        dropdown: "p-2 rounded-md",
        value: "px-3 py-2",
        item: "px-3 text-sm rounded-sm",
      },
      md: {
        base: "text-md rounded-md",
        value: "px-4 py-3",
        dropdown: "p-3 rounded-lg",
        icon: "px-3",
        item: "px-4 text-md rounded-md",
      },
      lg: {
        base: " text-lg rounded-lg",
        value: "px-5 py-4",
        dropdown: "p-4 rounded-xl",
        icon: "px-4",
        item: "px-5 text-lg rounded-lg",
      },
      xl: {
        base: " text-xl rounded-xl",
        value: "px-6 py-5",
        dropdown: "p-5 rounded-xxl",
        icon: "px-5",
        item: "px-6 text-xl rounded-xl",
      },
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
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
