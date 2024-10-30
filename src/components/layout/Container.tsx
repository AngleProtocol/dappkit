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
        "px-[2rem] md:px-[3rem] lg:px-[4rem] xl:px-[5rem] w-full max-w-[1650px] mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
