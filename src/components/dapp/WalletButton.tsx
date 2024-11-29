import Dropdown from "../extenders/Dropdown";
import Group from "../extenders/Group";
import Button, { type ButtonProps } from "../primitives/Button";
import Divider from "../primitives/Divider";
import Image from "../primitives/Image";
import Text from "../primitives/Text";
import { Format } from "../../utils/format";
import Modal from "../extenders/Modal";
import Icon from "../primitives/Icon";
import WalletConnectors from "./WalletConnectors";
import { useWalletContext } from "../../context/Wallet.context";
import Select from "../extenders/Select";
import { useMemo } from "react";
import Hash from "../primitives/Hash";

export type WalletButton = ButtonProps;

export default function WalletButton(props: ButtonProps) {
  const {
    address,
    disconnect,
    connected,
    connector,
    chainId,
    switchChain,
    chains,
  } = useWalletContext();

  const chainOptions = useMemo(() => {
    if (!chains) return [];
    return chains.reduce((obj, chain) => {
      obj[chain.id] = <>{chain.name}</>;
      return obj;
    }, {});
  }, [chains]);

  const chain = useMemo(
    () => chains.find(({ id }) => id === chainId),
    [chains, chainId]
  );

  if (!connected)
    return (
      <Modal
        title="Connect Wallet"
        description="Available wallets"
        className="mx-auto w-full max-w-[500px]"
        modal={<WalletConnectors />}
      >
        <Button look="hype" size="lg">
          Connect wallet
        </Button>
      </Modal>
    );

  return (
    <>
      <Select
        state={[chainId, (c) => switchChain(+c)]}
        options={chainOptions}
      />
      <Dropdown
        size="lg"
        padding="xs"
        content={
          <>
            <Group className="items-center" size="lg">
              <Image className="h-lg*2 w-lg*2" src={connector?.icon} />
              <Hash size="lg" copy format="short">
                {address}
              </Hash>
              <Button
                look="soft"
                coloring={"harm"}
                onClick={disconnect}
                size="lg"
              >
                <Icon remix="RiShutDownLine" />
              </Button>
            </Group>
            <Group className="items-center">
              <Text size="sm">Connected with {connector?.name}</Text>
            </Group>
            <Divider horizontal className="border-main-6 mt-4" />
            <Group className="flex-col items-start">
              <Button size="sm" look="soft">
                Explorer
              </Button>
              <Button to={`/user/${address}`} size="sm" look="soft">
                Dashboard
              </Button>
            </Group>
          </>
        }
      >
        <Button look="tint">{Format.address(address, "short")}</Button>
      </Dropdown>
    </>
  );
}
