import type { MetaFunction } from "@remix-run/node";
import Group from "~/src/extenders/Group";
import Select from "~/src/extenders/Select";
import SelectDemo from "~/src/extenders/Test";
import Box from "~/src/primitives/Box";
import Button from "~/src/primitives/Button";
import Title from "~/src/primitives/Title";

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
              (["base", "soft", "bold", "hype"] as const).map((look) =>
                <Select key={look} size={size} look={look} options={{1: "eth", 2: "arb", 3: "op"}}>{look} {size}</Select>
              )
            }</Group>
          )}
        </Group>
      </Box>
    </div>
  );
}
