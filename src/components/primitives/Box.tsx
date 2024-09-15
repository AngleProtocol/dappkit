import clsx from "clsx";
import { mergeClass } from "src/utils/css";
import { sizeScale } from "src/utils/tailwind";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import type { Component, Styled } from "../../utils/types";

export const boxStyles = tv({
  base: "flex flex-col border-1 gap-1",
  variants: {
    look: {
      soft: "bg-main-1 border-main-0",
      base: "bg-main-2 border-main-0 text-main-12",
      bold: "bg-main-2 border-main-6 text-main-12",
      tint: "bg-primary-4 border-main-0 text-main-12",
      hype: "bg-primary-9 border-main-0 text-main-12",
    },
    size: {
      xs: "p-xs gap-xs/2",
      sm: "p-sm gap-sm/2",
      md: "p-md gap-md/2",
      lg: "p-lg gap-lg/2",
      xl: "p-xl gap-xl/2",
    },
    container: {
      true: "",
      false: "",
    },
    content: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    size: "md",
    content: "md",
    look: "base",
    container: true,
  },
  compoundVariants: sizeScale.flatMap((size) =>
    sizeScale.flatMap((content) => [
      { size, content, container: true, class: `rounded-${size}+${content}` },
      { size, content, container: false, class: `rounded-${size}` },
    ]),
  ),
  // compoundVariants: [
  //   { content: "xs", size: "xs", class: "rounded-xs+xs" },
  //   { content: "xs", size: "sm", class: "rounded-xs+sm" },
  //   { content: "xs", size: "md", class: "rounded-xs+md" },
  //   { content: "xs", size: "lg", class: "rounded-xs+lg" },
  //   { content: "xs", size: "xl", class: "rounded-xs+xl" },

  //   { content: "sm", size: "xs", class: "rounded-sm+xs" },
  //   { content: "sm", size: "sm", class: "rounded-sm+sm" },
  //   { content: "sm", size: "md", class: "rounded-sm+md" },
  //   { content: "sm", size: "lg", class: "rounded-sm+lg" },
  //   { content: "sm", size: "xl", class: "rounded-sm+xl" },

  //   { content: "md", size: "xs", class: "rounded-md+xs" },
  //   { content: "md", size: "sm", class: "rounded-md+sm" },
  //   { content: "md", size: "md", class: "rounded-md+md" },
  //   { content: "md", size: "lg", class: "rounded-md+lg" },
  //   { content: "md", size: "xl", class: "rounded-md+xl" },

  //   { content: "lg", size: "xs", class: "rounded-lg+xs" },
  //   { content: "lg", size: "sm", class: "rounded-lg+sm" },
  //   { content: "lg", size: "md", class: "rounded-lg+md" },
  //   { content: "lg", size: "lg", class: "rounded-lg+lg" },
  //   { content: "lg", size: "xl", class: "rounded-lg+xl" },

  //   { content: "xl", size: "xs", class: "rounded-xl+xs" },
  //   { content: "xl", size: "sm", class: "rounded-xl+sm" },
  //   { content: "xl", size: "md", class: "rounded-xl+md" },
  //   { content: "xl", size: "lg", class: "rounded-xl+lg" },
  //   { content: "xl", size: "xl", class: "rounded-xl+xl" },
  // ],
});

export type BoxProps = Component<Styled<typeof boxStyles>>;

export default function Box({ look, size, container, content, className, ...props }: BoxProps) {
  return (
    <div
      className={mergeClass(
        boxStyles({ look, size, content, container: container === "false" }),
        className,
      )}
      {...props}
    />
  );
}
