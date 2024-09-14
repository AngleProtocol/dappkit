import { Children, cloneElement, ReactElement } from "react";
import { mergeClass } from "src/utils/css";
import { Component, Styled } from "src/utils/types";
import { tv } from "tailwind-variants";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
type Size = (typeof sizes)[number];

export const listStyles = tv({
  base: "flex flex-col border-1",
  slots: {
    item: "",
    divider: "pt-xs/2 h-xs",
  },
  variants: {
    index: {
      first: "",
      last: "",
    },
    look: {
      soft: { base: "bg-main-0 border-main-0" },
      base: { base: "border-main-6 border-main-6  text-main-12", item: "border-main-0", divider: "bg-main-6" },
      bold: {
        base: "bg-main-0 border-main-0 text-main-12",
      },
      tint: { base: "bg-main-0 border-primary-0 text-primary-12" },
      hype: { base: "border-primary-0 text-primary-12" },
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
  },
  compoundVariants: [
    ...sizes.flatMap((size) =>
      sizes.flatMap((content) => {
        return [
          {
            content,
            size,
            index: undefined satisfies "first" | "last" | undefined,
            look: ["base", "bold", "tint", "hype"] satisfies ("bold" | "tint" | "hype")[],
            class: { item: "!rounded-0", base: `rounded-${content}+${size}` },
          },
          {
            content,
            size,
            index: ["first"] satisfies ("first" | "last")[],
            look: ["base", "bold", "tint", "hype"] satisfies ("bold" | "tint" | "hype")[],
            class: {
              item: `rounded-${size} !rounded-b-0` as `rounded-${Size}+${Size} rounded-t-${Size}`,
            },
          },
          {
            content,
            size,
            index: ["last"] satisfies ("first" | "last")[],
            look: ["base", "bold", "tint", "hype"] satisfies ("bold" | "tint" | "hype")[],
            class: {
              item: `rounded-${size} !rounded-t-0` as `rounded-${Size}+${Size} rounded-t-${Size}`,
            },
          },
        ];
      }),
    ),
  ],
});

// [
//   { content: "xs", size: "xs", look: ["bold", "tint", "hype"], class: { item: "rounded-xs+xs" } },
//   { content: "xs", size: "sm", look: ["bold", "tint", "hype"], class: { item: "rounded-xs+sm" } },
//   { content: "xs", size: "md", look: ["bold", "tint", "hype"], class: { item: "rounded-xs+md" } },
//   { content: "xs", size: "lg", look: ["bold", "tint", "hype"], class: { item: "rounded-xs+lg" } },
//   { content: "xs", size: "xl", look: ["bold", "tint", "hype"], class: { item: "rounded-xs+xl" } },

//   { content: "sm", size: "xs", look: ["bold", "tint", "hype"], class: { item: "rounded-sm+xs" } },
//   { content: "sm", size: "sm", look: ["bold", "tint", "hype"], class: { item: "rounded-sm+sm" } },
//   { content: "sm", size: "md", look: ["bold", "tint", "hype"], class: { item: "rounded-sm+md" } },
//   { content: "sm", size: "lg", look: ["bold", "tint", "hype"], class: { item: "rounded-sm+lg" } },
//   { content: "sm", size: "xl", look: ["bold", "tint", "hype"], class: { item: "rounded-sm+xl" } },

//   { content: "md", size: "xs", look: ["bold", "tint", "hype"], class: { item: "rounded-md+xs" } },
//   { content: "md", size: "sm", look: ["bold", "tint", "hype"], class: { item: "rounded-md+sm" } },
//   { content: "md", size: "md", look: ["bold", "tint", "hype"], class: { item: "rounded-md+md" } },
//   { content: "md", size: "lg", look: ["bold", "tint", "hype"], class: { item: "rounded-md+lg" } },
//   { content: "md", size: "xl", look: ["bold", "tint", "hype"], class: { item: "rounded-md+xl" } },

//   { content: "xs", size: "xs", look: ["soft", "base"], class: { base: "rounded-xs+xs" } },
//   { content: "lg", size: "xs", look: ["bold", "tint", "hype"], class: { item: "rounded-lg+xs" } },
//   { content: "lg", size: "sm", look: ["bold", "tint", "hype"], class: { item: "rounded-lg+sm" } },
//   { content: "lg", size: "md", look: ["bold", "tint", "hype"], class: { item: "rounded-lg+md" } },
//   { content: "lg", size: "lg", look: ["bold", "tint", "hype"], class: { item: "rounded-lg+lg" } },
//   { content: "lg", size: "xl", look: ["bold", "tint", "hype"], class: { item: "rounded-lg+xl" } },

//   { content: "xl", size: "xs", look: ["soft", "base"], class: { base: "rounded-xl+xs" } },
//   { content: "xl", size: "sm", look: ["soft", "base"], class: { base: "rounded-xl+sm" } },
//   { content: "xl", size: "md", look: ["soft", "base"], class: { base: "rounded-xl+md" } },
//   { content: "xl", size: "lg", look: ["soft", "base"], class: { base: "rounded-xl+lg" } },
//   { content: "xl", size: "xl", look: ["soft", "base"], class: { base: "rounded-xl+xl" } },

//   { content: "xs", size: "xs", look: ["soft", "base"], class: { base: "rounded-xs+xs" } },
//   { content: "xs", size: "sm", look: ["soft", "base"], class: { base: "rounded-xs+sm" } },
//   { content: "xs", size: "md", look: ["soft", "base"], class: { base: "rounded-xs+md" } },
//   { content: "xs", size: "lg", look: ["soft", "base"], class: { base: "rounded-xs+lg" } },
//   { content: "xs", size: "xl", look: ["soft", "base"], class: { base: "rounded-xs+xl" } },

//   { content: "sm", size: "xs", look: ["soft", "base"], class: { base: "rounded-sm+xs" } },
//   { content: "sm", size: "sm", look: ["soft", "base"], class: { base: "rounded-sm+sm" } },
//   { content: "sm", size: "md", look: ["soft", "base"], class: { base: "rounded-sm+md" } },
//   { content: "sm", size: "lg", look: ["soft", "base"], class: { base: "rounded-sm+lg" } },
//   { content: "sm", size: "xl", look: ["soft", "base"], class: { base: "rounded-sm+xl" } },

//   { content: "md", size: "xs", look: ["soft", "base"], class: { base: "rounded-md+xs" } },
//   { content: "md", size: "sm", look: ["soft", "base"], class: { base: "rounded-md+sm" } },
//   { content: "md", size: "md", look: ["soft", "base"], class: { base: "rounded-md+md" } },
//   { content: "md", size: "lg", look: ["soft", "base"], class: { base: "rounded-md+lg" } },
//   { content: "md", size: "xl", look: ["soft", "base"], class: { base: "rounded-md+xl" } },

//   { content: "lg", size: "xs", look: ["soft", "base"], class: { base: "rounded-lg+xs" } },
//   { content: "lg", size: "sm", look: ["soft", "base"], class: { base: "rounded-lg+sm" } },
//   { content: "lg", size: "md", look: ["soft", "base"], class: { base: "rounded-lg+md" } },
//   { content: "lg", size: "lg", look: ["soft", "base"], class: { base: "rounded-lg+lg" } },
//   { content: "lg", size: "xl", look: ["soft", "base"], class: { base: "rounded-lg+xl" } },

//   { content: "xs", size: "xs", look: ["soft", "base"], class: { base: "rounded-xs+xs" } },
//   { content: "xl", size: "xs", look: ["soft", "base"], class: { base: "rounded-xl+xs" } },
//   { content: "xl", size: "sm", look: ["soft", "base"], class: { base: "rounded-xl+sm" } },
//   { content: "xl", size: "md", look: ["soft", "base"], class: { base: "rounded-xl+md" } },
//   { content: "xl", size: "lg", look: ["soft", "base"], class: { base: "rounded-xl+lg" } },
//   { content: "xl", size: "xl", look: ["soft", "base"], class: { base: "rounded-xl+xl" } },
// ]

export type ListProps = Component<
  Styled<typeof listStyles> & { children: ReactElement[] | ReactElement },
  Omit<HTMLDivElement, "children">
>;

export default function List({ look, size, content, className, children, ...props }: ListProps) {
  const { base, item, divider } = listStyles({ look, size, content: size });

  return (
    <div className={mergeClass(base(), className)} {...props}>
      {Children.map(children, (child, index) => (
        <>
          {!!index && <div className={divider()}/>}
          {cloneElement(child, {
            size,
            look: child.props.look ?? look,
            className: mergeClass(child.props.className, item({
              index: ({ 0: "first", [Children.count(children) - 1]: "last" } as const)[index],
            })),
          })}
        </>
      ))}
    </div>
  );
}
