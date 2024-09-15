import Box from "src/components/primitives/Box";
import { Children, cloneElement, type ReactElement, useState } from "react";
import Slider from "src/components/primitives/Slider";
import type { Component } from "src/utils/types";
import List from "src/components/primitives/List";
import Text from "src/components/primitives/Text";
import { mergeClass } from "src/utils/css";

export type ShowcaseProps = Component<{
  sizes: string[];
  looks: string[];
  contents?: string[];
  children?: ReactElement;
}>;

export default function Showcase({ sizes, looks, contents, children, className }: ShowcaseProps) {
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
      </List>
      <Box look="soft" className={mergeClass(className, "min-h-[200px]")} >
        <div className="flex my-auto min-my-xl justify-center">
          {children && cloneElement(Children.only(children), {
            look: looks[look],
            size: sizes[size],
            content: contents?.[content],
          })}
        </div>
      </Box>
    </List>
  );
}
