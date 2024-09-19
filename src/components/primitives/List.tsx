import { Children, ReactElement, cloneElement } from "react";
import { mergeClass } from "src/utils/css";
import type { Component, Styled } from "src/utils/types";
import { tv } from "tailwind-variants";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const listStyles = tv({
  base: "flex border-1",
  slots: {
    item: "",
    divider: "pt-xs/2 h-xs",
  },
  variants: {
    flex: {
      col: { base: "flex-col" },
      row: { base: "flex-row", item: "grow", divider: "min-w-[1px] w-[1px]" },
    },
    index: {
      first: "",
      last: "",
    },
    look: {
      soft: { base: "bg-main-0 border-main-0" },
      base: {
        base: "border-main-6 border-main-6  text-main-12",
        item: "border-main-0",
        divider: "bg-main-6",
      },
      bold: {
        base: "bg-main-0 border-main-0 text-main-12",
      },
      tint: { base: "bg-main-0 border-accent-0 text-accent-12" },
      hype: { base: "border-accent-0 text-accent-12" },
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
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
    flex: "col",
    content: "md",
    look: "base",
  },
  compoundVariants: [
    ...sizes.flatMap((size) =>
      sizes.flatMap((content) => {
        const base = {
          content,
          size,
          index: undefined satisfies "first" | "last" | undefined,
          look: ["base", "bold", "tint", "hype"] satisfies ("base" | "bold" | "tint" | "hype")[],
          class: { item: "!rounded-0 !hover:rounded-0", base: `rounded-${content}` },
        };

        return [
          base,
          {
            ...base,
            index: ["first"] satisfies ("first" | "last")[],
            flex: "col" as const,
            class: {
              item: "!rounded-b-0",
            },
          },
          {
            ...base,
            index: ["last"] satisfies ("first" | "last")[],
            flex: "col" as const,
            class: {
              item: "!rounded-t-0",
            },
          },
          {
            ...base,
            index: ["first"] satisfies ("first" | "last")[],
            flex: "row" as const,
            class: {
              item: "!rounded-r-0",
            },
          },
          {
            ...base,
            index: ["last"] satisfies ("first" | "last")[],
            flex: "row" as const,
            class: {
              item: "!rounded-l-0",
            },
          },
        ];
      }),
    ),
  ],
});

type ListElement = ReactElement<{ look: unknown; size: unknown; className?: string }>;
export type ListProps = Component<Styled<typeof listStyles>, HTMLDivElement>;

export default function List({
  look,
  size,
  flex,
  content,
  className,
  children,
  ...props
}: ListProps) {
  const { base, item, divider } = listStyles({ look, size, content: size, flex });

  return (
    <div className={mergeClass(base(), className)} {...props}>
      {Children.map(children as ListElement | ListElement[], (child, index) => (
        child && <>
          {!!index && <div className={divider()} />}
          {cloneElement(child, {
            size,
            look: child.props.look ?? look,
            className: mergeClass(
              child.props.className,
              item({
                index: ({ 0: "first", [Children.count(children) - 1]: "last" } as const)[index],
              }),
            ),
          })}
        </>
      ))}
    </div>
  );
}
