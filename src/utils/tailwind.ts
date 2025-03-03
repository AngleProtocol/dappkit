import type { Config } from "tailwindcss";
import { generateVariableAssigners } from "../theming/tailwind";

export const sizeScale = ["xs", "sm", "md", "lg", "xl"] as const;
export const lookScale = ["soft", "base", "bold", "tint", "hype"] as const;
export type SizingConfig = {
  spacing: { [Size in (typeof sizeScale)[number]]: number };
  radius: { [Size in (typeof sizeScale)[number]]: number };
};

export const variableConfig = generateVariableAssigners();

export const SCREEN_BREAKDOWNS = {
  MD: 640,
  LG: 1024,
  XL: 1536,
  XXL: 2065,
};

export const generateTailwindConfig = (fonts?: { title: string[]; text: string[]; mono: string[] }) =>
  ({
    extend: {
      width: {
        ...variableConfig?.width,
        full: "100%",
      },
      keyframes: {
        drop: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        stretch: {
          "0%": { transform: "scaleY(0.9)" },
          "100%": { transform: "scaleY(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0.7" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        textScroll: {
          "0%": { transform: "translateX(0%)" },
          "90%": { transform: "translateX(-100%)" },
          "95%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        drop: "drop 0.1s ease-out",
        stretch: "stretch 0.05s ease-out",
        fadeIn: "fadeIn 0.1s ease-out",
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade: "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        textScroll: "textScroll 5s linear",
      },
    },
    colors: {
      ...variableConfig?.colors,
    },
    screens: Object.fromEntries(
      Object.entries(SCREEN_BREAKDOWNS).map(([key, value]) => [key.toLowerCase(), `${value}px`]),
    ),
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
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "22px",
      "2xl": "clamp(22px,calc(0.4167vw + 1.171875rem),28px)",
      "3xl": "clamp(24px,calc(0.4167vw + 1.46484375rem),30px)",
    },
    fontFamily: {
      title: fonts?.title ?? ['"Aeonik Extended", serif'],
      text: fonts?.text ?? ['"Aeonik", sans-serif'],
      mono: fonts?.mono ?? ['"Space Mono", sans-serif'],
    },
  }) satisfies Config["theme"];
