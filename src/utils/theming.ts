import * as Radix from "@radix-ui/colors";
import { generateRadixColors } from "../color";

export const createVariableScale = (name: string, size: number, noneValue = "transparent") =>
  [noneValue, ...new Array(size).fill(0).map((_, i) => `var(--${name}-${i + 1})`)].reduce(
    (res, variable, i) => Object.assign(res, { [i]: variable }),
    {},
  );

type RadixColor = keyof typeof Radix;
const scales = [
  "red",
  "blue",
  "redDark",
  "green",
  "amber",
  "violet",
  "violetDark",
  "sageDark",
  "sage",
  "blueDark",
  "crimsonDark",
  "slateDark",
  "slate",
] as const satisfies RadixColor[];

const aggregateColors = (scale: RadixColor) => {
  return Object.values(Radix[scale]).reduce((arr, color) => {
    arr.push(color);
    return arr;
  }, [] as string[]);
};

export const radixColors = scales.reduce(
  (palette, scale) => Object.assign(palette, { [scale]: aggregateColors(scale) }),
  {} as { [Scale in (typeof scales)[number]]: string[] },
);

const a = generateRadixColors({
  appearance: "dark",
  accent: "#1755F4",
  background: "black",
  gray: "black",
});

export const themes = {
  merkl: {
    light: { primary: radixColors.violet, main: radixColors.sage },
    dark: { primary: radixColors.violetDark, main: radixColors.sageDark },
    radius: ["4px", "8px", "12px", "16px", "18px", "24px"],
  },
  angle: {
    light: { primary: radixColors.red, main: radixColors.blue },
    dark: { primary: radixColors.sageDark, main: radixColors.blueDark },
    radius: ["2px", "4px", "8px", "12px", "18px", "24px"],
  },
  optimism: {
    light: { primary: radixColors.red, main: radixColors.slate },
    dark: { primary: radixColors.redDark, main: radixColors.slateDark },
    radius: ["2px", "4px", "8px", "12px", "18px", "24px"],
  },
  zksync: {
    light: { primary: radixColors.red, main: radixColors.slate },
    dark: { primary: a.accentScale, main: a.grayScale },
    radius: ["2px", "4px", "8px", "12px", "18px", "24px"],
  },
  uniswap: {
    light: generateTheme({ mode: "light", main: "#FFFFFF", primary: "#FC72FF" }),
    dark: generateTheme({ mode: "dark", main: "#131313", primary: "#FC72FF" }),
    radius: ["2px", "4px", "8px", "12px", "18px", "24px"],
  },
} as const satisfies {
  [key: string]: {
    [Mode in "dark" | "light"]: { primary: string[]; main: string[] };
  } & { radius: string[] };
};

export const looks = ["hype", "base", "bold", "soft"] as const;

export type Look = (typeof looks)[number];
export type Theme = keyof typeof themes;
export type ThemeSeed = {
  mode: "dark" | "light";

  main: string;
  primary: string;
  secondary: string;

  info: string;
  good: string;
  warn: string;
  harm: string;
};

export function generateTheme(seed: ThemeSeed) {
  const { mode, main, primary, ...colors } = seed;
  const baseGeneration = generateRadixColors({
    appearance: mode,
    accent: seed.primary,
    gray: seed.main,
    background: seed.main,
  });
  const colorScales: { [K in keyof ThemeSeed]?: string[] } = {
    main: baseGeneration.grayScale,
    primary: baseGeneration.accentScale,
  };

  for (const [key, color] of Object.entries(colors)) {
    colorScales[key] = generateRadixColors({
      appearance: mode,
      accent: color,
      gray: seed.main,
      background: seed.main,
    }).accentScale;
  }
  return colorScales;
}
