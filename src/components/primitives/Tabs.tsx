import { Link, useLocation } from "@remix-run/react";
import { tv, type VariantProps } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled, Themable } from "../../utils/types";
import EventBlocker from "./EventBlocker";
import useThemableProps from "../../hooks/theming/useThemableProps";
import Group from "../extenders/Group";
import type { ReactNode } from "react";

export const tabsStyles = tv(
  {
    base: "",
    slots: {
      base: "flex items-center ease !leading-none text-xl border-main-0 font-bold select-none focus-visible:outline focus-visible:outline-dashed focus-visible:outline-main-12 text-nowrap font-text",
      line: "",
      active: "",
    },
    variants: {
      look: {
        soft: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-accent-11",
        },
        base: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-accent-11",
        },
        bold: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-accent-11",
        },
        tint: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-accent-11",
        },
        hype: {
          base: "text-main-12",
          line: "border-b-1 border-accent-11",
          active: "border-accent-11",
        },
      },
      size: {
        xs: {
          base: "border-b-1 pb-xs gap-sm text-xs",
        },
        sm: {
          base: "border-b-2 pb-sm gap-sm text-sm",
        },
        md: {
          base: "border-b-4 pb-md gap-sm text-base",
        },
        lg: {
          base: "border-b-5 pb-lg gap-sm text-lg",
        },
        xl: {
          base: "border-b-6 pb-xl gap-sm text-xl",
        },
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
  Styled<typeof tabsStyles> &
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
  const location = useLocation();

  const { base, active, line } = tabsStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  return (
    <Group className={mergeClass(line(), "gap-xl*2 items-center w-full")}>
      {tabs.map((tab) => {
        return (
          <>
            {tab.link ? (
              <EventBlocker key={tab.key}>
                <Link
                  to={tab.link}
                  style={themeVars}
                  className={mergeClass(
                    styleProps,
                    base(),
                    className,
                    location.pathname === tab.link && active()
                  )}
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
                  base(),
                  className,
                  location.pathname === tab.link && active()
                )}
                type="button"
                {...props}
              >
                {tab.label}
              </button>
            )}
          </>
        );
      })}
    </Group>
  );
}
