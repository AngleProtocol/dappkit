import { type ReactNode, useMemo } from "react";
import { useWalletContext } from "../../context/Wallet.context";
import { Fmt } from "../../utils/formatter.service";
import Dropdown from "../extenders/Dropdown";
import Group from "../extenders/Group";
import Modal from "../extenders/Modal";
import Button, { type ButtonProps } from "../primitives/Button";
import Divider from "../primitives/Divider";
import Hash from "../primitives/Hash";
import Icon from "../primitives/Icon";
import Image from "../primitives/Image";
import Text from "../primitives/Text";
import WalletConnectors from "./WalletConnectors";

export type WalletButtonProps = ButtonProps & {
  select?: ReactNode;
  connect?: ReactNode;
  status?: ReactNode;
  hideSpyMode?: boolean;
};

export default function WalletButton({ select, connect, status, hideSpyMode = false, ...props }: WalletButtonProps) {
  const { address, disconnect, connected, connector, chainId, chains } = useWalletContext();

  const connectedChain = useMemo(() => {
    if (!chainId) return null;
    return chains.find(chain => chain.id === chainId);
  }, [chainId, chains]);

  if (!connected)
    return (
      <Modal
        title="CONNECT WALLET"
        className="mx-auto w-full max-w-[500px]"
        modal={<WalletConnectors hideSpyMode={hideSpyMode} />}>
        {connect || (
          <Button look="hype" size="lg" {...props}>
            Connect
          </Button>
        )}
      </Modal>
    );

  return (
    <>
      <Dropdown
        size="lg"
        padding="xs"
        content={
          <>
            <Group className="items-center justify-between" size="xl">
              <Group className="items-center">
                {/* TODO: Show the account icon by default if there is no ENS icon */}
                <Icon className="text-main-11 h-lg*2 w-lg*2 " src={connectedChain?.icon} />
                <Hash size="lg" bold copy format="short">
                  {address}
                </Hash>
              </Group>
              <Button look="soft" onClick={disconnect} className="bg-main-5 !p-sm">
                <Icon className="text-main-11" remix="RiShutDownLine" />
              </Button>
            </Group>
            <Divider horizontal look="soft" />
            <Group className="items-center">
              <Text size="sm">Connected with {connector?.name}</Text>
              <Image className="h-lg*2 w-lg*2" src={connector?.icon} />
            </Group>
            <Group className="flex-col items-start">{props.children}</Group>
          </>
        }>
        {status || (
          <Button look="hype" size="lg" className="w-full justify-center">
            <Icon className="text-main-11 h-md*2 w-md*2" src={connectedChain?.icon} />
            {Fmt.address(address, "short")}
          </Button>
        )}
      </Dropdown>
    </>
  );
}
