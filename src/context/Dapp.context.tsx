import { type PropsWithChildren, createContext, useContext } from "react";
import type { ResolvedRegister } from "wagmi";
import type { Mode } from "../theming/variables";
import ThemeProvider, { type ThemeProviderProps } from "./Theme.context";
import { WalletProvider } from "./Wallet.context";

//TODO: remove merkl-related typings in favor of redeclarations for better abstraction
import type { Chain, Explorer } from "@merkl/api";
import type { WalletOptions } from "../hooks/useWalletState";
import type { SizingConfig } from "../utils/tailwind";

export type DAppContextType = { flag?: string };

const DAppContext = createContext<DAppContextType | null>(null);

export function useDAppContext() {
  const data = useContext(DAppContext);

  if (data === null) throw "useDAppContext should only be used as child of DAppProvider";
  return data;
}

export type DAppProviderProps = {
  config: ResolvedRegister["config"];
  themes: ThemeProviderProps["themes"];
  sizing: SizingConfig;
  modes: Mode[];
  chains: (Chain & { explorers: Explorer[] })[];
  walletOptions?: WalletOptions;
};

export function DAppProvider({
  config,
  themes,
  sizing,
  modes,
  children,
  chains,
  walletOptions,
}: PropsWithChildren<DAppProviderProps>) {
  return (
    <ThemeProvider sizing={sizing} themes={themes} modes={modes}>
      <WalletProvider walletOptions={walletOptions} chains={chains.filter(({ id }) => id !== 1337)} config={config}>
        {children}
      </WalletProvider>
    </ThemeProvider>
  );
}
