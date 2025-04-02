import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Fragment } from "react";
import { useTheme } from "../../context/Theme.context";
import { mergeClass } from "../../utils/css";
import type { Component, GetSet } from "../../utils/types";
import Box, { type BoxProps } from "../primitives/Box";
import Collapsible from "../primitives/Collapsible";
import Divider from "../primitives/Divider";
import EventBlocker from "../primitives/EventBlocker";
import Icon from "../primitives/Icon";
import Space from "../primitives/Space";
import Text from "../primitives/Text";
import Group from "./Group";

export interface MenuOptions {
  label: ReactNode;
  options?: { [optionKey: string]: MenuOptions };
}

export interface MenuProps {
  options: { [optionKey: string]: MenuOptions };
  onSelect?: (optionKey: string) => void;
  state?: GetSet<boolean>;
}

const divide = (element: JSX.Element, index: number, arr: JSX.Element[]) => (
  <Fragment key={index}>
    {element}
    {((index === 0 && arr.length > 1) || index < arr.length - 1) && <Divider horizontal className="bg-main-11" />}
  </Fragment>
);

export function SubMenuResponsiv({ children, options, size, look, className }: Component<MenuProps & BoxProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Sub>
      <Group className="flex-col !gap-0">
        <Group onClick={() => setIsOpen(prev => !prev)}>
          {
            <Group className="w-full justify-between" size="xl">
              {children}
              <Icon remix="RiArrowDownSLine" />
            </Group>
          }
        </Group>
        <Collapsible state={[isOpen, setIsOpen]}>
          <Space size="md" />
          <Box>
            {Object.entries(options).map(([key, { label, options: subOptions }]) => {
              if (subOptions && Object.keys(subOptions).length > 0)
                return (
                  <SubMenuResponsiv {...{ size, look, className }} options={subOptions}>
                    {label}
                  </SubMenuResponsiv>
                );
              return (
                <DropdownMenu.Item key={key} className="w-full">
                  <Text size="lg" className="text-main-12">
                    {label}
                  </Text>
                </DropdownMenu.Item>
              );
            })}
          </Box>
        </Collapsible>
      </Group>
    </DropdownMenu.Sub>
  );
}

export function SubMenu({ children, options, size, look, className }: Component<MenuProps & BoxProps>) {
  const { vars } = useTheme();

  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>
        <Group size="xl" className="w-full justify-between">
          {children} <Icon remix="RiArrowDownSLine" />
        </Group>
      </DropdownMenu.SubTrigger>
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent asChild className="!pointer-events-auto animate-drop p-md" style={vars}>
          <Box
            size={size || "lg"}
            look={look || "soft"}
            className={mergeClass("animate-drop text-main-12 bg-main-2 min-w-[24ch] m-lg", className)}>
            {Object.entries(options)
              .map(([key, { label, options: subOptions }]) => {
                if (subOptions && Object.keys(subOptions).length > 0)
                  return (
                    <SubMenu {...{ size, look, className }} options={subOptions}>
                      {label}
                    </SubMenu>
                  );
                return <DropdownMenu.Item key={key}>{label}</DropdownMenu.Item>;
              })
              .map(divide)}
          </Box>
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
}

export default function Menu({
  children,
  state,
  options,
  size,
  look,
  className,
  ...props
}: Component<MenuProps & BoxProps>) {
  const { vars } = useTheme();

  const menuDesktop = useMemo(() => {
    return Object.entries(options)
      .map(([key, { label, options: subOptions }]) => {
        if (subOptions && Object.keys(subOptions).length > 0)
          return (
            <SubMenu {...{ size, look, className }} options={subOptions}>
              {label}
            </SubMenu>
          );
        return <DropdownMenu.Item key={key}>{label}</DropdownMenu.Item>;
      })
      .map(divide);
  }, [options, size, look, className]);

  const menuResponsiv = useMemo(() => {
    return Object.entries(options)
      .map(([key, { label, options: subOptions }]) => {
        if (subOptions && Object.keys(subOptions).length > 0)
          return (
            <SubMenuResponsiv {...{ size, look, className }} options={subOptions}>
              {label}
            </SubMenuResponsiv>
          );
        return <DropdownMenu.Item key={key}>{label}</DropdownMenu.Item>;
      })
      .map(divide);
  }, [options, size, look, className]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const desktopMenu = useMemo(() => {
    return (
      <DropdownMenu.Content
        className="hidden !pointer-events-auto md:block md:animate-drop md:p-md"
        asChild
        style={vars}>
        <EventBlocker>
          <Box
            size={size || "lg"}
            look={look || "soft"}
            className={mergeClass("animate-drop text-main-12 bg-main-2 min-w-[24ch] m-lg", className)}
            {...props}>
            {menuDesktop}
          </Box>
        </EventBlocker>
      </DropdownMenu.Content>
    );
  }, [options, size, look, className, vars, menuDesktop]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const responsivMenu = useMemo(() => {
    return (
      <DropdownMenu.Content
        className="block !pointer-events-auto py-[20px] md:!hidden md:opacity-0"
        asChild
        style={vars}>
        <EventBlocker>
          <Box
            size={size || "lg"}
            look={look || "soft"}
            className={mergeClass("animate-drop text-main-12 bg-main-2 min-w-[100vw] min-h-[92vh] !rounded-0")}
            {...props}>
            {menuResponsiv}
          </Box>
        </EventBlocker>
      </DropdownMenu.Content>
    );
  }, [options, size, look, className, vars, menuDesktop]);

  return (
    <DropdownMenu.Root open={state?.[0]}>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        {
          <>
            {desktopMenu}
            {responsivMenu}
          </>
        }
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
