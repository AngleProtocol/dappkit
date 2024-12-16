import * as Popover from "@radix-ui/react-popover";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/Theme.context";
import { blockEvent } from "../../utils/event";
import type { Component, GetSet } from "../../utils/types";
import Box, { type BoxProps } from "../primitives/Box";
import EventBlocker from "../primitives/EventBlocker";

export type DropdownProps = Component<
  {
    padding?: BoxProps["content"];
    size?: BoxProps["size"];
    state?: GetSet<boolean>;
    content?: ReactNode;
    onHover?: boolean;
  },
  BoxProps
>;

export default function Dropdown({
  state,
  padding,
  content,
  children,
  className,
  onHover = false,
  ...props
}: DropdownProps) {
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeModalWithDelay = useCallback(() => {
    if (!internalState || !onHover) return;
    hideTimeout.current = setTimeout(() => {
      setInternalState(false);
    }, 100);
  }, [internalState, onHover]);

  const handleMouseEnter = useCallback(() => {
    if (!onHover) return;
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setInternalState(true);
  }, [onHover]);

  const cancelClose = useCallback(() => {
    if (!onHover || !hideTimeout.current) return;
    clearTimeout(hideTimeout.current);
    hideTimeout.current = null;
  }, [onHover]);

  useEffect(() => {
    if (!onHover || !hideTimeout.current) return;
    clearTimeout(hideTimeout.current);
  }, [onHover]);

  return (
    <Popover.Root open={!state ? internalState : state?.[0]} onOpenChange={!state ? setInternalState : state?.[1]}>
      <Popover.Trigger
        className={className}
        onClick={blockEvent(() => setInternalState(r => !r))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={closeModalWithDelay}>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content asChild style={vars}>
          <EventBlocker>
            <Box
              look="bold"
              className="mt-md mx-lg shadow-md animate-drop z-20"
              {...(props as BoxProps)}
              content={padding}
              onMouseEnter={cancelClose}
              onMouseLeave={closeModalWithDelay}>
              {content}
            </Box>
          </EventBlocker>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
