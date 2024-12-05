import { Children, type ReactElement, cloneElement } from "react";
import { tv } from "tailwind-variants";
import { mergeClass } from "../..";
import type { Component, Styled } from "../..";
import Group from "./Group";

export const iconsStyles = tv({
  base: "",
  slots: {
    container: "min-w-fit max-w-fit",
    item: "",
  },
  variants: {
    size: {
      xs: { container: "", item: "-ml-xs*2 " },
      sm: { container: "", item: "-ml-sm*2" },
      md: { container: "", item: "-ml-md*2" },
      lg: { container: "", item: "-ml-lg*2" },
      xl: { container: "", item: "-ml-xl*2" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ListElement = ReactElement<{
  look: unknown;
  size: unknown;
  className?: string;
  style: unknown;
}>;
export type IconsProps = Component<Styled<typeof iconsStyles> & { children: ListElement[] }, HTMLDivElement>;

export default function Icons({ size, children, className, ...props }: IconsProps) {
  const { container, item } = iconsStyles({ size });

  return (
    <Group size={size} className={mergeClass(container())} {...props}>
      {Children.map(
        children as ListElement | ListElement[],
        (child, index) =>
          child &&
          cloneElement(child, {
            size: size,
            style: { zIndex: Children.count(children) - index },
            className: mergeClass(index && item(), child.props.className),
          }),
      )}
    </Group>
  );
}
