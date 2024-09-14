import Box from "src/components/primitives/Box";
import { Children, cloneElement, useState } from "react";
import Slider from "src/components/primitives/Slider";
import { Component } from "src/utils/types";
import Group from "src/components/extenders/Group";

export type ShowcaseProps = Component<{ sizes: string[]; looks: string[], contents?: string[] }>;

export default function Showcase({ sizes, looks, contents, children, ...props }) {
  const [size, setSize] = useState(3);
  const [look, setLook] = useState(3);
  const [content, setContent] = useState(3);

  Children.only(children);

  return (
    <Box look="soft" {...props}>
      <Group className="w-[500px] mx-auto my-xl flex-col">
        <Slider format={(n) => sizes[n]} state={[size, setSize]} max={sizes.length - 1} />
        <Slider format={(n) => looks[n]} state={[look, setLook]} max={sizes.length - 1} />
        {contents && <Slider format={(n) => contents[n]} state={[content, setContent]} max={contents.length - 1} />}
        <div>{cloneElement(children, { look: looks[look], size: sizes[size], content: contents?.[content] })}</div>
      </Group>
    </Box>
  );
}
