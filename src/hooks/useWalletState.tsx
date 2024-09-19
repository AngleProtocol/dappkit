import { useState } from "react";
import { http, createConfig, useAccount, useConfig, useConnect, useDisconnect } from "wagmi";
import { type Chain, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    coinbaseWallet(),
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

  const [chainId] = useState<Chain["id"]>();
  const [blockNumber] = useState<number>();

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
