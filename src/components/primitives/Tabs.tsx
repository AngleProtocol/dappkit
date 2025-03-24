/**
 * @component Tabs
 * @description A flexible and customizable tabs component that supports different visual styles and navigation.
 *
 * @features
 * - Multiple visual styles (soft, base, bold, tint, hype)
 * - Responsive design with Tailwind CSS
 * - Built-in navigation support using Remix's Link component
 * - Customizable themes
 * - Accessibility features including keyboard navigation
 *
 * @usage
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { label: "Tab 1", link: "/tab1", key: "1" },
 *     { label: "Tab 2", link: "/tab2", key: "2" }
 *   ]}
 *   look="soft"
 *   theme="custom"
 * />
 * ```
 *
 * @props
 * - tabs: Array of tab items with label, link, and key
 * - look: Visual style variant (soft, base, bold, tint, hype)
 * - size: Size variant
 * - theme: Custom theme override
 * - className: Additional CSS classes
 * - disabled: Whether the tabs are disabled
 * - to: Default navigation path
 */

import { Link, useLocation } from "react-router";

import type { ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import useThemableProps from "../../hooks/theming/useThemableProps";
import { mergeClass } from "../../utils/css";
import type { Component, Styled, Themable } from "../../utils/types";
import Group from "../extenders/Group";
import Container from "../layout/Container";
import EventBlocker from "./EventBlocker";

export const tabsStyles = tv(
  {
    base: "",
    slots: {
      base: "flex items-center ease !leading-none text-xl border-main-0 font-bold select-none focus-visible:outline focus-visible:outline-dashed focus-visible:outline-main-12 text-nowrap font-text",
      line: "",
      active: "",
      container: "",
    },
    variants: {
      look: {
        soft: {
          base: "text-main-12",
          line: "border-accent-11",
          active: "border-accent-11",
          container: "",
        },
        base: {
          base: "text-main-12",
          line: "border-accent-11",
          active: "border-accent-11",
          container: "bg-main-3",
        },
        bold: {
          base: "text-main-12",
          line: "border-accent-11",
          active: "border-accent-11",
          container: "",
        },
        tint: {
          base: "text-main-12",
          line: "border-accent-11",
          active: "border-accent-11",
          container: "",
        },
        hype: {
          base: "text-main-12",
          line: "border-accent-11",
          active: "border-accent-11",
          container: "",
        },
      },
      size: {
        xs: {
          base: "pb-xs gap-sm text-xs",
          container: "mb-xs pt-xs*2",
        },
        sm: {
          base: "border-b-2 pb-sm gap-sm text-sm",
          container: "mb-sm pt-sm*2",
        },
        md: {
          base: "border-b-4 pb-md gap-sm text-base",
          container: "mb-md pt-md*2",
        },
        lg: {
          base: "border-b-5 pb-lg gap-sm text-lg",
          container: "mb-lg pt-lg*2",
        },
        xl: {
          base: "border-b-6 pb-xl gap-sm text-xl",
          container: "mb-xl pt-xl*2",
        },
      },
    },
    defaultVariants: {
      look: "base",
      size: "md",
    },
  },
  { twMerge: false },
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

export default function Tabs({ look, size, to, theme, className, tabs = [], ...props }: TabsProps) {
  const themeVars = useThemableProps(props);
  const styleProps = tabsStyles({ look, size });
  const location = useLocation();

  const { base, active, line, container } = tabsStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  return (
    <Group className={mergeClass(container(), "w-full")}>
      <Container>
        <Group className={mergeClass(line(), "gap-xl*2 items-center w-full")}>
          {tabs.map(tab => {
            const relativeUrl = tab.link.split("?")[0];

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
                        location.pathname === relativeUrl && active(),
                      )}>
                      {tab.label}
                    </Link>
                  </EventBlocker>
                ) : (
                  <button
                    key={tab.key}
                    style={themeVars}
                    className={mergeClass(styleProps, base(), className, location.pathname === relativeUrl && active())}
                    type="button"
                    {...props}>
                    {tab.label}
                  </button>
                )}
              </>
            );
          })}
        </Group>
      </Container>
    </Group>
  );
}
