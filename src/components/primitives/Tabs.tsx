import { Link } from "@remix-run/react";
import { tv, type VariantProps } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Themable } from "../../utils/types";
import EventBlocker from "./EventBlocker";
import useThemableProps from "../../hooks/theming/useThemableProps";
import Group from "../extenders/Group";
import { useState, type ReactNode } from "react";

export const tabsStyles = tv(
  {
    base: "flex items-center ease !leading-none text-xl border-main-0 font-bold select-none focus-visible:outline focus-visible:outline-dashed focus-visible:outline-main-12 text-nowrap font-text",
    variants: {
      look: {
        soft: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-b-2 border-main-11 text-main-11",
        },
        base: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-b-2 border-main-11 text-main-11",
        },
        bold: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-b-2 border-main-11 text-main-11",
        },
        tint: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-b-2 border-main-11 text-main-11",
        },
        hype: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-b-2 border-main-11 text-main-11",
        },
      },
      size: {
        xs: "border-b-1 pb-xs gap-sm text-xs",
        sm: "border-b-2 pb-sm gap-sm text-sm",
        md: "border-b-4 pb-md gap-sm text-base",
        lg: "border-b-5 pb-lg gap-sm text-lg",
        xl: "border-b-6 pb-xl gap-sm text-xl",
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

type TabsType = { label: ReactNode; link: string; key: string }[];

export type TabsProps = Component<
  TabsStyleProps &
    Themable & {
      to?: string;
      className?: string;
      type?: "button" | "submit" | "reset";
      disabled?: boolean;
      tabs?: TabsType;
    },
  HTMLButtonElement
>;

export default function Tabs({
  look,
  size,
  to,
  theme,
  className,
  tabs = [],
  ...props
}: TabsProps) {
  const themeVars = useThemableProps(props);
  const styleProps = tabsStyles({ look, size });

  const [activeTab, setActiveTab] = useState<string | undefined>(
    tabs.length > 0 ? tabs[0].key : undefined
  );

  const { base, active, line } = tabsStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  return (
    <Group size="xl" className={mergeClass(line(), "items-center w-full")}>
      {tabs.map((tab) =>
        tab.link ? (
          <EventBlocker key={tab.key}>
            <Link
              to={tab.link}
              style={themeVars}
              className={mergeClass(
                styleProps,
                className,
                activeTab === tab.key ? active() : base()
              )}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </Link>
          </EventBlocker>
        ) : (
          <button
            key={tab.key}
            style={themeVars}
            className={mergeClass(
              styleProps,
              className,
              activeTab === tab.key ? active() : base()
            )}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            {...props}
          >
            {tab.label}
          </button>
        )
      )}
    </Group>
  );
}
