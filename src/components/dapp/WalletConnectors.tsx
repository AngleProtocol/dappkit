import Group from "src/extenders/Group";
import Button from "src/primitives/Button";
import Image from "src/primitives/Image";
import { useConfig } from "wagmi";

export default function WalletConnectors() {
  const config = useConfig();

  return (
    <Group className="flex-col max-w-full w-[300px]">
      {config.connectors.map((connector) => {
        console.log(connector);

        return (
          <Button
            onClick={async () => {
              console.log("ogs");
              await connector.connect({ chainId: 1, isReconnecting: true });
              console.log("go");
            }}
            key={connector.id}
          >
            <Image className="h-8 w-8 rounded-md" alt={connector.name} src={connector.icon} fallback="WC"/>
            {connector.name}
          </Button>
        );
      })}
    </Group>
  );
}
