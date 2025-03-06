import { useMemo } from "react";
import { Button, type ButtonProps, Icon, Modal, WalletConnectors } from "../..";
import { useWalletContext } from "../../context/Wallet.context";

export type ConnectedProps = ButtonProps & {
  hideSpyMode?: boolean;
  chain?: number;
};

export default function Connected({ hideSpyMode = false, children, chain: onlyOnChain, ...props }: ConnectedProps) {
  const { switchChain, chains, chainId, connected } = useWalletContext();
  const chain = useMemo(() => {
    return chains?.find(({ id }) => id === onlyOnChain);
  }, [chains, onlyOnChain]);

  if (chain && chainId !== onlyOnChain)
    return (
      <Button look="hype" size="md" {...props} onClick={() => switchChain(onlyOnChain)}>
        Switch to {chain.name}
      </Button>
    );
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
