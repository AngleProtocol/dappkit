import * as Dialog from "@radix-ui/react-dialog";
import { type ReactNode, useState } from "react";
import { mergeClass } from "../..";
import { useTheme } from "../../context/Theme.context";
import type { Component, GetSet } from "../../utils/types";
import Box, { type BoxProps } from "../primitives/Box";
import Button from "../primitives/Button";
import Icon from "../primitives/Icon";
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
        <Dialog.Overlay style={vars} className="bg-main-1 opacity-[0.75] fixed inset-0 z-20" />
        <Dialog.Content
          style={{
            ...vars,
            "--modal-zIndex": "50",
            zIndex: "var(--modal-zIndex)",
          }}
          className={mergeClass(
            "fixed w-[90vw] md:w-[75vw] lg:w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            className,
          )}>
          <Box size="lg" className="p-xl*2 shadow-md" {...props}>
            {title && (
              <div className="flex justify-between items-center gap-md">
                <Dialog.Title asChild={!!title}>
                  {typeof title === "string" ? <Title h={3}>{title}</Title> : title}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <Button look="soft" className="text-3xl !border-0">
                    <Icon remix="RiCloseLine" className="text-accent-11" />
                  </Button>
                </Dialog.Close>
              </div>
            )}
            {description && (
              <Dialog.Description>
                {typeof description === "string" ? (
                  <Text size={5} className="text-main-11">
                    {description}
                  </Text>
                ) : (
                  description
                )}
              </Dialog.Description>
            )}
            {modal}
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
