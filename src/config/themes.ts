import { createColoring, Themes } from "@/theming/coloring";
import type { Coloring } from "@/theming/variables";

export const demoThemes: Themes = {
  uniswap: {
    base: createColoring(["#131313", "#FC72FF"], ["#FFFFFF", "#FC72FF"]),
    info: createColoring(["#131313", "#2ABDFF"], ["#FFFFFF", "#40B66B"]),
    good: createColoring(["#131313", "#40B66B"], ["#FFFFFF", "#40B66B"]),
    warn: createColoring(["#131313", "#FF4D00"], ["#FFFFFF", "#40B66B"]),
    harm: createColoring(["#131313", "#d22e14"], ["#FFFFFF", "#40B66B"]),
  },
  //   "1inch": { base: createColoring(["#131823", "#172A45"], ["#FFFFFF", "#DDECFE"]) },
  //   kiln: { base: createColoring(["#000000", "#FF6521"], ["#FFFFFF", "#FF6521"]) },
  //   avocado: { base: createColoring(["#0E121C", "#07A65D"], ["#FFFFFF", "#07A65D"]) },
  //   pancakeswap: { base: createColoring(["#27262C", "#1FC7D4"], ["#FFFFFF", "#1FC7D4"]) },
  //   optimism: { base: createColoring(["#000000", "#FF0420"], ["#FBFCFE", "#FF0420"]) },
};
