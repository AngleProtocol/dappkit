import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, createContext, useContext } from "react";
import { type ResolvedRegister, WagmiProvider } from "wagmi";
import ThemeProvider from "./Theme.context";
import { WalletProvider } from "./Wallet.context";
import { demoThemes } from "@/config/themes";

export type DAppContextType = unknown;

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
    <ThemeProvider themes={demoThemes}>
      <WalletProvider config={config}>{children}</WalletProvider>
    </ThemeProvider>
  );
}
