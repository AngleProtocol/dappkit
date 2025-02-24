import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { Fragment } from "react";
import { useTheme } from "../../context/Theme.context";
import { mergeClass } from "../../utils/css";
import type { Component } from "../../utils/types";
import Box, { type BoxProps } from "../primitives/Box";
import Divider from "../primitives/Divider";
import EventBlocker from "../primitives/EventBlocker";
import Icon from "../primitives/Icon";
import Group from "./Group";

export interface MenuOptions {
  label: ReactNode;
  options?: { [optionKey: string]: MenuOptions };
}

export interface MenuProps {
  options: { [optionKey: string]: MenuOptions };
  onSelect?: (optionKey: string) => void;
}

const divide = (element: JSX.Element, index: number, arr: JSX.Element[]) => (
  <Fragment key={index}>
    {element}
    {((index === 0 && arr.length > 1) || index < arr.length - 1) && <Divider horizontal className="bg-main-11" />}
  </Fragment>
);

export function SubMenu({ children, options, size, look, className }: Component<MenuProps & BoxProps>) {
  const { vars } = useTheme();

  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>
        <Group size="xl" className="w-full justify-between">
          {children} <Icon remix="RiArrowRightWideLine" />
        </Group>
      </DropdownMenu.SubTrigger>
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent asChild className="!pointer-events-auto animate-drop p-md" style={vars}>
          <Box {...{ size, look, className }}>
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

export default function Menu({ children, options, size, look, className, ...props }: Component<MenuProps & BoxProps>) {
  const { vars } = useTheme();

  const menu = useMemo(() => {
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

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="!pointer-events-auto animate-drop p-md" asChild style={vars}>
          <EventBlocker>
            <Box
              size={size || "lg"}
              look={look || "soft"}
              className={mergeClass("animate-drop text-main-12 bg-main-2 min-w-[24ch] m-lg", className)}
              {...props}>
              {menu}
            </Box>
          </EventBlocker>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
