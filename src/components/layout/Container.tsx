import type { PropsWithChildren } from "react";

import { mergeClass } from "../../utils/css";
import type { Component } from "../../utils/types";
import { motion } from "motion/react";
import { Animations } from "dappkit";

export default function Container({ children, className }: Component<PropsWithChildren>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={Animations.container}
      className={mergeClass("!px-[clamp(0.5rem,3vw,5rem)] w-full max-w-[1650px] mx-auto overflow-x-auto", className)}>
      {children}
    </motion.div>
  );
}
