import { switchChain as wagmiCoreSwitchChain } from "@wagmi/core";
import { useState } from "react";
import { useAccount, useConfig, useConnect, useDisconnect } from "wagmi";

//TODO: remove merkl-related typings in favor of redeclarations for better abstraction
import type { Chain, Explorer } from "@merkl/api";

export default function useWalletState(chains: (Chain & { explorers: Explorer[] })[]) {
  const config = useConfig();
  const wagmiConnect = useConnect();
  const wagmiDisconnect = useDisconnect();
  const account = useAccount();

  const [blockNumber] = useState<number>();

  async function connect(connectorId: string) {
    const connector = config.connectors.find(({ id }) => id === connectorId);

    if (!connector) return;

    wagmiConnect.connect({ connector });
  }

  async function disconnect() {
    wagmiDisconnect.disconnect();
  }

  async function switchChain(chainId: number) {
    wagmiCoreSwitchChain(config, { chainId });
  }

  return {
    config,
    chains,
    chainId: account.chainId,
    switchChain,
    blockNumber,
    address: account.address,
    connected: account.isConnected,
    connector: account.connector,
    connect,
    disconnect,
  };
}
