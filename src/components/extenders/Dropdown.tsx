import * as Popover from "@radix-ui/react-popover";
import { type ReactNode, useState } from "react";
import { useTheme } from "../../context/Theme.context";
import { blockEvent } from "../../utils/event";
import type { Component, GetSet } from "../../utils/types";
import Box, { type BoxProps } from "../primitives/Box";
import EventBlocker from "../primitives/EventBlocker";

export type DropdownProps = Component<
  {
    padding?: BoxProps["content"];
    size?: BoxProps["size"];
    state?: GetSet<boolean>;
    content?: ReactNode;
  },
  BoxProps
>;

export default function Dropdown({ state, padding, content, children, className, ...props }: DropdownProps) {
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);

  return (
    <Popover.Root open={!state ? internalState : state?.[0]} onOpenChange={!state ? setInternalState : state?.[1]}>
      <Popover.Trigger className={className} onClick={blockEvent(() => setInternalState(r => !r))}>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content asChild style={vars}>
          <EventBlocker>
            <Box
              look="bold"
              className="mt-md mx-lg shadow-md animate-drop z-20 "
              {...(props as BoxProps)}
              content={padding}>
              {content}
            </Box>
          </EventBlocker>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
