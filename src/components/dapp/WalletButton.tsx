import { type ReactNode, useMemo } from "react";
import { useWalletContext } from "../../context/Wallet.context";
import { Fmt } from "../../utils/formatter.service";
import Dropdown from "../extenders/Dropdown";
import Group from "../extenders/Group";
import Modal from "../extenders/Modal";
import Select from "../extenders/Select";
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

export default function WalletButton({
  select,
  connect,
  status,
  hideSpyMode = false,
  ...props
}: WalletButtonProps) {
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
    }, {} as { [chainId: number]: ReactNode });
  }, [chains]);

  if (!connected)
    return (
      <Modal
        title="CONNECT WALLET"
        className="mx-auto w-full max-w-[500px]"
        modal={<WalletConnectors hideSpyMode />}
      >
        {connect || (
          <Button look="hype" size="md" {...props}>
            Connect
          </Button>
        )}
      </Modal>
    );

  return (
    <>
      {select || (
        <Select
          state={[chainId, (c) => switchChain(+c)]}
          options={chainOptions}
        />
      )}
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
            <Group className="flex-col items-start">{props.children}</Group>
          </>
        }
      >
        {status || (
          <Button look="tint" className="w-full justify-center">
            {Fmt.address(address, "short")}
          </Button>
        )}
      </Dropdown>
    </>
  );
}
