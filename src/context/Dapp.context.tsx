import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext } from "react";
import useDAppState from "src/hooks/useDAppState";
import { ResolvedRegister, WagmiProvider } from "wagmi";
import { WalletProvider } from "./Wallet.context";
import ThemeProvider from "./Theme.context";

export type DAppContextType = ReturnType<typeof useDAppState>;

const DAppContext = createContext<DAppContextType>(null);
const queryClient = new QueryClient();

export function useDAppContext() {
  const data = useContext(DAppContext);

  // eslint-disable-next-line no-throw-literal
  if (data === null) throw "useDAppContext should only be used as child of DAppProvider";
  return data;
}

export type DAppProviderProps = {
  config: ResolvedRegister["config"];
};

export function DAppProvider({ config, children }: PropsWithChildren<DAppProviderProps>) {
  return (
    <ThemeProvider>
      <WalletProvider config={config}>{children}</WalletProvider>
    </ThemeProvider>
  );
}
