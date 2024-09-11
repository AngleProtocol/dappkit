import Modal from "src/extenders/Modal";
import useWallet from "src/hooks/useWalletState";
import Button, { ButtonProps } from "src/primitives/Button";
import WalletConnectors from "./WalletConnectors";

export type WalletButton = ButtonProps;

export default function WalletButton(props: ButtonProps) {
  const { connect } = useWallet();

  return (
    <>
      <Modal title="Connect Wallet" content={<WalletConnectors />}>
        <Button onClick={connect} {...props}>
          Connect
        </Button>
      </Modal>
    </>
  );
}
