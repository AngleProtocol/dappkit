//TODO: remove merkl-related typings in favor of redeclarations for better abstraction
import type { Chain, Explorer } from "@merkl/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, createContext, useContext } from "react";
import { type ResolvedRegister, WagmiProvider } from "wagmi";
import useWalletState, { type WalletOptions } from "../hooks/useWalletState";

export type WalletContextType = ReturnType<typeof useWalletState>;

const WalletContext = createContext<WalletContextType | null>(null);
const queryClient = new QueryClient();

export function useWalletContext() {
  const data = useContext(WalletContext);

  // eslint-disable-next-line no-throw-literal
  if (data === null) throw "useDataContext should only be used as child of DataProvider";
  return data;
}

export type WalletProviderProps = {
  config: ResolvedRegister["config"];
  chains: (Chain & { explorers: Explorer[] })[];
  walletOptions?: WalletOptions;
};

function WalletStateProvider({
  children,
  chains,
  options,
}: PropsWithChildren & { chains: (Chain & { explorers: Explorer[] })[]; options?: WalletOptions }) {
  const walletState = useWalletState(chains, options);

  return <WalletContext.Provider value={walletState}>{children}</WalletContext.Provider>;
}

export function WalletProvider({ config, children, chains, walletOptions }: PropsWithChildren<WalletProviderProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <WalletStateProvider options={walletOptions} chains={chains}>
          {children}
        </WalletStateProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
