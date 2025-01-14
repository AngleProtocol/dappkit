import * as RadixCollapsible from "@radix-ui/react-collapsible";
import type { PropsWithChildren } from "react";
import { mergeClass } from "../../utils/css";
import type { GetSet } from "../../utils/types";
import styles from "./Collapsible.module.css";

export type CollapsibleProps = PropsWithChildren<{ state: GetSet<boolean>; className?: string }>;

export default function Collapsible({ state, children, className }: CollapsibleProps) {
  return (
    <RadixCollapsible.Root
      className={mergeClass("overflow-hidden", className)}
      open={state?.[0]}
      onOpenChange={state?.[1]}>
      <RadixCollapsible.Content className={styles.animated}>{children}</RadixCollapsible.Content>
    </RadixCollapsible.Root>
  );
}
