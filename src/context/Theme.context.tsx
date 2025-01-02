import { type PropsWithChildren, createContext, useContext, useMemo, useState } from "react";
import { type Theme, type Themes, reduceColorIntoVariables } from "../theming/coloring";
import { reduceSpacingIntoVariables } from "../theming/spacing";
import type { Mode } from "../theming/variables";
import type { SizingConfig } from "../utils/tailwind";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "../components/primitives/Notifications";

const ThemeContext = createContext<ReturnType<typeof useThemeState> | null>(null);

function useThemeState(themes: Themes, sizing: SizingConfig, modes?: Mode[]) {
  const [theme, setTheme] = useState<string>(Object.keys(themes ?? {})[0]);
  const [mode, setMode] = useState<"dark" | "light">(modes?.[0] ?? "dark");

  const variables = useMemo(
    () =>
      Object.entries(themes ?? {}).reduce(
        (o, [label, theme]) =>
          Object.assign(o, {
            [label]: Object.entries(theme ?? {}).reduce(
              (_o, [state, coloring]) =>
                Object.assign(_o, {
                  [state]: reduceColorIntoVariables(coloring),
                }),
              {} as {
                [S in keyof Theme]: ReturnType<typeof reduceColorIntoVariables>;
              },
            ),
          }),
        {} as {
          [label: string]: {
            [S in keyof Theme]: ReturnType<typeof reduceColorIntoVariables>;
          };
        },
      ),
    [themes],
  );

  const vars = useMemo(() => {
    const colors = variables?.[theme]?.base?.[mode];
    const spacing = reduceSpacingIntoVariables(sizing.spacing, "spacing");
    const radius = reduceSpacingIntoVariables(sizing.radius, "radius");

    return Object.assign({}, colors.accent, colors.main, colors.background, spacing, radius);
  }, [mode, theme, variables, sizing]);

  return {
    theme,
    setTheme,
    vars,
    variables,
    themes,
    mode,
    setMode,
    toggleMode: () =>
      setMode(m => {
        const nextMode = m === "dark" ? "light" : "dark";

        if (modes && !modes.includes(nextMode)) return m;
        return nextMode;
      }),
  };
}

export type ThemeProviderProps = PropsWithChildren<{
  themes: Themes;
  sizing: SizingConfig;
  modes?: Mode[];
}>;
export default function ThemeProvider({ themes, sizing, modes, children }: ThemeProviderProps) {
  const value = useThemeState(themes, sizing, modes);

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-theme={value?.theme}
        data-mode={value?.mode}
        style={value?.vars}
        className="bg-background overflow-auto">
        <Notifications />
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) throw "Hook useTheme is not a child of ThemeProvider";
  return context;
}
