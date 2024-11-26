import Dropdown from "../extenders/Dropdown";
import Group from "../extenders/Group";
import Button, { type ButtonProps } from "../primitives/Button";
import Divider from "../primitives/Divider";
import Image from "../primitives/Image";
import Text from "../primitives/Text";
import Title from "../primitives/Title";
import { Format } from "../../utils/format";
import Modal from "../extenders/Modal";
import Icon from "../primitives/Icon";
import WalletConnectors from "./WalletConnectors";
import List from "../primitives/List";
import { useWalletContext } from "../../context/Wallet.context";
import Select from "../extenders/Select";
import { useMemo } from "react";

export type WalletButton = ButtonProps;

export default function WalletButton(props: ButtonProps) {
  const { address, disconnect, connected, connector, chainId, switchChain, chains } = useWalletContext();


  const chainOptions = useMemo(()=> chains?.reduce(
    (obj, chain) =>
      Object.assign(obj, {
        [chain.id]: (
          <>
            <Icon size="sm" src={chain?.icon} />
            {chain.name}
          </>
        ),
      }),
    {},
  ) ?? [], [chains]);

  const chain = useMemo(() => chains.find(({id}) => id === chainId), [chains, chainId]);

  if (!connected)
    return (
      <Modal
        title="Connect Wallet"
        description="Available wallets"
        className="mx-auto w-full max-w-[500px]"
        modal={
          <>
            <WalletConnectors />
          </>
        }>
        <Button look="hype">Connect</Button>
      </Modal>
    );

  return (
    <>
      <Select state={[chainId, (c) => switchChain(+c)]} options={chainOptions}/>
      <Dropdown
        content={
          <>
            <Title h={3}>
              <Group className="items-center">
                <Image className="h-5" src={connector?.icon} />
                {Format.address(address, "short")}
                <Button size="xs">
                  <Icon size="sm" remix="RiFileCopyFill" />
                </Button>
                <Button coloring={"harm"} onClick={disconnect} size="xs">
                  <Icon size="sm" remix="RiShutDownLine" />
                </Button>
              </Group>
            </Title>
            <Group className="items-center">
              <Text size="xs">Connected with {connector?.name}</Text>
            </Group>
            <Divider horizontal className="border-main-6 mt-4" />
            <Group className="items-center flex-col [&>*]:w-full">
              <Button size="sm" look="soft">
                Explorer
              </Button>
              <Button to={`/user/${address}`} size="sm" look="soft">
                Dashboard
              </Button>
            </Group>
          </>
        }>
        <Button look="tint">{Format.address(address, "short")}</Button>
      </Dropdown>
    </>
  );
}
