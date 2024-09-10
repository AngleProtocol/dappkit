import * as Dialog from "@radix-ui/react-dialog";
import Box from "src/primitives/Box";
import Button from "src/primitives/Button";
import { useTheme } from "src/theme/Theme.context";
import Group from "./Group";

export type ModalProps = { open?: boolean };

export default function Modal({ open }: ModalProps) {
  const { vars } = useTheme();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Edit profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          style={vars}
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <Box>
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Edit profile
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Make changes to your profile here. Click save when you're done.
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
