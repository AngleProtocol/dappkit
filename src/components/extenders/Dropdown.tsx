import * as Popover from "@radix-ui/react-popover";
import { type ReactNode, useState } from "react";
import Box from "../primitives/Box";
import { useTheme } from "../../context/Theme.context";
import type { Component, GetSet } from "../../utils/types";

export type DropdownProps = Component<{ state?: GetSet<boolean>; content?: ReactNode }>;

export default function Dropdown({ state, content, children }: DropdownProps) {
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);

  return (
    <Popover.Root open={!state ? internalState : state?.[0]} onOpenChange={!state ? setInternalState : state?.[1]}>
      <Popover.Trigger
        className={"bg-main-2"}
        onClick={e => {
          e.preventDefault();
          setInternalState(r => !r);
        }}>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content asChild style={vars} className="">
          <Box look="bold" size="md" content="sm" className="mt-md mx-lg shadow-md animate-drop">
            {content}
            <Popover.Arrow className="fill-main-6 border-main-6" />
          </Box>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
