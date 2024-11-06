import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  type Theme,
  type Themes,
  reduceColorIntoVariables,
} from "../theming/coloring";
import { reduceSpacingIntoVariables } from "../theming/spacing";

const ThemeContext = createContext<ReturnType<typeof useThemeState> | null>(
  null
);

function useThemeState(themes: Themes) {
  const [theme, setTheme] = useState<string>(Object.keys(themes ?? {})[0]);
  const [mode, setMode] = useState<"dark" | "light">("dark");

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
              }
            ),
          }),
        {} as {
          [label: string]: {
            [S in keyof Theme]: ReturnType<typeof reduceColorIntoVariables>;
          };
        }
      ),
    [themes]
  );

  const vars = useMemo(() => {
    const colors = variables?.[theme]?.base?.[mode];
    const spacing = reduceSpacingIntoVariables(
      { xs: 2, sm: 4, md: 8, lg: 12, xl: 16 },
      "spacing"
    );
    const radius = reduceSpacingIntoVariables(
      { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
      "radius"
    );

    return Object.assign({}, colors.accent, colors.main, colors.background, spacing, radius);
  }, [mode, theme, variables]);

  return {
    theme,
    setTheme,
    vars,
    variables,
    themes,
    mode,
    setMode,
    toggleMode: () => setMode((m) => (m === "dark" ? "light" : "dark")),
  };
}

export type ThemeProviderProps = PropsWithChildren<{ themes: Themes }>;
export default function ThemeProvider({
  themes,
  children,
}: ThemeProviderProps) {
  const value = useThemeState(themes);

  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={value?.theme} data-mode={value?.mode} style={value?.vars} className="bg-background h-[100vh] overflow-auto">
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
