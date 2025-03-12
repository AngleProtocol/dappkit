import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";
import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { Animations } from "dappkit";

export const dividerStyles = tv(
  {
    base: "border-t-1 border-b-0 box-border bg-main-0",
    variants: {
      look: {
        soft: "border-main-8",
        base: "border-main-11",
        bold: "border-accent-11",
        tint: "border-dashed border-main-8",
        hype: "border-t-2 border-accent-11",
      },
      vertical: {
        true: "self-stretch w-px h-auto border-t-0",
        false: "h-1 w-full",
      },
    },
    defaultVariants: {
      look: "base",
    },
    compoundVariants: [
      { look: "soft", vertical: true, class: "border-r-1" },
      {
        look: "base",
        vertical: true,
        class: "border-r-1",
      },
      { look: "bold", vertical: true, class: "border-r-1" },
      { look: "tint", vertical: true, class: "border-r-2" },
      { look: "hype", vertical: true, class: "border-r-2" },
    ],
  },
  { twMerge: false },
);

type StyledProps = Styled<typeof dividerStyles> & {
  vertical?: boolean;
  horizontal?: boolean;
};

export type DividerProps = HTMLMotionProps<"div"> & Component<StyledProps>;

export default function Divider({ vertical = false, horizontal = true, look, className, ...props }: DividerProps) {
  if (horizontal && !vertical)
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={Animations.extendX}
        className={mergeClass(dividerStyles({ look }), className)}
        {...props}
      />
    );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={Animations.extendY}
      className={mergeClass(dividerStyles({ look, vertical: true }), className)}
      {...props}
    />
  );
}
