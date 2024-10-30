import { generateVariableAssigners } from "../theming/tailwind";

export const paddingScale = [2, 4, 6, 12, 16, 24];
export const radiusScale = [2, 4, 8, 12, 16, 24];
export const sizeScale = ["xs", "sm", "md", "lg", "xl"] as const;
export const lookScale = ["soft", "base", "bold", "tint", "hype"] as const;

export const variableConfig = generateVariableAssigners();

export const generateTailwindConfig = () => ({
  extend: {
    width: {
      ...variableConfig?.width,
      full: "100%",
    },
    keyframes: {
      drop: {
        "0%": { transform: "translateY(-10px)", opacity: 0 },
        "100%": { transform: "translateY(0px)", opacity: 1 },
      },
      stretch: {
        "0%": { transform: "scaleY(0.9)" },
        "100%": { transform: "scaleY(1)" },
      },
      fadeIn: {
        "0%": { opacity: 0.7 },
        "100%": { opacity: 1 },
      },
      slideDown: {
        from: { height: "0px" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      slideUp: {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0px" },
      },
    },
    animation: {
      drop: "drop 0.1s ease-out",
      stretch: "stretch 0.05s ease-out",
      fadeIn: "fadeIn 0.1s ease-out",
      slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
    },
  },
  colors: {
    ...variableConfig?.colors,
  },

  screens: {
    md: "640px",
    lg: "1024px",
    xl: "1536px",
    xxl: "2065px",
  },

  borderRadius: {
    0: "0",
    full: "100vmax",
    ...variableConfig?.borderRadius,
  },
  boxShadow: {
    md: "0 2px 4px -2px rgba(0, 0, 0, 0.3)",
    "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
  },
  height: {
    full: "100%",
    ...variableConfig?.height,
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
    xs: "clamp(11px,0.4167vw+0.5859375,14px)",
    sm: "clamp(13px,0.4167vw+0.68359375rem,16px)",
    base: "clamp(15px,0.4167vw+0.78125rem,20px)",
    lg: "clamp(18px,0.4167vw+0.87890625rem,22px)",
    xl: "clamp(20px,0.4167vw+0.9765625rem,26px)",
    "2xl": "clamp(22px,0.4167vw+1.171875rem,28px)",
    "3xl": "clamp(24px,0.4167vw+1.46484375rem,30px)",
  },
  fontFamily: {
    default: [
      '"Open Sans", sans-serif;',
      {
        fontFeatureSettings: '"cv11", "ss01"',
        fontVariationSettings: '"opsz" 32',
      },
    ],
    main: [
      '"Space Grotesk", sans-serif',
      {
        fontFeatureSettings: '"cv11", "ss01"',
        fontVariationSettings: '"opsz" 32',
      },
    ],
    mono: [
      '"Space Mono", sans-serif',
      {
        fontFeatureSettings: '"cv11", "ss01"',
        fontVariationSettings: '"opsz" 32',
      },
    ],
  },
});
