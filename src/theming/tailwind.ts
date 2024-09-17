import { generateColorScale, generateRadiusScale, generateSpacingScale } from "./variables";
import type { Config as TailwindConfig } from "tailwindcss";

/**
 * Generates tailwind classes as css variables for all theme related variables
 * @returns a partial tailwind config that only adds the css variables
 */
export function generateVariableAssigners(): TailwindConfig["theme"] {
    return {
      colors: {
        main: generateColorScale("main"),
        accent: generateColorScale("accent"),
      },
      borderRadius: generateRadiusScale("radius"),
      padding: generateSpacingScale("spacing"),
      margin: generateSpacingScale("spacing"),
      gap: generateSpacingScale("spacing"),
    };
  }