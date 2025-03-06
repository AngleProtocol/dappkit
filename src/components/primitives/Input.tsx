import { format } from "numerable";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { formatUnits, parseUnits } from "viem";
import { mergeClass } from "../../utils/css";
import type { Component, GetSet, Styled } from "../../utils/types";
import Dropdown from "../extenders/Dropdown";
import Group from "../extenders/Group";
import Select from "../extenders/Select";
import { Calendar } from "./Calendar";
import Text from "./Text";

export const inputStyles = tv({
  base: "flex ease items-center text-nowrap font-text text-ellipsis",
  variants: {
    look: {
      none: "text-main-12 bg-main-0 border-0",
      soft: "placeholder:text-main-11 text-main-12 bg-main-0 border-main-0 border-1 active:border-main-7 hover:text-main-11 focus-within:border-main-8",
      base: "placeholder:text-main-11 text-main-11 bg-main-0 border-main-11 border-1 active:border-main-7 hover:text-main-11 focus-within:border-main-8",
      bold: "placeholder:text-main-11 text-main-12 bg-main-2 border-main-0 border-1 active:border-main-7 hover:text-main-11 focus-within:border-main-8",
      tint: "placeholder:text-main-11 text-main-12 bg-main-5 border-main-0 border-1 active:border-main-7 hover:text-main-11 focus-within:border-main-8",
      hype: "placeholder:text-main-2 text-main-1 bg-main-12 border-main-0 border-1 active:border-accent-9 hover:text-main-2 focus-within:border-main-8",
    },
    size: {
      xs: "px-xs py-xs text-xs rounded-xs",
      sm: "px-sm py-sm text-sm rounded-sm",
      md: "px-md py-sm text-md rounded-md",
      lg: "px-lg py-md text-lg rounded-lg",
      xl: "px-xl py-lg text-3xl rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
    look: "base",
  },
});

const HOURS = {
  "1": "01:00",
  "2": "02:00",
  "3": "03:00",
  "4": "04:00",
  "5": "05:00",
  "6": "06:00",
  "7": "07:00",
  "8": "08:00",
  "9": "09:00",
  "10": "10:00",
  "11": "11:00",
  "12": "12:00",
};

export const extensions = ["header", "footer", "prefix", "suffix", "label", "hint"] as const;
export type InputExtension = (typeof extensions)[number];

export type InputProps<T = string> = Component<
  Styled<typeof inputStyles> & { [Extension in InputExtension]?: ReactNode } & {
    state?: GetSet<T | undefined>;
    inputClassName?: string;
    error?: ReactNode;
  },
  HTMLInputElement
>;

function Input({ look, size, state, inputClassName, className, ...props }: InputProps) {
  const { header, footer, prefix, suffix, label, hint, error, ...rest } = props;

  if (extensions.some(extension => !!props?.[extension]))
    return (
      <>
        <label className={mergeClass(inputStyles({ look, size }), className, "flex-col flex")} htmlFor="input">
          {header && (
            <label htmlFor="input" className="w-full flex">
              {header}
            </label>
          )}
          <Group className="w-full flex-row flex-nowrap items-center">
            {prefix && <label htmlFor="input">{prefix}</label>}
            <input
              id="input"
              autoComplete="off"
              className={mergeClass(
                inputStyles({ look: "none", size }),
                className,
                inputClassName,
                "w-full !flex-1 !px-0 !py-0",
              )}
              value={state?.[0]}
              onChange={e => state?.[1]?.(e?.target?.value)}
              {...rest}
            />
            {suffix && <label htmlFor="input">{suffix}</label>}
          </Group>
          {footer && (
            <label htmlFor="input" className="w-full flex">
              {footer}
            </label>
          )}
        </label>
        {error}
      </>
    );
  return (
    <>
      <input
        autoComplete="off"
        className={mergeClass(inputStyles({ look, size }), className)}
        value={state?.[0]}
        onChange={e => state?.[1]?.(e?.target?.value)}
        {...rest}
      />
      {error}
    </>
  );
}

Input.BigInt = function InputBigInt({ state, base, ...props }: InputProps<bigint> & { base: number }) {
  const [internal, setInternal] = useState<bigint>();
  const [displayed, setDisplayed] = useState<string>();
  const [_getter, setter] = state ?? [];

  const _value = useMemo(() => {
    const _chosenValue = !state ? internal : _getter;
    const transformed = formatUnits(_chosenValue ?? 0n, base);

    const isInputtingDecimals =
      displayed?.split(".")?.[1]?.[displayed?.split?.(".")?.[1]?.length - 1] === "0" ||
      displayed?.[displayed.length - 1] === ".";

    // biome-ignore lint/suspicious/noExplicitAny: Making sure it's not an empty string for numbers input
    if (_chosenValue === undefined || (_chosenValue as any as string) === "") return "";
    if (displayed === "0" || isInputtingDecimals) return displayed;
    return transformed ?? displayed;
  }, [internal, state, displayed, base, _getter]);

  const setValue = useCallback(
    (v: string | undefined) => {
      try {
        if (v === undefined || v === "") {
          setter?.(undefined) ?? setInternal(undefined);
          setDisplayed(undefined);
          return;
        }

        const raw = v?.replaceAll(",", "") ?? "";
        const isInputtingDecimals =
          v?.split(".")?.[1]?.[v?.split?.(".")?.[1]?.length - 1] === "0" || v?.[v.length - 1] === ".";
        const transformed = parseUnits(raw, base);

        if (v === "") setDisplayed(undefined);
        if (raw === "0") setDisplayed(undefined);
        else if (v?.split(".")?.length === 1 || v?.split?.(".")?.[1]?.length <= base)
          setDisplayed(isInputtingDecimals ? v : format(raw, "0,0.X"));
        setter?.(transformed) ?? setInternal(transformed);
      } catch (_err) {}
    },
    [setter, base],
  );

  //TODO: implement setter callback
  return <Input state={[_value, v => typeof v !== "function" && setValue(v)]} {...props} />;
};

Input.Date = (props: InputProps<string>) => <Input type="date" {...props} />;

Input.DateTime = function InputDateTime({
  state,
  defaultMonth,
  placeholder,
  ...props
}: InputProps<Date> & { defaultMonth?: Date }) {
  const [open, setOpen] = useState<boolean>(false);
  const [amPm, setAmPm] = useState<"am" | "pm">("am");
  const [date, setDate] = state ?? [undefined, () => {}];

  const onDateChange = useCallback(
    (_date: Date | undefined) => {
      if (!_date) return;
      const newDate = new Date(_date.getTime());
      newDate.setHours(Number.parseInt(date?.getHours()?.toString() ?? "0"));
      setDate(newDate);
    },
    [date, setDate],
  );

  const onHoursChange = useCallback(
    (e: string) => {
      if (!date) return;
      const newDate = new Date(date.getTime());
      let hours = Number.parseInt(e, 10);
      if (amPm === "pm" && hours < 12) {
        hours += 12;
      } else if (amPm === "am" && hours === 12) {
        hours = 0; // Midnight case
      }
      newDate.setHours(hours, 0);
      setDate(newDate);
    },
    [date, amPm, setDate],
  );

  const renderHourOptions = useMemo(() => {
    return Object.entries(HOURS).map(([key, label]) => {
      let selectedHour = date?.getHours();
      let customKey = +key;

      // Only displaying purpose handle 12am/pm
      if (selectedHour === 12) selectedHour = 24;
      if (selectedHour === 0) selectedHour = 12;

      if (amPm === "pm") customKey = customKey + 12;
      const isActive = selectedHour === customKey;

      return (
        <Text
          key={customKey}
          className={mergeClass(
            "ease p-sm text-center cursor-pointer rounded-md hover:bg-main-6 border-1 border-main-6",
            isActive && "text-main-6 !bg-main-12",
          )}
          onClick={() => onHoursChange(key)}>
          {label}
        </Text>
      );
    });
  }, [date, amPm, onHoursChange]);

  const setAmPmWrapper = useCallback((value: "am" | "pm") => setAmPm(value), []);

  const formattedDate = useMemo(() => {
    if (!date) return;
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  }, [date]);

  return (
    <Dropdown
      className="w-full"
      padding="xs"
      content={
        <Group>
          <Calendar
            captionLayout="dropdown"
            state={{ state: date, setter: onDateChange }}
            defaultMonth={defaultMonth}
          />
          <Group className="relative overflow-hidden h-[17rem]">
            <Group className="flex-col flex-nowrap h-full overflow-x-hidden overflow-y-scroll">
              <Select state={[amPm, setAmPmWrapper]} options={{ am: "AM", pm: "PM" }} />
              <Group className="flex-col overflow-x-hidden overflow-y-scroll h-full" size="sm">
                {renderHourOptions}
              </Group>
            </Group>
          </Group>
        </Group>
      }
      state={[open, setOpen]}>
      <Input placeholder={placeholder ?? "Please select a date"} value={formattedDate} className="w-full" {...props} />
    </Dropdown>
  );
};

export default Input;
