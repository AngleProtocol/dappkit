import { useMemo } from "react";
import { useWalletContext } from "../../context/Wallet.context";
import { Format } from "../../utils/format";
import Dropdown from "../extenders/Dropdown";
import Group from "../extenders/Group";
import Modal from "../extenders/Modal";
import Select from "../extenders/Select";
import Button, { type ButtonProps } from "../primitives/Button";
import Divider from "../primitives/Divider";
import Icon from "../primitives/Icon";
import Image from "../primitives/Image";
import Text from "../primitives/Text";
import WalletConnectors from "./WalletConnectors";
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
      obj[chain.id] = (
        <Group>
          <Icon src={chain?.icon} />
          {chain.name}
        </Group>
      );
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
            <Group className="items-center justify-between" size="xl">
              <Group className="items-center">
                {/* TODO: Show the account icon by default if there is no ENS icon */}
                <Icon
                  className="text-main-11 !w-xl*2 !h-xl*2"
                  remix="RiAccountCircleFill"
                />
                <Image className="h-lg*2 w-lg*2" src={connector?.icon} />
                <Hash size="lg" bold copy format="short">
                  {address}
                </Hash>
              </Group>
              <Button
                look="soft"
                onClick={disconnect}
                className="bg-main-5 !p-sm"
              >
                <Icon className="text-main-11" remix="RiShutDownLine" />
              </Button>
            </Group>
            <Divider horizontal look="soft" />
            <Group className="items-center">
              <Text size="sm">Connected with {connector?.name}</Text>
              <Image className="h-lg*2 w-lg*2" src={connector?.icon} />
            </Group>
            <Group className="flex-col items-start">
              <Button size="sm" look="soft">
                <Icon remix="RiArrowRightLine" /> Explorer
              </Button>
              <Button to={`/users/${address}`} size="sm" look="soft">
                Dashboard
              </Button>
            </Group>
          </>
        }
      >
        <Button look="tint" className="w-full justify-center">
          {Format.address(address, "short")}
        </Button>
      </Dropdown>
    </>
  );
}
