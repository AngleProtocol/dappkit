import type { Config } from "tailwindcss";
import { createVariableScale } from "./src/utils/theming";
import { generateTailwindConfig } from "src/utils/tailwind";

export default {
  content: ["./{app,src}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: generateTailwindConfig(),
  plugins: [],
} satisfies Config;
