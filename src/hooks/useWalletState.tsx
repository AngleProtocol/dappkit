import { getWalletClient, switchChain as wagmiCoreSwitchChain } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react";
import { type Config, useAccount, useConfig, useConnect, useDisconnect } from "wagmi";

//TODO: remove merkl-related typings in favor of redeclarations for better abstraction
import type { Chain, Explorer } from "@merkl/api";
import type { WalletClient } from "viem";

export type WalletOptions = {
  sponsorTransactions?: boolean;
  client?: (c: WalletClient) => Promise<WalletClient>;
  transaction?: (
    tx: Parameters<WalletClient["sendTransaction"]>,
    context: { client: WalletClient; config: Config },
  ) => ReturnType<WalletClient["sendTransaction"]>;
};

export default function useWalletState(chains: (Chain & { explorers: Explorer[] })[], options?: WalletOptions) {
  const config = useConfig<Config>();
  const wagmiConnect = useConnect();
  const wagmiDisconnect = useDisconnect();
  const account = useAccount();

  const [blockNumber] = useState<number>();
  const [client, setClient] = useState<WalletClient>();
  const [sponsorTransactions, setSponsorTransactions] = useState(!!options?.sponsorTransactions);

  const wrapClient = useCallback(async () => {
    const _client = await getWalletClient<typeof config, 1>(config);

    return (await options?.client?.(_client)) ?? _client;
  }, [config, options?.client]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: required for correctness
  useEffect(() => {
    async function set() {
      setClient(await wrapClient());
    }

    set();
  }, [account, wrapClient]);

  const wrapTransaction = useCallback(
    async (tx: Parameters<WalletClient["sendTransaction"]>) => {
      if (!client) return;
      const configWrappedTx = await options?.transaction?.(tx, { client, config });

      if (configWrappedTx) return configWrappedTx;
      return client.sendTransaction(...tx);
    },
    [client, options?.transaction, config],
  );

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
    client,
    chainId: account.chainId,
    switchChain,
    blockNumber,
    sponsorTransactions,
    setSponsorTransactions,
    sendTransaction: wrapTransaction,
    address: account.address,
    connected: account.isConnected,
    connector: account.connector,
    connect,
    disconnect,
  };
}
