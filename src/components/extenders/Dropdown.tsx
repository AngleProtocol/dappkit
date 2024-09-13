import * as Popover from "@radix-ui/react-popover";
import { ReactNode, useState } from "react";
import Box from "src/components/primitives/Box";
import { useTheme } from "src/context/Theme.context";
import { Component, GetSet } from "src/utils/types";

export type DropdownProps = Component<{ state?: GetSet<boolean>; content?: ReactNode }>;

export default function Dropdown({ state,content, children }: DropdownProps) {
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);

  return (
    <Popover.Root
      open={!state ? internalState : state?.[0]}
      onOpenChange={!state ? setInternalState : state?.[1]}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content asChild style={vars} className="" sideOffset={5}>
          <Box size='lg' className="mx-lg shadow-md">
            {content}
            <Popover.Arrow className="fill-main-6 border-main-6" />
          </Box>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
