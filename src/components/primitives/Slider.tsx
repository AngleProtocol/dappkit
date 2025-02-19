import { type SliderProps as RadixSliderProps, Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { useState } from "react";
import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, GetSet, Styled } from "../../utils/types";

export const sliderStyles = tv({
  base: [
    "relative text-accent-11 flex items-center justify-between   border-1 outline-offset-0 outline-0 text-nowrap font-text font-bold",
  ],
  slots: {
    thumb: "aspect-square text-xs border-1 bg-accent-4 mt-sm shadow-md font-text font-normal",
    track: "p-sm outline-offset-0 outline-0 text-nowrap",
    range: "border-l-1 h-full flex items-center",
  },
  variants: {
    look: {
      base: {
        base: "bg-accent-2 border-accent-6 hover:bg-accent-4 active:bg-accent-3 hover:text-accent-12  focus-visible:border-accent-9",
        thumb: "bg-accent-2 border-accent-6",
        track:
          "hover:bg-accent-5 data-[highlighted]:bg-accent-5 active:bg-accent-4 text-accent-12 focus-visible:border-accent-8",
      },
      soft: {
        base: "bg-accent-0 border-accent-0 hover:bg-accent-4 active:bg-accent-3 hover:text-accent-12  focus-visible:border-accent-9",
        thumb: "bg-accent-2 border-accent-6",
        track:
          "hover:bg-accent-5 data-[highlighted]:bg-accent-5 active:bg-accent-4 text-accent-12 focus-visible:border-accent-8",
      },
      bold: {
        base: "bg-accent-4 border-accent-4 hover:bg-accent-5 active:bg-accent-3 text-accent-12 focus-visible:border-accent-9",
        thumb: "bg-accent-4 border-accent-6",
        track:
          "hover:bg-accent-6 data-[highlighted]:bg-accent-6 active:bg-accent-5 text-accent-12 focus-visible:border-accent-8",
      },
      tint: {
        base: "bg-gray-4 border-gray-4 hover:bg-gray-5 active:bg-gray-3 text-accent-12 focus-visible:border-gray-9",
        thumb: "bg-gray-4 border-gray-6",
        track:
          "hover:bg-gray-6 data-[highlighted]:bg-gray-6 active:bg-gray-5 text-accent-12 focus-visible:border-accent-8",
      },
      hype: {
        base: "bg-gray-9 border-gray-9 hover:bg-gray-10 active:bg-gray-8 text-gray-12 focus-visible:border-gray-10",
        thumb: "bg-gray-9 border-gray-6",
        track:
          "hover:bg-gray-10 data-[highlighted]:bg-gray-10 active:bg-gray-4 text-accent-12 focus-visible:border-gray-10",
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
      {...props}>
      <Track className={track()}>
        <Range className={range()} />
      </Track>
      <Thumb className={thumb()}>{format?.(value ?? 0) ?? value ?? 0}</Thumb>
    </Root>
  );
}
