import Modal from "src/extenders/Modal";
import useWallet from "src/hooks/useWalletState";
import Button, { type ButtonProps } from "src/primitives/Button";
import WalletConnectors from "./WalletConnectors";
import { useMemo } from "react";

export type WalletButton = ButtonProps;

export default function WalletButton(props: ButtonProps) {
  const { address, connect } = useWallet();

  const description = useMemo(() => {
    if (address) return `Connected as ${address}`;
    return "Choose a wallet to connect with";
  }, [address]);

  return (
    <>
      <Modal title="Connect Wallet" description={description} content={<WalletConnectors />}>
        <Button {...props}>{address ?? "Connect"}</Button>
      </Modal>
    </>
  );
}
