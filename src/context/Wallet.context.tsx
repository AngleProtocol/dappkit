import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useContext } from "react";
import { type ResolvedRegister, WagmiProvider } from "wagmi";
import useWalletState from "../hooks/useWalletState";
import React from 'react'

export type WalletContextType = ReturnType<typeof useWalletState>;

const WalletContext = React.createContext<WalletContextType | null>(null);
const queryClient = new QueryClient();

export function useWalletContext() {
  const data = useContext(WalletContext);

  // eslint-disable-next-line no-throw-literal
  if (data === null) throw "useDataContext should only be used as child of DataProvider";
  return data;
}

export type WalletProviderProps = {
  config: ResolvedRegister["config"];
};

function WalletStateProvider({ children }: PropsWithChildren) {
  const walletState = useWalletState();

  return <WalletContext.Provider value={walletState}>{children}</WalletContext.Provider>;
}

export function WalletProvider({ config, children }: PropsWithChildren<WalletProviderProps>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletStateProvider>{children}</WalletStateProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
