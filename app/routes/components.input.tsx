import type { MetaFunction } from "@remix-run/node";
import Group from "src/components/extenders/Group";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Input from "src/components/primitives/Input";
import Text from "src/components/primitives/Text";
import Title from "src/components/primitives/Title";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Buttons" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Inputs() {
  return (
    <div>
      <Box>
        <Title h={1}>Inputs</Title>
        <Text>Inputs</Text>
        <Group className="flex-col">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <Group className="flex-col">
              <Title h={3}>{size}</Title>
              <Text>{size}</Text>
              <Box size="md" look="soft" content={size}>
                <Group key={size}>
                  {(["soft", "base", "bold", "tint", "hype"] as const).map((look) => (
                    <Input placeholder={size} key={look} size={size} look={look} />
                  ))}
                </Group>
              </Box>
              <Box size="md" content={size}>
                <Group key={size}>
                  {(["soft", "base", "bold", "tint", "hype"] as const).map((look) => (
                    <Input  placeholder={size} key={look} size={size} look={look} />
                  ))}
                </Group>
              </Box>
            </Group>
          ))}
        </Group>
      </Box>
    </div>
  );
}
