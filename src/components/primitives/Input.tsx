import { format } from "numerable";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { formatUnits, parseUnits } from "viem";
import { mergeClass } from "../../utils/css";
import type { Component, GetSet, Styled } from "../../utils/types";
import Group from "../extenders/Group";

export const inputStyles = tv({
  base: "flex items-center placeholder:text-main-11 text-nowrap font-text",
  variants: {
    look: {
      none: "text-main-12 bg-main-0 border-0",
      soft: "text-main-11 bg-main-0 border-main-9 border-1 active:border-main-7 focus-within:outline focus-within:outline-main-12",
      base: "text-main-12 bg-main-6 focus-within:outline focus-within:outline-main-12",
      bold: "text-main-12 bg-main-3 border-main-4 hover:border-main-4 active:border-main-7 hover:text-main-12 focus-within:outline focus-within:outline-main-12",
      tint: "text-main-12 bg-main-1 border-accent-6 hover:border-accent-8 active:bg-main-2 focus-within:outline focus-within:outline-main-12",
      hype: "text-main-12 bg-main-0 border-accent-8 hover:border-accent-10 active:border-accent-8 hover:text-main-12 focus-within:outline focus-within:outline-main-12",
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
  },
  HTMLInputElement
>;

function Input({ look, size, state, className, ...props }: InputProps) {
  const { header, footer, prefix, suffix, label, hint, ...rest } = props;

  if (extensions.some(extension => !!props?.[extension]))
    return (
      <label className={mergeClass(inputStyles({ look, size }), className, "flex-col flex")} htmlFor="input">
        <label htmlFor="input" className="w-full flex">
          {header}
        </label>
        <Group className="w-full flex-row flex-nowrap items-center">
          {prefix && <label htmlFor="input">{prefix}</label>}
          <input
            id="input"
            className={mergeClass(inputStyles({ look: "none", size }), className, "w-full !flex-1 !px-0 !py-0")}
            value={state?.[0]}
            onChange={e => state?.[1]?.(e?.target?.value)}
            {...rest}
          />
          {suffix && <label htmlFor="input">{suffix}</label>}
        </Group>
        <label htmlFor="input" className="w-full flex">
          {footer}
        </label>
      </label>
    );
  return (
    <input
      className={mergeClass(inputStyles({ look, size }), className)}
      value={state?.[0]}
      onChange={e => state?.[1]?.(e?.target?.value)}
      {...rest}
    />
  );
}

Input.BigInt = function InputBigInt({ state, base, ...props }: InputProps<bigint> & { base: number }) {
  const [internal, setInternal] = useState<bigint>();
  const [displayed, setDisplayed] = useState("0.0");
  const [_getter, setter] = state ?? [];

  const _value = useMemo(() => {
    const _value = !state ? internal : state?.[0];
    const transformed = formatUnits(_value ?? 0n, base);

    return transformed ?? displayed;
  }, [internal, state, displayed, base]);

  const setValue = useCallback(
    (v: string | undefined) => {
      try {
        if (v === undefined) {
          setter?.(0n) ?? setInternal(0n);
          return;
        }

        const raw = v?.replaceAll(",", "") ?? "";
        const isInputtingDecimals =
          v?.split(".")?.[1]?.[v?.split?.(".")?.[1]?.length - 1] === "0" || v?.[v.length - 1] === ".";
        const transformed = parseUnits(raw, base);

        if (raw === "0") setDisplayed("");
        if (v?.split(".")?.length === 1 || v?.split?.(".")?.[1]?.length <= base)
          setDisplayed(isInputtingDecimals ? v : format(raw, "0,0.X"));
        setter?.(transformed) ?? setInternal(transformed);
      } catch (_err) {}
    },
    [setter, base],
  );

  //TODO: implement setter callback
  return <Input state={[_value, v => typeof v !== "function" && setValue(v)]} {...props} />;
};

export default Input;
