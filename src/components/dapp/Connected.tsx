import { Button, type ButtonProps, Icon, Modal, WalletConnectors } from "../..";
import { useWalletContext } from "../../context/Wallet.context";

export type ConnectedProps = ButtonProps & {
  hideSpyMode?: boolean;
};

export default function Connected({ hideSpyMode = false, children, ...props }: ConnectedProps) {
  const { connected } = useWalletContext();

  if (!connected)
    return (
      <Modal
        title="Connect Wallet"
        className="mx-auto w-full max-w-[500px]"
        modal={<WalletConnectors hideSpyMode={hideSpyMode} />}>
        <Button look="hype" size="md" {...props}>
          Connect Wallet <Icon remix="RiArrowRightUpLine" />
        </Button>
      </Modal>
    );
  return children;
}
