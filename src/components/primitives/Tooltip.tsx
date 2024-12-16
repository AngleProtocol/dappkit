import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useTheme } from "../../context/Theme.context";
import type { Component } from "../../utils/types";
import Text from "../primitives/Text";
import Icon from "./Icon";

export type TooltipProps = Component<{
  helper: string | React.ReactNode;
  icon?: boolean;
}>;

export default function Tooltip({ helper, children, icon = true }: TooltipProps) {
  const { vars } = useTheme();

  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <span className="flex items-center gap-sm">
            <div>{children}</div>
            {!!icon && <Icon remix="RiQuestionLine" alt="Tooltip" />}
          </span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            style={vars}
            className="select-none rounded-md bg-main-1 rounded-full px-lg py-md z-30 leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade max-w-[90vw] md:max-w-[70vw] lg:max-w-[40vw] xl:max-w-[30vw]"
            sideOffset={5}>
            <Text size="sm" className="text-main-12 ">
              {helper}
            </Text>
            <RadixTooltip.Arrow />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
