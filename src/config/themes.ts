import { type Themes, createColoring } from "../theming/coloring";

export const demoThemes: Themes = {
  zksync: {
    base: createColoring(
      ["#000000", "#1755F4", "#000000"],
      ["#6e4c18", "#FB9901", "#FCF8F5"]
    ),
    info: createColoring(
      ["#2ABDFF", "#2ABDFF", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    good: createColoring(
      ["#40B66B", "#40B66B", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    warn: createColoring(
      ["#ff9600", "#ff9600", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    harm: createColoring(
      ["#d22e14", "#d22e14", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
  },
  ignite: {
    base: createColoring(
      ["#7F89F2", "#FFA200", "#111111"],
      ["#F89B00", "#3A3D90", "#FFFFFF"]
    ),
    info: createColoring(
      ["#2ABDFF", "#2ABDFF", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    good: createColoring(
      ["#40B66B", "#40B66B", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    warn: createColoring(
      ["#ff9600", "#ff9600", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    harm: createColoring(
      ["#d22e14", "#d22e14", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
  },
  merkl: {
    base: createColoring(
      ["#1F2333", "#B8AAFD", "#131620"],
      ["#FCF8F5", "#B8AAFD", "white"]
    ),
    info: createColoring(
      ["#2ABDFF", "#2ABDFF", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    good: createColoring(
      ["#40B66B", "#40B66B", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    warn: createColoring(
      ["#ff9600", "#ff9600", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    harm: createColoring(
      ["#d22e14", "#d22e14", "#131620"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
  },
  uniswap: {
    base: createColoring(
      ["#131313", "#FC72FF", "#131313"],
      ["#FFFFFF", "#FC72FF", "white"]
    ),
    info: createColoring(
      ["#2ABDFF", "#2ABDFF", "#131313"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    good: createColoring(
      ["#40B66B", "#40B66B", "#131313"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    warn: createColoring(
      ["#ff9600", "#ff9600", "#131313"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    harm: createColoring(
      ["#d22e14", "#d22e14", "#131313"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
  },
  "1inch": {
    base: createColoring(
      ["#131823", "#172A45", "black"],
      ["#FFFFFF", "#FC72FF", "white"]
    ),
    info: createColoring(
      ["#2ABDFF", "#2ABDFF", "black"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    good: createColoring(
      ["#40B66B", "#40B66B", "black"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    warn: createColoring(
      ["#ff9600", "#ff9600", "black"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
    harm: createColoring(
      ["#d22e14", "#d22e14", "black"],
      ["#FFFFFF", "#40B66B", "white"]
    ),
  },
  //   "1inch": { base: createColoring(["#131823", "#172A45"], ["#FFFFFF", "#DDECFE"]) },
  //   kiln: { base: createColoring(["#000000", "#FF6521"], ["#FFFFFF", "#FF6521"]) },
  //   avocado: { base: createColoring(["#0E121C", "#07A65D"], ["#FFFFFF", "#07A65D"]) },
  //   pancakeswap: { base: createColoring(["#27262C", "#1FC7D4"], ["#FFFFFF", "#1FC7D4"]) },
  //   optimism: { base: createColoring(["#000000", "#FF0420"], ["#FBFCFE", "#FF0420"]) },
};
