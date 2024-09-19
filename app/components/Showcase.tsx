import Box from "@/components/primitives/Box";
import { Children, cloneElement, type ReactElement, ReactNode, useState } from "react";
import Slider from "@/components/primitives/Slider";
import type { Component } from "@/utils/types";
import List from "@/components/primitives/List";
import Text from "@/components/primitives/Text";
import Checkbox from "@/components/primitives/Checkbox";
import { mergeClass } from "@/utils/css";
import { lookScale, sizeScale } from "src";

export type ShowcaseProps = Component<{
  sizes?: string[];
  looks?: string[];
  extra?: ReactNode;
  contents?: string[];
  children?: ReactElement;
}>;

export default function Showcase({
  sizes: _sizes,
  looks: _looks,
  contents,
  children,
  extra,
  className,
}: ShowcaseProps) {
  const sizes = _sizes ?? sizeScale;
  const looks = _looks ?? lookScale;

  const [size, setSize] = useState(3);
  const [look, setLook] = useState(3);
  const [content, setContent] = useState(3);

  return (
    <List size="lg">
      <List flex="row">
        <Box size="xl" className="flex-col w-full">
          <Text size="sm">size</Text>
          <Slider
            className="grow w-full"
            format={(n) => sizes[n]}
            state={[size, setSize]}
            max={sizes.length - 1}
          />
        </Box>
        <Box className="flex-col  w-full">
          <Text size="sm">emphasis</Text>
          <Slider
            className="grow w-full"
            format={(n) => looks[n]}
            state={[look, setLook]}
            max={sizes.length - 1}
          />
        </Box>
        {extra}
      </List>
      <Box look="soft" className={mergeClass(className, "min-h-[200px]")}>
        <div className="flex my-auto min-my-xl justify-center">
          {children &&
            cloneElement(Children.only(children), {
              look: looks[look],
              size: sizes[size],
              content: contents?.[content],
            })}
        </div>
      </Box>
    </List>
  );
}
