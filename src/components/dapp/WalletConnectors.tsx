import { useWalletContext } from "src/context/Wallet.context";
import Group from "src/extenders/Group";
import Button from "src/primitives/Button";
import Divider from "src/primitives/Divider";
import Image from "src/primitives/Image";
import Input from "src/primitives/Input";
import Text from "src/primitives/Text";
import { useAccount, useConfig } from "wagmi";

export default function WalletConnectors() {
  const { config, connect, address} = useWalletContext();

  return (
    <Group className="flex-col w-full min-w-[300px]">
      {config.connectors.map((connector) => {
        return (
          <Button onClick={() => connect(connector.id)} key={connector.id}>
            <Image
              className="h-8 w-8 rounded-md"
              alt={connector.name}
              src={connector.icon}
              fallback="WC"
            />
            {connector.name}
          </Button>
        );
      })}
      <Divider horizontal className="border-main-6"/>
      <Text>Spy</Text>
      <Input placeholder="Address" />
    </Group>
  );
}
