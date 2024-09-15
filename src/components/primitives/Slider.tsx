import {
  type SliderProps as RadixSliderProps,
  Range,
  Root,
  Thumb,
  Track,
} from "@radix-ui/react-slider";
import { useState } from "react";
import { mergeClass } from "src/utils/css";
import type { Component, GetSet, Styled } from "src/utils/types";
import { tv } from "tailwind-variants";

export const sliderStyles = tv({
  base: [
    "relative text-main-11 flex items-center justify-between gap-1 border-1 outline-offset-0 outline-0 text-nowrap font-main font-medium",
  ],
  slots: {
    thumb: "aspect-square text-xs border-1 bg-main-4 mt-sm shadow-md font-main font-normal",
    track: "p-sm outline-offset-0 outline-0 text-nowrap",
    range: "border-l-1 h-full flex items-center",
  },
  variants: {
    look: {
      base: {
        base: "bg-main-2 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        thumb: "bg-main-2 border-main-6",
        track:
          "hover:bg-main-5 data-[highlighted]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      soft: {
        base: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        thumb: "bg-main-2 border-main-6",
        track:
          "hover:bg-main-5 data-[highlighted]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      bold: {
        base: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
        thumb: "bg-main-4 border-main-6",
        track:
          "hover:bg-main-6 data-[highlighted]:bg-main-6 active:bg-main-5 text-main-12 focus-visible:border-main-8",
      },
      tint: {
        base: "bg-primary-4 border-primary-4 hover:bg-primary-5 active:bg-primary-3 text-main-12 focus-visible:border-primary-9",
        thumb: "bg-primary-4 border-primary-6",
        track:
          "hover:bg-primary-6 data-[highlighted]:bg-primary-6 active:bg-primary-5 text-main-12 focus-visible:border-main-8",
      },
      hype: {
        base: "bg-primary-9 border-primary-9 hover:bg-primary-10 active:bg-primary-8 text-primary-12 focus-visible:border-primary-10",
        thumb: "bg-primary-9 border-primary-6",
        track:
          "hover:bg-primary-10 data-[highlighted]:bg-primary-10 active:bg-primary-4 text-main-12 focus-visible:border-primary-10",
      },
    },
    size: {
      xs: {
        base: "text-xs rounded-xs",
        value: "px-xs*2 py-xs*2",
        thumb: "p-xs rounded-xs+xs",
        track: "px-sm text-xs rounded-xs",
      },
      sm: {
        base: "text-sm rounded-sm",
        value: "px-sm py-sm/2",
        thumb: "p-sm rounded-sm+sm",
        track: "px-md text-sm rounded-sm",
      },
      md: {
        base: "text-md rounded-md",
        value: "px-md text-md py-md/2",
        thumb: "px-sm py-sm/2 rounded-md+md",
        track: "px-md text-md rounded-md",
      },
      lg: {
        base: " text-lg rounded-lg",
        value: "px-lg py-lg/2",
        thumb: "p-md rounded-md+md",
        track: "px-lg text-lg rounded-md",
      },
      xl: {
        base: " text-xl rounded-xl",
        value: "px-lg py-lg/2",
        thumb: "p-md rounded-lg+md",
        track: "px-xl text-xl rounded-lg",
      },
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
});

export type SliderProps = Component<
  Styled<typeof sliderStyles> & {
    state: GetSet<number>;
    format?: (n: number) => string;
  } & RadixSliderProps
>;

export default function Slider({ look, size, state, format, className, ...props }: SliderProps) {
  const { base, thumb, track, range } = sliderStyles({ look, size });
  const [value, setValue] = useState<number>();

  return (
    <Root
      className={mergeClass(base(), className)}
      onValueChange={([n]) => {
        state?.[1]?.(n);
        setValue(n);
      }}
      value={[state?.[0] ?? 0]}
      {...props}
    >
      <Track className={track()}>
        <Range className={range()} />
      </Track>
      <Thumb className={thumb()}>{format?.(value ?? 0) ?? value ?? 0}</Thumb>
    </Root>
  );
}
