import type { MetaFunction } from "@remix-run/node";
import Group from "src/extenders/Group";
import Box from "src/primitives/Box";
import Button from "src/primitives/Button";
import Title from "src/primitives/Title";

export const meta: MetaFunction = () => {
  return [
    { title: "DappKit/Buttons" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Buttons() {
  return (
    <div>
      <Box>
        <Title h={1}>Buttons</Title>
        <Group className="flex-col">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) =>
            <Group key={size}>{
              (["base", "soft", "bold", "hype"] as const).map((look) =>
                <Button key={look} size={size} look={look}>{look} {size}</Button>
              )
            }</Group>
          )}
        </Group>
      </Box>
    </div>
  );
}
