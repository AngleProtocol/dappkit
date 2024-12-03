import type { Chain } from "@merkl/api";
import { switchChain as wagmiCoreSwitchChain } from "@wagmi/core";
import { useState } from "react";
import { useAccount, useConfig, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import type { Chain as WagmiChain } from "wagmi/chains";

export default function useWalletState(chains: Chain[]) {
  const config = useConfig();
  const wagmiConnect = useConnect();
  const wagmiDisconnect = useDisconnect();
  const wagmiSwitchChain = useSwitchChain();
  const account = useAccount();

  const [chainId] = useState<WagmiChain["id"]>();
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
