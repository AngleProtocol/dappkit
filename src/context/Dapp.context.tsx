import { type PropsWithChildren, useContext } from "react";
import type { ResolvedRegister } from "wagmi";
import { demoThemes } from "../config/themes";
import ThemeProvider from "./Theme.context";
import { WalletProvider } from "./Wallet.context";
import React from 'react'

export type DAppContextType = { flag?: string };

const DAppContext = React.createContext<DAppContextType | null>(null);

export function useDAppContext() {
  const data = useContext(DAppContext);

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
