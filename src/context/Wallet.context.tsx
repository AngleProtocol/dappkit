import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, createContext, useContext } from "react";
import { type ResolvedRegister, WagmiProvider } from "wagmi";
import useWalletState from "../hooks/useWalletState";

//TODO: remove merkl-related typings in favor of redeclarations for better abstraction
import type { Chain, Explorer } from "@merkl/api";

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
};

function WalletStateProvider({
  children,
  chains,
}: PropsWithChildren & { chains: (Chain & { explorers: Explorer[] })[] }) {
  const walletState = useWalletState(chains);

  return <WalletContext.Provider value={walletState}>{children}</WalletContext.Provider>;
}

export function WalletProvider({ config, children, chains }: PropsWithChildren<WalletProviderProps>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletStateProvider chains={chains}>{children}</WalletStateProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
