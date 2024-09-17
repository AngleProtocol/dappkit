import { type PropsWithChildren, createContext, useContext, useMemo, useState } from "react";
import { type Theme, themes } from "../utils/theming";
import { reduceColorIntoVariables } from "@/theming/coloring";
import { reduceSpacingIntoVariables } from "@/theming/spacing";

const ThemeContext = createContext<ReturnType<typeof useThemeState> | null>(null);

function useThemeState() {
  const [theme, setTheme] = useState<string>("merkl");
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const vars = useMemo(() => {
    const _theme = themes[theme];

    const colors = reduceColorIntoVariables({
      dark: { accent: "#FC72FF", main: "#3D3D3D" },
      light: { accent: "#FC72FF", main: "#131313" },
    });
    const spacing = reduceSpacingIntoVariables({ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }, "spacing");
    const radius = reduceSpacingIntoVariables({ xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }, "radius");

    return Object.assign({}, colors[mode].accent, colors[mode].main, spacing, radius);
  }, [theme, mode]);

  return { theme, setTheme, vars, themes, mode, setMode };
}

export default function ThemeProvider(props: PropsWithChildren) {
  const value = useThemeState();

  return (
    <ThemeContext.Provider value={value}>
      <div style={value?.vars} className="bg-main-1 h-full overflow-y-scroll">
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
