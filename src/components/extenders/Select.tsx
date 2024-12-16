import * as Ariakit from "@ariakit/react";
import type * as RadixSelect from "@radix-ui/react-select";
import { matchSorter } from "match-sorter";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { mergeClass } from "../..";
import type { Component, GetSet, Variant } from "../../utils/types";
import Box from "../primitives/Box";
import Icon from "../primitives/Icon";
import { inputStyles } from "../primitives/Input";
import Scroll from "../primitives/Scroll";
import Text from "../primitives/Text";
import Group from "./Group";

export const selectStyles = tv({
  base: [
    "text-main-11 rounded-sm flex items-center dim focus-visible:outline-main-12 !leading-none justify-between text-nowrap font-text font-semibold",
  ],
  slots: {
    dropdown: "outline-0 z-50 origin-top animate-drop animate-stretch mt-sm min-w-[var(--popover-anchor-width)]",
    item: "rounded-sm flex justify-between items-center gap-lg cursor-pointer select-none p-sm outline-offset-0 outline-0 text-nowrap focus-visible:outline-main-12",
    icon: "flex items-center",
    value: "flex gap-sm items-center",
    check: "",
    prefixLabel: "",
  },
  variants: {
    look: {
      soft: {
        base: "bg-main-0 active:text-main-12 text-main-11",
        icon: "border-main-0",
        item: "hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12",
      },
      base: {
        base: "bg-main-0 border-main-9 border-1 active:text-main-12 text-main-11",
        icon: "border-main-0",
        item: "hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12",
      },
      bold: {
        base: "bg-main-1 active:text-main-12 text-main-11",
        icon: "",
        item: "hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12",
        check: "text-accent-10",
      },
      tint: {
        base: "bg-main-5 active:text-main-12 text-main-11",
        icon: "",
        item: "hover:bg-main-3 data-[active-item]:bg-main-6 active:bg-main-5 text-main-12",
      },
      hype: {
        base: "bg-accent-5 active:text-main-12 text-accent-11",
        icon: "",
        item: "hover:bg-accent-10 data-[active-item]:bg-accent-10 active:bg-accent-4 text-main-12",
      },
    },
    size: {
      xs: {
        base: "gap-xs text-xs",
        value: "px-sm*2 py-xs*2",
        icon: "text-sm",
        item: "px-md text-xs",
        prefixLabel: "text-xs",
      },
      sm: {
        base: "gap-sm text-sm",
        value: "px-md py-sm",
        icon: "text-base",
        item: "px-md text-sm",
        prefixLabel: "text-sm",
      },
      md: {
        base: "gap-md text-md",
        value: "px-md text-md py-md",
        icon: "text-lg",
        item: "px-md text-md",
        prefixLabel: "text-sm",
      },
      lg: {
        base: "gap-lg text-lg",
        value: "px-xl/2 py-lg",
        icon: "text-xl",
        item: "px-lg text-lg",
        prefixLabel: "text-base",
      },
      xl: {
        base: "gap-xl text-xl",
        value: "px-sm*2 py-lg",
        icon: "text-xl",
        item: "px-xl text-xl",
        prefixLabel: "text-lg",
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
  ..._props
}: SelectProps<Value> & { multiple?: Multiple }) {
  const [internal, setInternal] = useState<Value>();
  const [getter, setter] = state ?? [];

  const {
    base,
    dropdown,
    item,
    icon,
    prefixLabel,
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
          <Text
            className={mergeClass(
              prefixLabel(),
              "w-[1.2em] h-[1.2em] flex items-center justify-center rounded-full bg-main-6 text-main-12",
            )}>
            {value.length}
          </Text>{" "}
          {placeholder}
        </>
      );
    return placeholder;
  }, [options, value, placeholder, prefixLabel]);

  return (
    <Ariakit.ComboboxProvider
      // resetValueOnHide
      setValue={value => {
        setSearch(value);
      }}
    >
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
                    onClick={() =>
                      // biome-ignore lint/suspicious/noExplicitAny: template makes this typing difficult even tough it works
                      setValue((!!multiple ? [] : undefined) as any as Value)
                    }
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
                              !((typeof value === "object" && value?.length === 0) || value === undefined) &&
                                "opacity-0",
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
                    key={_value as string}
                    value={_value as string}
                    className={mergeClass(item())}
                    render={
                      <Ariakit.ComboboxItem
                        children={[
                          <Group className="flex-nowrap" key="label">
                            {options?.[_value as string]}
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
