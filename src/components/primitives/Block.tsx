import type { ReactNode } from "react";
import type { Component } from "../../utils/types";
import Divider from "./Divider";

const extensions = ["header", "footer", "prefix", "suffix"] as const;

type BlockExtension = (typeof extensions)[number];
export type BlockProps = { [Part in BlockExtension]?: ReactNode } & {
  [Part in `${BlockExtension}ClassName`]?: string;
} & { id?: string; divide?: boolean; dividerClassName?: string };

/**
 * Wraps a children of a component into a extendable block
 */
export default function Block({ id, children, divide, dividerClassName, ...props }: Component<BlockProps>) {
  const hasExtensions = extensions.some(extension => props?.[extension]);

  const componentOf = (extension: BlockExtension) => props?.[extension];

  if (!hasExtensions) return children;
  return (
    <div className="flex flex-col">
      {componentOf("header")}
      <div className="flex flex-row">
        {componentOf("prefix")}
        {divide && componentOf("prefix") && <Divider horizontal className={dividerClassName} />}
        {children}
        {divide && componentOf("suffix") && <Divider horizontal className={dividerClassName} />}
        {componentOf("suffix")}
      </div>
      {componentOf("footer")}
    </div>
  );
}
