import Modal from "src/extenders/Modal";
import useWallet from "src/hooks/useWalletState";
import Button, { type ButtonProps } from "src/primitives/Button";
import WalletConnectors from "./WalletConnectors";
import { useMemo } from "react";
import Select from "src/extenders/Select";
import Dropdown from "src/extenders/Dropdown";
import Title from "src/primitives/Title";
import Text from "src/primitives/Text";
import { Format } from "src/utils/format";
import Icon from "src/primitives/Icon";
import Group from "src/extenders/Group";
import Image from "src/primitives/Image";

export type WalletButton = ButtonProps;

export default function WalletButton(props: ButtonProps) {
  const { address, connected, connect, disconnect, connector, chainId } = useWallet();

  const description = useMemo(() => {
    if (address) return `Connected as ${address}`;
    return "Choose a wallet to connect with";
  }, [address]);

  if (!connected)
    return (
      <Dropdown
        content={
          <>
            <Title h={3}>Connect</Title>
            <Text>Choose amongst detected wallets.</Text>
            <WalletConnectors />
          </>
        }
      >
        <Button look="bold" size="sm">
          {"Connect"}
        </Button>
      </Dropdown>
    );

  return (
    <>
      <Dropdown
        content={
          <>
            <Title h={3}>
              <Group className="items-center">
                <Image className="h-5" src={connector?.icon} />
                {Format.address(address, "short")}
                <Button size="xs">copy</Button>
                <Button onClick={disconnect} size="xs">
                  disconnect
                </Button>
              </Group>
            </Title>
            <Group className="items-center">
              <Text size="xs">Connected with {connector?.name}</Text>
            </Group>
          </>
        }
      >
        <Button look="bold" size="sm">{Format.address(address, "short")}</Button>
      </Dropdown>
    </>
  );
}
