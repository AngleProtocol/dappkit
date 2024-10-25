import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, GetSet, Styled } from "../../utils/types";
import Group from "../extenders/Group";

export const inputStyles = tv({
  base: "text-main-11 flex items-center gap-1 border-1 outline-offset-0 outline-0 text-nowrap font-main",
  variants: {
    look: {
      none: "bg-main-0 border-0",
      soft: "bg-main-2 border-main-2 hover:border-main-4 active:border-main-7 hover:text-main-12 focus-within:border-main-7",
      base: "bg-main-1 border-main-1 hover:bg-main-2 active:bg-main-2 text-main-12 focus-within:border-main-9",
      bold: "bg-main-3 border-main-4 hover:border-main-4 active:border-main-7 hover:text-main-12 focus-within:border-main-7",
      tint: "bg-main-1 border-accent-6 hover:border-accent-8 active:bg-main-2 text-main-12 focus-within:border-main-9",
      hype: "bg-main-0 border-accent-8 hover:border-accent-10 active:border-accent-8 hover:text-main-12 focus-within:border-accent-8",
    },
    size: {
      xs: "px-xs py-xs text-xs rounded-xs",
      sm: "px-sm py-sm text-sm rounded-sm",
      md: "px-md py-md text-md rounded-md",
      lg: "px-lg py-lg text-lg rounded-lg",
      xl: "px-xl py-xl text-3xl rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
    look: "base",
  },
});

export const extensions = ["header", "footer", "prefix", "suffix", "label", "hint"] as const;
export type InputExtension = (typeof extensions)[number];

export type InputProps = Component<
  Styled<typeof inputStyles> & { [Extension in InputExtension]?: ReactNode } & {
    state?: GetSet<string>;
  },
  HTMLInputElement
>;

export default function Input({ look, size, state, className, ...props }: InputProps) {
  const { header, footer, prefix, suffix, label, hint, ...rest } = props;

  if (extensions.some(extension => !!props?.[extension]))
    return (
      <label className={mergeClass(inputStyles({ look, size }), className, "flex-col flex")} htmlFor="input">
        <label htmlFor="input" className="w-full flex">
          {header}
        </label>
        <Group className="w-full flex-row flex-nowrap items-center">
          {prefix && (
            <label htmlFor="input" className="">
              {prefix}
            </label>
          )}
          <input
            id="input"
            className={mergeClass(inputStyles({ look: "none", size }), className, "w-full !flex-1 !px-0 !py-0")}
            value={state?.[0]}
            onChange={e => state?.[1]?.(e?.target?.value)}
            {...rest}
          />
          {suffix && (
            <label htmlFor="input" className="">
              {suffix}
            </label>
          )}
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
