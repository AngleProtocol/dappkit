import * as Dialog from "@radix-ui/react-dialog";
import { type ReactNode, useState } from "react";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Text from "src/components/primitives/Text";
import Title from "src/components/primitives/Title";
import { useTheme } from "src/context/Theme.context";
import type { Component, GetSet } from "src/utils/types";
import Group from "./Group";

export type ModalProps = Component<{
  open?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  state?: GetSet<boolean>;
}>;

export default function Modal({ state, title, description, content, children }: ModalProps) {
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);

  return (
    <Dialog.Root
      open={!state ? internalState : state?.[0]}
      onOpenChange={!state ? setInternalState : state?.[1]}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay style={vars} className="bg-main-1 opacity-[0.75] fixed inset-0" />
        <Dialog.Content
          style={vars}
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <Box className="shadow-md">
            <Dialog.Title asChild={!!title}>
              {typeof title === "string" ? <Title h={2}>{title}</Title> : title}
            </Dialog.Title>
            <Dialog.Description>
              {typeof description === "string" ? <Text>{description}</Text> : description}
            </Dialog.Description>
            {content}
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
