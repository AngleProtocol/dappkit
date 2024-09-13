import type { MetaFunction } from "@remix-run/node";
import Group from "src/components/extenders/Group";
import Select from "src/components/extenders/Select";
import SelectDemo from "~/src/extenders/Test";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Title from "src/components/primitives/Title";

export const meta: MetaFunction = () => {
  return [
    { title: "DappKit/Buttons" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Selects() {
  return (
    <div>
      <Box>
        <Title h={1}>Select</Title>
        <Group className="flex-col">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) =>
            <Group key={size}>{
              (["soft", "base", "bold", "tint", "hype"] as const).map((look) =>
                <Select key={look} size={size} look={look} options={{1: "eth", 2: "arb", 3: "op"}}>{look} {size}</Select>
              )
            }</Group>
          )}
        </Group>
      </Box>
    </div>
  );
}
