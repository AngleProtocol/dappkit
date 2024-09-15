import type { MetaFunction } from "@remix-run/node";
import Group from "src/components/extenders/Group";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Text from "src/components/primitives/Text";
import Checkbox from "src/components/primitives/Checkbox";
import Title from "src/components/primitives/Title";
import { sizeScale, lookScale } from "src/utils/tailwind";
import Showcase from "~/components/Showcase";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Buttons" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Boxes() {
  const [container, setContainer] = useState<boolean>(true);

  return (
    <div>
      <Box>
        <Title h={1}>Box</Title>
        <Text>Displays a box.</Text>
        <Showcase
          extra={
            <Box>
              <Text size="sm">container</Text>
              <Checkbox state={[container, setContainer]} />
            </Box>
          }
          sizes={sizeScale.map((n) => n)}
          looks={lookScale.map((n) => n)}
        >
          <Box className="flex-row" container={container ? "true" : "false"}>
            <Box look="soft">Box</Box>
            <Group>
              <Button look="tint">Button</Button>
              <Button look="hype">Button</Button>
            </Group>
          </Box>
        </Showcase>
      </Box>
    </div>
  );
}
