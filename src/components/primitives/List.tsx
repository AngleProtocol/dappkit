import { Children, type ReactElement, cloneElement, useMemo } from "react";
import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import { getDefinedIndexesOfChildren } from "../../utils/react";
import type { Component, Styled } from "../../utils/types";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const listStyles = tv({
  base: "flex border-1",
  slots: {
    item: "",
    divider: "pt-xs/2 h-xs",
  },
  variants: {
    flex: {
      col: { base: "flex-col", divider: "min-h-[1px] h-[1px] max-h-[1px]" },
      row: { base: "flex-row", item: "grow", divider: "min-w-[1px] w-[1px] max-w-[1px]" },
    },
    index: {
      first: "",
      alone: "",
      last: "",
    },
    look: {
      soft: { base: "bg-main-0 border-main-0" },
      base: {
        base: "border-main-0 border-main-0  text-main-12",
        item: "border-main-0",
        divider: "bg-main-0 border-main-0",
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
    ...sizes.flatMap(size =>
      sizes.flatMap(content => {
        const base = {
          content,
          size,
          index: undefined satisfies "first" | "last" | undefined,
          class: { item: "!rounded-0 !hover:rounded-0", base: `rounded-${content}` },
        };

        return [
          {
            content,
            size,
            index: ["first"] satisfies ("first" | "last")[],
            flex: "col" as const,
            class: {
              item: "!rounded-b-0",
            },
          },
          {
            content,
            size,
            index: ["last"] satisfies ("first" | "last")[],
            flex: "col" as const,
            class: {
              item: "!rounded-t-0",
            },
          },
          {
            content,
            size,
            index: ["first"] satisfies ("first" | "last")[],
            flex: "row" as const,
            class: {
              item: "!rounded-r-0",
            },
          },
          {
            content,
            size,
            index: ["last"] satisfies ("first" | "last")[],
            flex: "row" as const,
            class: {
              item: "!rounded-l-0",
            },
          },
          base,
        ] as const;
      }),
    ),
  ],
});

type ListElement = ReactElement<{
  look: unknown;
  size: unknown;
  className?: string;
}>;
export type ListProps = Component<Styled<typeof listStyles> & { indexOffset?: number, dividerClassName?: (index: number) => string; }, HTMLDivElement>;

export default function List({ look, size, flex, content, className, children, indexOffset, dividerClassName, ...props }: ListProps) {
  const { base, item, divider } = listStyles({ look, size, content: size, flex });

  const definedChild = useMemo(() => {
    const [first, last] = getDefinedIndexesOfChildren(children);

    //TODO: workaround for borders, might just need to update the coumpound styling
    if (first === 0 && last === 0) return children;
    return Children.map(children as ListElement | ListElement[], (child, index) => {
      let position: "first" | "last" | "alone" | undefined = "first";

      if (index > (first ?? 0) + (indexOffset ?? 0)) position = undefined;
      if (index >= (last ?? 0) + (indexOffset ?? 0)) position = "last";

      return (
        child && [
          cloneElement(child, {
            size,
            look: child.props.look ?? look ?? "base",
            className: mergeClass(
              child.props.className,
              item({
                index: position,
              }),
            ),
          }),
          position !== "last" && <div className={mergeClass(divider(), dividerClassName?.(index))} />,
        ]
      );
    });
  }, [children, divider, item, look, size, indexOffset]);

  return (
    <div className={mergeClass(base(), className)} {...props}>
      {definedChild}
    </div>
  );
}
