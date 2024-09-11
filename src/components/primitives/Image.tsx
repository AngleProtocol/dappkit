import * as Avatar from "@radix-ui/react-avatar";
import { mergeClass } from "src/utils/css";
import { Component } from "src/utils/types";

export type ImageProps = Component<
  {
    fallback?: string;
  },
  HTMLImageElement
>;

export default function Image({ fallback, className, ...props }: ImageProps) {
  return (
    <Avatar.Root className={mergeClass("flex items-center", className)}>
      <Avatar.Image {...props} className={className} />
      <Avatar.Fallback
        className="bg-main-2 h-full w-full justify-center flex items-center rounded-md"
        delayMs={100}
      >
        {fallback}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
