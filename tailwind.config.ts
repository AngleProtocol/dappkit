import type { Config } from "tailwindcss";
import { generateTailwindConfig } from "./src/utils/tailwind";

export default {
  content: ["./{app,src}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: generateTailwindConfig(),
  plugins: [],
} satisfies Config;
