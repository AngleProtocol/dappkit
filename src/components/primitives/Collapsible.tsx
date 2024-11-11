import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { PropsWithChildren, useState } from "react";
import { GetSet } from "../../utils/types";
import { mergeClass } from "../../utils/css";
import { css } from "@acab/ecsstatic";
import styles from "./Collapsible.module.css";

export type CollapsibleProps = PropsWithChildren<{ state: GetSet<boolean> }>;

const animated = css`
    @keyframes sDown {
	from {
		height: 0;
	}
	to {
		height: var(--radix-collapsible-content-height);
	}
}

@keyframes sUp {
	from {
		height: var(--radix-collapsible-content-height);
	}
	to {
		height: 0;
	}
}

    &[data-state="closed"] {
        animation: sUp 1s ease-out;
    }

    &[data-state="open"] {
        animation: sDown 1s ease-out;
    }
`;

export default function Collapsible({ state, children }: CollapsibleProps) {
  return (
    <RadixCollapsible.Root className="overflow-hidden" open={state?.[0]} onOpenChange={state?.[1]}>
      <RadixCollapsible.Content className={styles.animated}>{children}</RadixCollapsible.Content>
    </RadixCollapsible.Root>
  );
}
