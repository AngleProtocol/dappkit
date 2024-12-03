import type { Chain } from "@merkl/api";
import { type PropsWithChildren, createContext, useContext } from "react";
import type { ResolvedRegister } from "wagmi";
import { demoThemes } from "../config/themes";
import type { Mode, Spacing } from "../theming/variables";
import ThemeProvider, { type ThemeProviderProps } from "./Theme.context";
import { WalletProvider } from "./Wallet.context";

export type DAppContextType = { flag?: string };

const DAppContext = createContext<DAppContextType | null>(null);

export function useDAppContext() {
  const data = useContext(DAppContext);

  if (data === null) throw "useDAppContext should only be used as child of DAppProvider";
  return data;
}

export type DAppProviderProps = {
  config: ResolvedRegister["config"];
  themes?: ThemeProviderProps["themes"];
  sizing: Spacing;
  modes: Mode[];
  chains: Chain[];
};

export function DAppProvider({
  config,
  themes,
  sizing,
  modes,
  children,
  chains,
}: PropsWithChildren<DAppProviderProps>) {
  return (
    <ThemeProvider sizing={sizing} themes={themes ?? demoThemes} modes={modes}>
      <WalletProvider chains={chains} config={config}>
        {children}
      </WalletProvider>
    </ThemeProvider>
  );
}
