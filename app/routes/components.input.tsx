import type { MetaFunction } from "@remix-run/node";
import Group from "src/components/extenders/Group";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Input from "src/components/primitives/Input";
import Text from "src/components/primitives/Text";
import Title from "src/components/primitives/Title";

export const meta: MetaFunction = () => {
  return [
    { title: "DappKit/Buttons" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Inputs() {
  return (
    <div>
      <Box>
        <Title h={1}>Inputs</Title>
        <Text>Inputs</Text>
        <Group className="flex-col">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) =>
            <Group key={size}>{
              (["base", "soft", "bold", "hype"] as const).map((look) =>
                <Input key={look} size={size} look={look}/>
              )
            }</Group>
          )}
        </Group>
      </Box>
    </div>
  );
}
