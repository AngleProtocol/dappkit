import Group from "../../components/extenders/Group";
import Button from "../../components/primitives/Button";
import Divider from "../../components/primitives/Divider";
import Image from "../../components/primitives/Image";
import Input from "../../components/primitives/Input";
import Text from "../../components/primitives/Text";
import { useWalletContext } from "../../context/Wallet.context";

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
              size="xl"
              key={connector.id}>
              <Image className="h-lg*2 w-lg*2 rounded-md" alt={connector.name} src={connector.icon} fallback="WC" />
              {connector.name}
            </Button>
          );
        })}
      </div>
      <Divider horizontal className="border-main-6" />
      <Text>Spy</Text>
      <Input size="sm" placeholder="Address" />
    </Group>
  );
}
