import type { PropsWithChildren } from "react";
import type { Component } from "../../utils/types";
import { mergeClass } from "../../utils/css";

export default function Container({
  children,
  className,
}: Component<PropsWithChildren>) {
  return (
    <div
      className={mergeClass(
        "!px-[clamp(0.5rem,3vw,5rem)] w-full max-w-[1650px] mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}