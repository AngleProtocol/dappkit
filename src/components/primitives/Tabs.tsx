import { Link } from "@remix-run/react";
import { tv, type VariantProps } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Themable } from "../../utils/types";
import EventBlocker from "./EventBlocker";
import useThemableProps from "../../hooks/theming/useThemableProps";
import Group from "../extenders/Group";
import type { ReactNode } from "react";

export const tabsStyles = tv(
  {
    base: "flex items-center dim !leading-none select-none rounded-full focus-visible:outline focus-visible:outline-dashed focus-visible:outline-main-12 text-nowrap font-text ease font-bold text-[clamp(15px,0.4167vw+0.78125rem,20px)]",
    variants: {
      look: {
        soft: "text-main-12 !p-0 active:text-main-11 outline-offset-4",
        base: "text-main-12 border-1 border-main-11 active:border-main-10",
        bold: "text-main-1 bg-main-11 active:bg-main-10",
        tint: "text-main-1 bg-accent-10 active:bg-accent-9",
        hype: "text-main-1 bg-accent-11 active:bg-accent-10",
      },
      size: {
        xs: "px-sm py-xs gap-sm text-xs",
        sm: "px-sm py-md gap-sm text-sm",
        md: "px-md py-md gap-sm text-base",
        lg: "px-lg py-lg gap-sm text-lg",
        xl: "px-xl py-xl gap-sm text-xl",
      },
    },
    defaultVariants: {
      look: "base",
      size: "md",
    },
  },
  { twMerge: false }
);

type TabsStyleProps = VariantProps<typeof tabsStyles>;

export type TabsProps = Component<
  TabsStyleProps &
    Themable & {
      to?: string;
      className?: string;
      type?: "button" | "submit" | "reset";

      disabled?: boolean;
      tabs?: { label: ReactNode; link: string; key: string }[];
    },
  HTMLButtonElement
>;

export default function Tabs({
  look,
  size,
  to,
  theme,
  className,
  tabs,
  ...props
}: TabsProps) {
  const themeVars = useThemableProps(props);
  const styleProps = tabsStyles({ look, size });

  if (to) {
    return tabs?.map((tab) => (
      <EventBlocker key={tab.key}>
        <Link to={tab.link} className={mergeClass(styleProps, className)}>
          {tab.label}
        </Link>
      </EventBlocker>
    ));
  }

  return (
    <Group size="xl" className="items-center">
      {tabs?.map((tab) => (
        <button
          key={tab.key}
          style={themeVars}
          className={mergeClass(styleProps, className)}
          type="button"
          {...props}
        >
          {tab.label}
        </button>
      ))}
    </Group>
  );
}
