import { useState } from "react";
import { http, createConfig, useConfig, useAccount, useConnect, useDisconnect } from "wagmi";
import { Chain, mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    walletConnect({
      customStoragePrefix: "wagmi",
      projectId: "26c912aadd2132cd869a5edc00aeea0f",
      metadata: {
        name: "Example",
        description: "Example website",
        url: "https://example.com",
        icons: [],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export default function useWalletState() {
  const config = useConfig();
  const wagmiConnect = useConnect();
  const wagmiDisconnect = useDisconnect();
  const account = useAccount();

  const [address, setAddress] = useState<string>();

  const [chainId, setChainId] = useState<Chain["id"]>();
  const [blockNumber, setblockNumber] = useState<number>();

  const [connected, setConnected] = useState<boolean>();

  async function connect(connectorId: string) {
    const connector = config.connectors.find(({ id }) => id === connectorId);

    if (!connector) return;

    wagmiConnect.connect({ connector });
  }

  async function disconnect() {
    wagmiDisconnect.disconnect();
  }

  return {
    chainId,
    blockNumber,
    address: account.address,
    connected: account.isConnected,
    connector: account.connector,
    connect,
    config,
    disconnect,
  };
}
