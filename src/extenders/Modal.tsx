import * as Dialog from "@radix-ui/react-dialog";
import Box from "src/primitives/Box";
import Button from "src/primitives/Button";
import { useTheme } from "src/theme/Theme.context";
import Group from "./Group";
import { ReactNode, useState } from "react";
import { Component, GetSet } from "src/utils/types";
import Title from "src/primitives/Title";

export type ModalProps = Component<{
  open?: boolean;
  title?: ReactNode;
  content?: ReactNode;
  state?: GetSet<boolean>;
}>;

export default function Modal({ state, title, content, children }: ModalProps) {
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);

  return (
    <Dialog.Root
      open={!state ? internalState : state?.[0]}
      onOpenChange={!state ? setInternalState : state?.[1]}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          style={vars}
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <Box>
            <Dialog.Title asChild={!!title}>
              {typeof title === "string" ? <Title h={2}>{title}</Title> : title}
            </Dialog.Title>
            <Dialog.Description className="">
              {content}
            </Dialog.Description>
            <Group className="justify-between">
              <Dialog.Close asChild>
                <Button>Close</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button look="bold">Confirm</Button>
              </Dialog.Close>
            </Group>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
