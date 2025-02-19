import { generateRadixColors } from "../color";
import type { Coloring } from "./variables";

/**
 * Themes are a set of colorings to be applied in a theme context
 */
export type Theme = {
  base: Coloring;
  info: Coloring;
  good: Coloring;
  warn: Coloring;
  harm: Coloring;
};

export type Themes = { [name: string]: Theme };

/**
 * Shorthand to create a coloring object as a one-line
 * @returns a coloring
 */
export function createColoring(
  dark: [accent: string, gray: string, background: string],
  light: [accent: string, gray: string, background: string],
): Coloring {
  const [accentDark, grayDark, backgroundDark] = dark;
  const [accentLight, grayLight, backgroundLight] = light;

  return {
    dark: {
      accent: accentDark,
      gray: grayDark,
      background: backgroundDark,
    },
    light: {
      accent: accentLight,
      gray: grayLight,
      background: backgroundLight,
    },
  };
}

/**
 * Extracts the color scales from the theme's base colors
 * @returns a color array of 12 for each mode (dark, light)
 */
export function extractColorScale(theme: Coloring) {
  const [darkOutput, lightOutput] = (["dark", "light"] as const).map(mode =>
    generateRadixColors({
      appearance: mode,
      accent: theme[mode].accent,
      gray: theme[mode].gray,
      background: theme[mode].background ?? "blue",
    }),
  );

  const extract = ({ accentScale: accent, grayScale: gray, background }: typeof darkOutput | typeof lightOutput) => {
    // Convert background color to RGB components
    const getRGB = (color: string) => {
      const hex = color.replace("#", "");
      const r = Number.parseInt(hex.substring(0, 2), 16);
      const g = Number.parseInt(hex.substring(2, 4), 16);
      const b = Number.parseInt(hex.substring(4, 6), 16);
      return `${r} ${g} ${b}`;
    };

    return {
      accent,
      gray,
      background: getRGB(background),
    };
  };

  return [extract(darkOutput), extract(lightOutput)] satisfies [ReturnType<typeof extract>, ReturnType<typeof extract>];
}

/**
 * Assigns color scales to the corresponding css variables
 * @returns returns css variables for each mode (dark, light) and each color (accent, gray)
 */
export function reduceColorIntoVariables(theme: Coloring, accentVarName = "accent", grayVarName = "gray") {
  const [dark, light] = extractColorScale(theme);

  const assignToVariable = <N extends string>(name: N, scale: (typeof dark)["accent" | "gray"]) =>
    scale.reduce(
      (obj, color, index) => Object.assign(obj, { [`--${name}-${index + 1}`]: color }),
      {} as { [I in 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 as `--${N}-${I}`]: string },
    );

  return {
    dark: {
      accent: assignToVariable(accentVarName, dark.accent),
      gray: assignToVariable(grayVarName, dark.gray),
      background: { "--background": dark.background },
    },
    light: {
      accent: assignToVariable(accentVarName, light.accent),
      gray: assignToVariable(grayVarName, light.gray),
      background: { "--background": light.background },
    },
  };
}
