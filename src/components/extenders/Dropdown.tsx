import * as Popover from "@radix-ui/react-popover";
import { type ReactNode, useState } from "react";
import Box from "../primitives/Box";
import { useTheme } from "../../context/Theme.context";
import type { Component, GetSet } from "../../utils/types";
import { blockEvent } from "../../utils/event";
import EventBlocker from "../primitives/EventBlocker";

export type DropdownProps = Component<{ state?: GetSet<boolean>; content?: ReactNode }>;

export default function Dropdown({ state, content, children }: DropdownProps) {
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);

  return (
    <Popover.Root open={!state ? internalState : state?.[0]} onOpenChange={!state ? setInternalState : state?.[1]}>
      <Popover.Trigger
        onClick={blockEvent(() => setInternalState(r => !r))}>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content asChild style={vars} className="">
          <EventBlocker>
          <Box look="bold" size="md" content="sm" className="mt-md mx-lg shadow-md animate-drop">
            {content}
          </Box>
          </EventBlocker>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
