import { useMemo } from "react";
import { useTheme } from "../../context/Theme.context";
import { type Theme, reduceColorIntoVariables } from "../../theming/coloring";
import type { Coloring, State } from "../../theming/variables";

export default function useThemedVariables(
  coloring?: Coloring | State,
  accent?: Coloring | State,
  _mode?: "dark" | "light"
) {
  const { mode: contextMode, theme, variables } = useTheme();
  const mode = _mode ?? contextMode;

  const vars = useMemo(() => {
    if (!coloring && !!_mode)
      return Object.assign(
        {},
        variables?.[theme]?.base?.[mode].accent,
        variables?.[theme]?.base?.[mode].main
      );

    if (!coloring && !accent) return {};

    const currentTheme = (t: keyof Theme) => variables?.[theme]?.[t]?.[mode];

    if (accent && typeof accent === "string")
      return currentTheme(accent).accent;
    if (coloring && typeof coloring === "string")
      return Object.assign(
        {},
        currentTheme(coloring).accent,
        currentTheme(coloring).main
      );

    if (coloring) {
      const v = reduceColorIntoVariables(coloring);

      return Object.assign({}, v[mode]?.accent, v[mode]?.main);
    }
  }, [mode, theme, variables, coloring, accent]);

  return vars;
}
