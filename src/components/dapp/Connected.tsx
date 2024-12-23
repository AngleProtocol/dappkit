import { Button, type ButtonProps, Modal, WalletConnectors } from "../..";
import { useWalletContext } from "../../context/Wallet.context";

export type ConnectedProps = ButtonProps;

export default function Connected({ children, ...props }: ConnectedProps) {
  const { connected } = useWalletContext();

  if (!connected)
    return (
      <Modal title="Connect Wallet" className="mx-auto w-full max-w-[500px]" modal={<WalletConnectors />}>
        <Button look="hype" size="lg" {...props}>
          Connect wallet
        </Button>
      </Modal>
    );
  return children;
}
