import type { PropsWithChildren } from "react";
import type { Coloring, State } from "../../theming/variables";
import useThemedVariables from "./useThemedVariables";

export type OverrideThemeProps = {
  coloring?: Coloring | State;
  accent?: Coloring | State;
  mode?: "dark" | "light";
};

/**
 *
 * @param coloring applies a whole
 * @returns
 */
export default function OverrideTheme({ coloring, accent, mode, children }: PropsWithChildren<OverrideThemeProps>) {
  const vars = useThemedVariables(coloring, accent, mode);

  return <div style={vars}>{children}</div>;
}
