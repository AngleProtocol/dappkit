import * as Ariakit from "@ariakit/react";
import type * as RadixSelect from "@radix-ui/react-select";
import { mergeClass } from "dappkit/src";
import { matchSorter } from "match-sorter";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { useTheme } from "../../context/Theme.context";
import type { Component, GetSet, Variant } from "../../utils/types";
import Box from "../primitives/Box";
import Icon from "../primitives/Icon";
import { inputStyles } from "../primitives/Input";
import Scroll from "../primitives/Scroll";
import Text from "../primitives/Text";
import Group from "./Group";

export const selectStyles = tv({
  base: [
    "text-main-11 flex items-center justify-between gap-1 border-1 outline-offset-0 outline-0 text-nowrap font-text font-semibold",
  ],
  slots: {
    dropdown: "outline-0 z-50 origin-top animate-drop animate-stretch mt-sm min-w-[var(--popover-anchor-width)]",
    item: "flex justify-between items-center gap-lg cursor-pointer select-none p-sm outline-offset-0 outline-0 text-nowrap",
    icon: "border-l-1 h-full flex items-center",
    value: "flex gap-sm items-center",
    check: "",
  },
  variants: {
    look: {
      soft: {
        base: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-0",
        item: "hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      base: {
        base: "bg-main-2 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-6",
        item: "hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
        check: "text-accent-10",
      },
      bold: {
        base: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
        icon: "border-main-6",
        item: "hover:bg-main-6 data-[active-item]:bg-main-6 active:bg-main-5 text-main-12 focus-visible:border-main-8",
      },
      tint: {
        base: "bg-accent-4 border-accent-4 hover:bg-accent-5 active:bg-accent-3 text-main-12 focus-visible:border-accent-9",
        icon: "border-accent-6",
        item: "hover:bg-accent-6 data-[active-item]:bg-accent-6 active:bg-accent-5 text-main-12 focus-visible:border-main-8",
      },
      hype: {
        base: "bg-accent-9 border-accent-9 hover:bg-accent-10 active:bg-accent-8 text-accent-12 focus-visible:border-accent-10",
        icon: "border-accent-11",
        item: "hover:bg-accent-10 data-[active-item]:bg-accent-10 active:bg-accent-4 text-main-12 focus-visible:border-accent-10",
      },
    },
    size: {
      xs: {
        base: "text-xs rounded-xs",
        value: "px-xs*2 py-xs*2",
        icon: "px-0",
        item: "px-sm text-xs rounded-xs",
      },
      sm: {
        base: "text-sm rounded-sm",
        value: "px-sm py-sm/2",
        icon: "px-xs/2",
        item: "px-md text-sm rounded-sm",
      },
      md: {
        base: "text-md rounded-md",
        value: "px-md text-md py-md/2",
        icon: "px-md/2",
        item: "px-md text-md rounded-md",
      },
      lg: {
        base: " text-lg rounded-lg",
        value: "px-lg py-lg/2",
        icon: "px-md/2",
        item: "px-lg text-lg rounded-lg",
      },
      xl: {
        base: "text-xl rounded-xl",
        value: "px-lg py-lg/2",
        icon: "px-lg/2",
        item: "px-xl text-xl rounded-xl",
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
      class: { icon: "!pl-0", value: "!pr-lg/2" },
    },
  ],
});

export type SelectProps<Value> = Component<{
  size?: Variant<typeof selectStyles, "size">;
  look?: Variant<typeof selectStyles, "look">;
  value?: Value;
  placeholder?: string;
  state?: GetSet<Value>;
  search?: boolean;
  loading?: boolean;
  allOption?: ReactNode;
  options?: { [key: string | number | symbol]: ReactNode };
}> &
  RadixSelect.SelectProps;

type MaybeArray<T, IsArray extends undefined | boolean> = IsArray extends true ? T[] : T;

export default function Select<
  T extends string | number,
  Multiple extends undefined | boolean,
  Value extends MaybeArray<T, Multiple>,
>({
  look,
  size,
  state,
  options,
  search,
  multiple,
  loading,
  allOption,
  placeholder,
  className,
  defaultValue,
  ...props
}: SelectProps<Value> & { multiple?: Multiple }) {
  const { vars } = useTheme();
  const [internal, setInternal] = useState<Value>();
  const [getter, setter] = state ?? [];

  const {
    base,
    dropdown,
    item,
    icon,
    value: valueStyle,
    check,
  } = selectStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  const value = useMemo(() => getter ?? internal, [getter, internal]);
  const setValue = useCallback((v: Value) => setter?.(v) ?? setInternal(v), [setter]);

  const [searchInput, setSearch] = useState<string>();

  const matches = useMemo(() => {
    if (!search) return Object.keys(options ?? {});
    // const textToMatch = Object.keys(options ?? {}).map(option => `${option}_${options[option]?.props?.children?.filter(a => typeof a !== "object").join(" ")}`)
    const textToMatch = Object.keys(options ?? {}).reduce(
      (matches, option) => {
        const opt = options?.[option];
        const key =
          typeof opt === "string"
            ? opt
            : (
                options?.[option] as Exclude<ReactNode, string | number | boolean | Iterable<ReactNode>>
              )?.props?.children
                ?.filter?.((a: unknown) => typeof a !== "object")
                ?.join(" ");

        return Object.assign(matches, { [`${option}`]: option }, { [`${key}`]: option });
      },
      {} as { [key: string]: keyof typeof options },
    );
    const searchMatches = matchSorter(Object.keys(textToMatch), searchInput ?? "").map(key => textToMatch[key]);
    const uniqueOptionMatches = Array.from(
      searchMatches.reduce((set, option) => {
        set.add(option);
        return set;
      }, new Set()),
    ) as (typeof value)[];

    return uniqueOptionMatches;
  }, [options, searchInput, search]);

  const label = useMemo(() => {
    if (
      value &&
      (typeof value === "number" || typeof value === "string" || typeof value === "symbol") &&
      options?.[value]
    )
      return options?.[value];
    if (typeof value === "object" && value?.length > 0)
      return (
        <>
          <Text size="xs" className="rounded-full w-md*2 h-md*2 bg-accent-12 text-main-2">
            {value.length}
          </Text>{" "}
          {placeholder}
        </>
      );
    return placeholder;
  }, [options, value, placeholder]);

  return (
    <Ariakit.ComboboxProvider
      resetValueOnHide
      setValue={value => {
        setSearch(value);
      }}>
      <Ariakit.SelectProvider
        setValue={v => setValue(v as Value)}
        value={value as string}
        defaultValue={multiple ? [] : undefined}>
        <Ariakit.Select className={mergeClass(base(), className)}>
          <div className={valueStyle()}>{label}</div>
          <div className={icon()}>
            {loading ? <Icon className="animate-spin" remix="RiLoader4Fill" /> : <Icon remix="RiArrowDropDownLine" />}
          </div>
        </Ariakit.Select>
        <Ariakit.SelectPopover gutter={4} className={dropdown()}>
          <Box look="bold" size="sm" content="sm">
            {search && (
              <div className="combobox-wrapper">
                <Ariakit.Combobox
                  autoSelect
                  placeholder="Search..."
                  className={mergeClass(inputStyles({ size: "sm", look: "base" }), "w-full", !search && "hidden")}
                />
              </div>
            )}
            <Scroll vertical className="max-h-[200px] w-full">
              <Ariakit.ComboboxList>
                {allOption && !searchInput && (
                  <Ariakit.SelectItem
                    className={mergeClass(item())}
                    onClick={() => setValue(!!multiple ? [] : undefined)}
                    render={
                      <Ariakit.ComboboxItem
                        children={[
                          <Group className="flex-nowrap" key="label">
                            {allOption}
                          </Group>,
                          <Icon
                            key="select"
                            className={mergeClass(
                              check(),
                              !((typeof value === "object" && value?.length > 0) || value === undefined) && "opacity-0",
                            )}
                            size="sm"
                            remix="RiCheckFill"
                          />,
                        ]}
                      />
                    }
                  />
                )}
                {matches?.map(_value => (
                  <Ariakit.SelectItem
                    key={_value}
                    value={_value}
                    className={mergeClass(item())}
                    render={
                      <Ariakit.ComboboxItem
                        children={[
                          <Group className="flex-nowrap" key="label">
                            {options?.[_value]}
                          </Group>,
                          <Icon
                            key="select"
                            className={mergeClass(
                              check(),
                              !((typeof value === "object" && value?.includes(_value as T)) || value === _value) &&
                                "opacity-0",
                            )}
                            size="sm"
                            remix="RiCheckFill"
                          />,
                        ]}
                      />
                    }
                  />
                ))}
              </Ariakit.ComboboxList>
            </Scroll>
          </Box>
        </Ariakit.SelectPopover>
      </Ariakit.SelectProvider>
    </Ariakit.ComboboxProvider>
  );
}
