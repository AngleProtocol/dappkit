import type { Config as TailwindConfig } from "tailwindcss";
import { generateColorScale, generateRadiusScale, generateSpacingScale } from "./variables";

/**
 * Generates tailwind classes as css variables for all theme related variables
 * @returns a partial tailwind config that only adds the css variables
 */
export function generateVariableAssigners(): TailwindConfig["theme"] {
  return {
    colors: {
      accent: { 0: "transparent", ...generateColorScale("accent") },
      background: "rgb(var(--background) / <alpha-value>)",
      gray: { 0: "transparent", ...generateColorScale("gray") },
    },
    borderRadius: generateRadiusScale("radius"),
    padding: generateSpacingScale("spacing"),
    margin: generateSpacingScale("spacing"),
    gap: generateSpacingScale("spacing"),
    width: generateSpacingScale("spacing"),
    height: generateSpacingScale("spacing"),
  };
}
