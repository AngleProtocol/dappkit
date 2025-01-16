import { getWalletClient, switchChain as wagmiCoreSwitchChain } from "@wagmi/core";
import { useCallback, useEffect, useState } from "react";
import { type Config, useAccount, useConfig, useConnect, useDisconnect } from "wagmi";

//TODO: remove merkl-related typings in favor of redeclarations for better abstraction
import type { Chain, Explorer } from "@merkl/api";
import { http, type WalletClient, createPublicClient, createWalletClient, custom } from "viem";
import { eip712WalletActions, zksync } from "viem/zksync";
import 'viem/window';

export type WalletOptions = {
  sponsorTransactions?: boolean;
  hideInjectedWallets?: string[];
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
  const [hiddenInjectedWallets] = useState(options?.hideInjectedWallets);

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
      if (sponsorTransactions && tx[0].chain?.id === zksync.id) {
        const nonce = await createPublicClient({
          chain: client.chain,
          transport: http(),
        });

        const payload = {
          account: account.address,
          chain: zksync,
          to: `${tx[0].to}` as `0x${string}`,
          from: account.address,
          value: BigInt(tx[0].value ?? "0"),
          gas: tx[0].gas ? BigInt(tx[0].gas ?? "0") : undefined,
          gasPerPubdata: tx[0].gasPerPubdata ? BigInt(tx[0].gasPerPubdata) : undefined,
          maxPriorityFeePerGas: BigInt(0),
          maxFeePerGas: tx[0].maxFeePerGas ? BigInt(tx[0].maxFeePerGas) : undefined,
          nonce: await nonce.getTransactionCount({ address: account.address }),
          data: tx[0].data,
          kzg: undefined,
          paymaster: tx[0].paymaster,
          paymasterInput: tx[0].paymasterInput,
        };

        return createWalletClient({
          chain: zksync,
          transport: custom(window.ethereum!),
        })
          .extend(eip712WalletActions())
          .sendTransaction(payload);
      }
      return client.sendTransaction(...tx);
    },
    [client, options?.transaction, config, sponsorTransactions, account],
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
    hiddenInjectedWallets,
    connect,
    disconnect,
  };
}
