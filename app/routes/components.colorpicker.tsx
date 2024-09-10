import type { MetaFunction } from "@remix-run/node";
import Group from "src/extenders/Group";
import Box from "src/primitives/Box";
import Button from "src/primitives/Button";
import ColorPicker from "src/primitives/ColorPicker";
import Input from "src/primitives/Input";
import Text from "src/primitives/Text";
import Title from "src/primitives/Title";

export const meta: MetaFunction = () => {
  return [
    { title: "DappKit/Buttons" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function ColorPickers() {
  return (
    <div>
      <Box>
        <Title h={1}>Inputs</Title>
        <Text>Inputs</Text>
        <Group className="flex-col">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) =>
            <Group key={size}>{
              (["base", "soft", "bold", "hype"] as const).map((look) =>
                <ColorPicker key={look} size={size} look={look}/>
              )
            }</Group>
          )}
        </Group>
      </Box>
    </div>
  );
}
