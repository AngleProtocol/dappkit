import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { mergeClass } from "../../utils/css";
import type { Component } from "../../utils/types";

export type ScrollProps = Component<
  { horizontal: boolean; vertical?: never } | { vertical: boolean; horizontal?: never }
>;

//TODO: add tailwind variants
export default function Scroll({ horizontal, vertical, children, className, ...props }: ScrollProps) {
  return (
    <RadixScrollArea.Root type="always" className="flex overflow-hidden h-full">
      <RadixScrollArea.Viewport className={mergeClass("max-size-full", className)}>{children}</RadixScrollArea.Viewport>
      {vertical && (
        <RadixScrollArea.Scrollbar
          style={{ position: "unset" }}
          className="flex touch-none select-none w-sm*2 pl-sm transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5  data-[orientation=horizontal]:flex-col data-[state=hidden]:hidden"
          orientation="vertical">
          <RadixScrollArea.Thumb className="bg-main-9 flex-1 rounded-[10px]" />
        </RadixScrollArea.Scrollbar>
      )}
      {/* TODO: add horizontal 
      <RadixScrollArea.Scrollbar
        className="flex touch-none select-none bg-blackA3 p-md transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-md data-[orientation=horizontal]:flex-col"
        orientation="horizontal">
        <RadixScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-mauve10 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
      </RadixScrollArea.Scrollbar> */}
    </RadixScrollArea.Root>
  );
}
