import * as Dialog from "@radix-ui/react-dialog";
import { mergeClass } from "dappkit/src";
import { type ReactNode, useState } from "react";
import { useTheme } from "../../context/Theme.context";
import type { Component, GetSet } from "../../utils/types";
import Box, { type BoxProps } from "../primitives/Box";
import Text from "../primitives/Text";
import Title from "../primitives/Title";

export type ModalProps = Component<{
  open?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  modal?: ReactNode;
  state?: GetSet<boolean>;
}> &
  BoxProps;

export default function Modal({ state, title, description, modal, children, className, ...props }: ModalProps) {
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);

  return (
    <Dialog.Root open={!state ? internalState : state?.[0]} onOpenChange={!state ? setInternalState : state?.[1]}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay style={vars} className="bg-main-1 opacity-[0.75] fixed inset-0" />
        <Dialog.Content
          style={vars}
          className={mergeClass("fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", className)}>
          <Box className="shadow-md" {...props}>
            {title && (
              <Dialog.Title asChild={!!title}>
                {typeof title === "string" ? <Title h={2}>{title}</Title> : title}
              </Dialog.Title>
            )}
            {description && (
              <Dialog.Description>
                {typeof description === "string" ? <Text>{description}</Text> : description}
              </Dialog.Description>
            )}
            {modal}
            {/* <Group className="justify-between">
              <Dialog.Close asChild>
                <Button>Close</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button look="bold">Confirm</Button>
              </Dialog.Close>
            </Group> */}
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
