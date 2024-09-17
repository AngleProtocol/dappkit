import { generateRadixColors } from "@/color";
import type { Coloring } from "./variables";

/**
 * Shorthand to create a coloring object as a one-line
 * @returns a coloring
 */
export function createColoring(
  dark: [main: string, accent: string],
  light: [main: string, accent: string],
): Coloring {
  const [mainDark, accentDark] = dark;
  const [mainLight, accentLight] = light;

  return {
    dark: {
      main: mainDark,
      accent: accentDark,
    },
    light: {
      main: mainLight,
      accent: accentLight,
    },
  };
}

/**
 * Extracts the color scales from the theme's base colors
 * @returns a color array of 12 for each mode (dark, light)
 */
export function extractColorScale(theme: Coloring) {
  const [darkOutput, lightOutput] = (["dark", "light"] as const).map((mode) =>
    generateRadixColors({
      appearance: mode,
      accent: theme[mode].accent,
      gray: theme[mode].main,
      background: theme[mode].main,
    }),
  );

  const extract = ({
    accentScale: accent,
    grayScale: main,
  }: typeof darkOutput | typeof lightOutput) => ({ accent, main });

  return [extract(darkOutput), extract(lightOutput)] satisfies [
    ReturnType<typeof extract>,
    ReturnType<typeof extract>,
  ];
}

/**
 * Assigns color scales to the corresponding css variables
 * @returns returns css variables for each mode (dark, light) and each color (main, accent)
 */
export function reduceColorIntoVariables(
  theme: Coloring,
  mainVarName = "main",
  accentVarName = "accent",
) {
  const [dark, light] = extractColorScale(theme);

  const assignToVariable = <N extends string>(name: N, scale: (typeof dark)["accent" | "main"]) =>
    scale.reduce(
      (obj, color, index) => Object.assign(obj, { [`--${name}-${index + 1}`]: color }),
      {} as { [I in 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 as `--${N}-${I}`]: string },
    );

  return {
    dark: {
      accent: assignToVariable(accentVarName, dark.accent),
      main: assignToVariable(mainVarName, dark.main),
    },
    light: {
      accent: assignToVariable(accentVarName, light.accent),
      main: assignToVariable(mainVarName, light.main),
    },
  };
}
