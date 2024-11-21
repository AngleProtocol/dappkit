import { useTheme } from "../../context/Theme.context";
import type { Component } from "../../utils/types";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import Icon from "./Icon";
import Text from "../primitives/Text";

export type TooltipProps = Component<{
  helper: string | React.ReactNode;
  icon?: boolean;
}>;

export default function Tooltip({
  helper,
  children,
  icon = true,
}: TooltipProps) {
  const { vars } = useTheme();

  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <span className="inline-flex items-center cursor-pointer">
            <div>{children}</div>
            {!!icon && <Icon remix="RiQuestionLine" alt="Tooltip" />}
          </span>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            style={vars}
            className="select-none rounded bg-main-1 rounded-full px-lg py-md z-30 leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >
            <Text size="sm" className="text-main-12">
              {helper}
            </Text>
            <RadixTooltip.Arrow className="TooltipArrow fill-salmon" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
