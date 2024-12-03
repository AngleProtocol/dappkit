import { useWalletContext } from "../../context/Wallet.context";
import Group from "../extenders/Group";
import Button from "../primitives/Button";
import Divider from "../primitives/Divider";
import Icon from "../primitives/Icon";
import Image from "../primitives/Image";
import Input from "../primitives/Input";
import Text from "../primitives/Text";

export default function WalletConnectors() {
  const { config, connect, connector: connected } = useWalletContext();

  return (
    <Group className="flex-col w-full">
      <div className="grid grid-flow-row gap-lg">
        {config.connectors.map((connector) => {
          return (
            <Button
              look="base"
              // look={connected?.id === connector.id ? "hype" : "bold"}
              onClick={() => connect(connector.id)}
              size="xl"
              bold
              className="gap-sm*2"
              key={connector.id}
            >
              <Image
                className="h-lg*2 w-lg*2 rounded-md"
                alt={connector.name}
                src={connector.icon}
                fallback="WC"
              />
              {connector.name}
              <Icon remix="RiArrowRightUpLine" />
            </Button>
          );
        })}
      </div>
      <Divider horizontal look="soft" className="my-xl" />
      <Text size={5} className="text-main-11">Spy address</Text>
      <Input
        size="lg"
        placeholder="Address"
        suffix={<Icon className="text-main-12" remix="RiSearchLine" />}
      />
    </Group>
  );
}
