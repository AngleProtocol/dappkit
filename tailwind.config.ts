import type { Config } from "tailwindcss";
import { createVariableScale, generateTheme } from "./src/utils/theming";
import { generateTailwindConfig } from "./src/utils/tailwind";
import generateSizingVariables from "./src/theme/variables";

console.log("aaa", generateSizingVariables([2, 4, 6, 12, 16], [2, 4, 6, 12, 16]))

const size = generateSizingVariables([2, 4, 6, 12, 16], [2, 4, 6, 12, 16]);

const a = generateTheme({
  mode: "light",
  good: "green",
  harm: "red",
  info: "blue",
  warn: "orange",
  primary: "pink",
  secondary: "red",
  main: "black",
});

export default {
  content: ["./{app,src}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: generateTailwindConfig(),
  plugins: [],
} satisfies Config;
