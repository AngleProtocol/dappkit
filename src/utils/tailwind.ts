import generateSizingVariables from "../theme/variables";
import { createVariableScale } from "./theming";

export const paddingScale = [2, 4, 6, 12, 16, 24];
export const radiusScale = [2, 4, 8, 12, 16, 24];
export const sizeScale = ["xs", "sm", "md", "lg", "xl"] as const;

const sizes = generateSizingVariables([2, 4, 6, 12, 16], [2, 6, 12, 16, 32])

export const generateTailwindConfig = () => ({
  extend: {},
  colors: {
    current: "currentColor",
    main: createVariableScale("main", 12),
    primary: createVariableScale("primary", 12),
    secondary: createVariableScale("secondary", 12),
  },
  borderRadius: {
    0: "0",
    full: "100vmax",
   ...sizes.borderRadius
  },
  boxShadow: {
    md: "0 2px 4px -2px rgba(0, 0, 0, 0.3)",
    "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
  },
  padding: {
    0: "0px",
    ...sizes.padding
  },
  margin: {
    0: "0px",
    auto: "auto",
    ...sizes.padding
  },
  gap: {
    0: "0px",
    auto: "auto",
    ...sizes.padding
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
  fontFamily: {
    main: [
      '"Space Grotesk", sans-serif',
      {
        fontFeatureSettings: '"cv11", "ss01"',
        fontVariationSettings: '"opsz" 32'
      },
    ],

  }
});
