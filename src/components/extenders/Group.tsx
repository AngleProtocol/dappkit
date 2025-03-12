import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";
import { forwardRef } from "react";

export const groupStyles = tv({
  base: "flex flex-wrap",
  variants: {
    size: {
      xs: "gap-xs",
      sm: "gap-sm",
      md: "gap-md",
      lg: "gap-lg",
      xl: "gap-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type GroupProps = Component<Styled<typeof groupStyles>, HTMLDivElement>;

const Group = forwardRef<HTMLDivElement, GroupProps>(({ size, className, ...props }, ref) => {
  return <div ref={ref} className={mergeClass(groupStyles({ size }), className)} {...props} />;
});

Group.displayName = "Group";

// export default function Group({ size, className, ...props }: GroupProps) {
//   return <div className={mergeClass(groupStyles({ size }), className)} {...props} />;
// }
export default Group;
