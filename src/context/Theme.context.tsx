import { type PropsWithChildren, createContext, useContext, useMemo, useState } from "react";
import { type Theme, themes } from "../utils/theming";

const ThemeContext = createContext<ReturnType<typeof useThemeState> | null>(null);

function useThemeState() {
  const [theme, setTheme] = useState<string>("merkl");
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const vars = useMemo(() => {
    const _theme = themes[theme];

    return Object.assign(
      Object.keys(themes[theme][mode]).reduce(
        (obj, key) =>
          Object.assign(
            obj,
            _theme[mode][key].reduce(
              (vars, color, index) => Object.assign(vars, { [`--${key}-${index + 1}`]: color }),
              {},
            ),
          ),
        {},
      ),
      _theme.radius.reduce(
        (vars, color, index) => Object.assign(vars, { [`--radius-${index + 1}`]: color }),
        {},
      ),
    );
  }, [theme, mode]);

  return { theme, setTheme, vars, themes, mode, setMode };
}

export default function ThemeProvider(props: PropsWithChildren) {
  const value = useThemeState();

  return (
    <ThemeContext.Provider value={value}>
      <div style={value?.vars} className="bg-main-1 h-full">
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) throw "Hook useTheme is not a child of ThemeProvider";
  return context;
}
