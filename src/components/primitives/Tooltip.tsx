import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/Theme.context";
import type { Component } from "../../utils/types";
import Text from "../primitives/Text";
import Icon from "./Icon";

export type TooltipProps = Component<{
  helper: string | React.ReactNode;
  icon?: boolean;
  className?: string;
  onOpen?: () => void;
}>;

export default function Tooltip({ helper, onOpen, children, icon = true, className }: TooltipProps) {
  const { vars } = useTheme();
  const [open, setOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!("ontouchstart" in window)) return;
    setIsTouchDevice(true);
  }, []);

  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root
        open={isTouchDevice ? open : undefined}
        onOpenChange={isOpen => {
          if (isTouchDevice) setOpen(isOpen);
          if (isOpen) onOpen?.();
        }}
        delayDuration={0}>
        <RadixTooltip.Trigger asChild>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <span className="flex items-center gap-sm" onClick={isTouchDevice ? () => setOpen(prev => !prev) : undefined}>
            {children && <div>{children}</div>}
            {!!icon && <Icon className="text-main-12" remix="RiQuestionFill" alt="Tooltip" />}
          </span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            style={vars}
            className={`${className} select-none rounded-md bg-main-1 px-lg py-md z-30 leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade max-w-[90vw] md:max-w-[70vw] lg:max-w-[40vw] xl:max-w-[30vw]`}
            sideOffset={5}>
            <Text size="sm" className="text-main-12">
              {helper}
            </Text>
            <RadixTooltip.Arrow />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
