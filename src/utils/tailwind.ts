import generateSizingVariables from "../theme/variabless";
import { deriveSizingUtilityClasses } from "../theme/classes";
import { createVariableScale } from "./theming";
import { generateRadiusScale } from "../theming/variables";
import { generateVariableAssigners } from "../theming/tailwind";

export const paddingScale = [2, 4, 6, 12, 16, 24];
export const radiusScale = [2, 4, 8, 12, 16, 24];
export const sizeScale = ["xs", "sm", "md", "lg", "xl"] as const;
export const lookScale = ["soft", "base", "bold", "tint", "hype"] as const;

const sizes = generateSizingVariables([2, 4, 6, 12, 16], [2, 6, 12, 16, 32]);

export const variableConfig = generateVariableAssigners()
console.log(variableConfig, 'var');

export const generateTailwindConfig = () => ({
  ...variableConfig,
  extend: {},
  colors: {
    ...variableConfig?.colors
  },
  keyframes: {
    drop: {
      "0%": { transform: "translateY(-10px)", opacity: 0 },
      "100%": { transform: "translateY(0px)", opacity: 1 },
    },
    fadeIn: {
      "0%": { opacity: 0.7 },
      "100%": { opacity: 1 },
    },
  },
  animation: {
    drop: "drop 0.1s ease-out",
    fadeIn: "fadeIn 0.1s ease-out",
  },
  borderRadius: {
    0: "0",
    full: "100vmax",
    ...variableConfig?.borderRadius
  },
  boxShadow: {
    md: "0 2px 4px -2px rgba(0, 0, 0, 0.3)",
    "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
  },
  padding: {
    0: "0px",
    ...variableConfig?.padding,
  },
  margin: {
    0: "0px",
    auto: "auto",
    ...variableConfig?.margin,
  },
  gap: {
    0: "0px",
    auto: "auto",
    ...variableConfig?.gap,
  },
  borderWidth: {
    0: "0px",
    1: "1px",
    2: "2px",
    3: "3px",
    4: "4px",
    5: "6px",
    6: "8px",
  },
  fontSize: {
    xs: "0.7rem",
    sm: "0.8rem",
    xl: "1.25rem",
    "2xl": "1.563rem",
    "3xl": "1.953rem",
    "4xl": "2.441rem",
    "5xl": "3.052rem",
  },
  fontFamily: {
    main: [
      '"Space Grotesk", sans-serif',
      {
        fontFeatureSettings: '"cv11", "ss01"',
        fontVariationSettings: '"opsz" 32',
      },
    ],
  },
});
