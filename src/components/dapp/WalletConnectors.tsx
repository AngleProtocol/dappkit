import { useMemo } from "react";
import type { Connector } from "wagmi";
import walletCoinbaseIcon from "../../assets/walletCoinbase.svg";
import walletConnectIcon from "../../assets/walletConnect.svg";
import { useWalletContext } from "../../context/Wallet.context";
import Group from "../extenders/Group";
import Button from "../primitives/Button";
import Divider from "../primitives/Divider";
import Icon from "../primitives/Icon";
import Image from "../primitives/Image";
import Input from "../primitives/Input";
import Text from "../primitives/Text";

export default function WalletConnectors({ hideSpyMode = false }) {
  const { config, connect, connector: _connected, hiddenInjectedWallets } = useWalletContext();

  const sortedConnectors = useMemo(
    () =>
      [...config.connectors]
        .sort((a, b) => {
          const priority = (connector: Connector) => {
            switch (connector.name.toLowerCase()) {
              case "metamask":
                return 0;
              case "rabby wallet":
                return 1;
              case "walletconnect":
                return 2;
              default:
                return 3;
            }
          };
          return priority(a) - priority(b);
        })
        .filter(
          ({ name }) => !hiddenInjectedWallets?.length || !hiddenInjectedWallets?.some(n => name.toLowerCase() === n),
        ),
    [config.connectors, hiddenInjectedWallets],
  );

  return (
    <Group className="flex-col w-full">
      <div className="grid grid-flow-row gap-lg">
        {sortedConnectors.map(connector => {
          return (
            <Button
              look="base"
              onClick={() => connect(connector.id)}
              size="xl"
              bold
              className="gap-sm*2"
              key={connector.id}>
              <Image
                className="h-lg*2 w-lg*2 rounded-full overflow-hidden"
                alt={connector.name}
                src={overrideIcons(connector)}
                fallback=""
              />
              {connector.name}
              <Icon remix="RiArrowRightUpLine" />
            </Button>
          );
        })}
      </div>
      {!hideSpyMode && (
        <>
          <Divider horizontal look="soft" className="my-xl" />
          <Text size={5} look="soft">
            Spy address
          </Text>
          <Input
            look="tint"
            size="lg"
            placeholder="Address"
            suffix={<Icon className="text-main-12" remix="RiSearchLine" />}
          />
        </>
      )}
    </Group>
  );
}

const overrideIcons = (connector: Connector) => {
  switch (connector.name.toLowerCase()) {
    case "coinbase wallet":
      return walletCoinbaseIcon;
    case "walletconnect":
      return walletConnectIcon;
    default:
      return connector.icon;
  }
};
