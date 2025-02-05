import { format } from "numerable";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { formatUnits, parseUnits } from "viem";
import { mergeClass } from "../../utils/css";
import type { Component, GetSet, Styled } from "../../utils/types";
import Group from "../extenders/Group";

export const inputStyles = tv({
  base: "flex items-center text-nowrap font-text text-ellipsis",
  variants: {
    look: {
      none: "text-main-12 bg-main-0 border-0",
      soft: "placeholder:text-main-11 text-main-12 bg-main-0 border-main-0 border-1 active:border-main-7 hover:text-main-11 focus-within:border-main-12",
      base: "placeholder:text-main-11 text-main-12 bg-main-0 border-main-8 border-1 active:border-main-7 hover:text-main-11 focus-within:border-main-12",
      bold: "placeholder:text-main-11 text-main-12 bg-main-2 border-main-0 border-1 active:border-main-7 hover:text-main-11 focus-within:border-main-8",
      tint: "placeholder:text-main-11 text-main-12 bg-main-5 border-main-0 border-1 active:border-main-7 hover:text-main-11 focus-within:border-main-12",
      hype: "placeholder:text-main-2 text-main-1 bg-main-12 border-main-0 border-1 active:border-accent-9 hover:text-main-2 focus-within:border-main-12",
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

export const extensions = ["header", "footer", "prefix", "suffix", "label", "hint"] as const;
export type InputExtension = (typeof extensions)[number];

export type InputProps<T = string> = Component<
  Styled<typeof inputStyles> & { [Extension in InputExtension]?: ReactNode } & {
    state?: GetSet<T | undefined>;
    inputClassName?: string;
  },
  HTMLInputElement
>;

function Input({ look, size, state, inputClassName, className, ...props }: InputProps) {
  const { header, footer, prefix, suffix, label, hint, ...rest } = props;

  if (extensions.some(extension => !!props?.[extension]))
    return (
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
    );
  return (
    <input
      autoComplete="off"
      className={mergeClass(inputStyles({ look, size }), className)}
      value={state?.[0]}
      onChange={e => state?.[1]?.(e?.target?.value)}
      {...rest}
    />
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

export default Input;
