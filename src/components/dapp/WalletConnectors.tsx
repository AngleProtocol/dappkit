import { useWalletContext } from "../../context/Wallet.context";
import Group from "../extenders/Group";
import Button from "../primitives/Button";
import Divider from "../primitives/Divider";
import Image from "../primitives/Image";
import Input from "../primitives/Input";
import Text from "../primitives/Text";

export default function WalletConnectors() {
  const { config, connect, connector: connected } = useWalletContext();

  return (
    <Group className="flex-col w-full">
      <div className="grid grid-flow-row gap-sm">
        {config.connectors.map(connector => {
          return (
            <Button
              look={connected?.id === connector.id ? "hype" : "bold"}
              onClick={() => connect(connector.id)}
              size="lg"
              key={connector.id}>
              <Image className="h-lg*2 w-lg*2 rounded-md" alt={connector.name} src={connector.icon} fallback="WC" />
              {connector.name}
            </Button>
          );
        })}
      </div>
      <Divider horizontal look="soft" />
      <Text>Spy</Text>
      <Input size="sm" placeholder="Address" />
    </Group>
  );
}
