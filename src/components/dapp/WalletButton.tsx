import Dropdown from "../extenders/Dropdown";
import Group from "../extenders/Group";
import Button, { type ButtonProps } from "../primitives/Button";
import Divider from "../primitives/Divider";
import Image from "../primitives/Image";
import Text from "../primitives/Text";
import Title from "../primitives/Title";
import useWallet from "../../hooks/useWalletState";
import { Format } from "../../utils/format";
import Modal from "../extenders/Modal";
import Icon from "../primitives/Icon";
import WalletConnectors from "./WalletConnectors";

export type WalletButton = ButtonProps;

export default function WalletButton(props: ButtonProps) {
  const { address, disconnect, connected, connector } = useWallet();

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
      // <Dropdown
      //   content={
      //     <>
      //       <Title h={3}>Connect</Title>
      //       <Text>Choose amongst detected wallets.</Text>
      //       <WalletConnectors />
      //     </>
      //   }>
      //   <Button {...props}>{"Connect"}</Button>
      // </Dropdown>
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
