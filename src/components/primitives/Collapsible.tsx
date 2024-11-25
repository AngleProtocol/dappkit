import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { PropsWithChildren, useState } from "react";
import { GetSet } from "../../utils/types";
import { mergeClass } from "../../utils/css";
import styles from "./Collapsible.module.css";

export type CollapsibleProps = PropsWithChildren<{ state: GetSet<boolean> }>;

export default function Collapsible({ state, children }: CollapsibleProps) {
  return (
    <RadixCollapsible.Root
      className="overflow-hidden"
      open={state?.[0]}
      onOpenChange={state?.[1]}
    >
      <RadixCollapsible.Content className={styles.animated}>
        {children}
      </RadixCollapsible.Content>
    </RadixCollapsible.Root>
  );
}
