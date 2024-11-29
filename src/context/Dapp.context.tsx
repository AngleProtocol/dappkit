import { type PropsWithChildren, createContext, useContext } from "react";
import type { ResolvedRegister } from "wagmi";
import { demoThemes } from "../config/themes";
import ThemeProvider, { ThemeProviderProps } from "./Theme.context";
import { WalletProvider } from "./Wallet.context";
import { Theme } from "../theming/coloring";
import { Chain } from "@angleprotocol/merkl-api";
import { Sizing } from "../utils/tailwind";
import { Mode, Spacing } from "../theming/variables";

export type DAppContextType = { flag?: string };

const DAppContext = createContext<DAppContextType | null>(null);

export function useDAppContext() {
  const data = useContext(DAppContext);

  if (data === null) throw "useDAppContext should only be used as child of DAppProvider";
  return data;
}

export type DAppProviderProps = {
  config: ResolvedRegister["config"];
  themes?: ThemeProviderProps["themes"]
  sizing: Spacing;
  modes: Mode[];
  chains: Chain[];
};

export function DAppProvider({ config, themes, sizing, modes, children, chains }: PropsWithChildren<DAppProviderProps>) {
  return (
    <ThemeProvider sizing={sizing} themes={themes ?? demoThemes} modes={modes}>
      <WalletProvider chains={chains} config={config}>
        {children}
      </WalletProvider>
    </ThemeProvider>
  );
}
