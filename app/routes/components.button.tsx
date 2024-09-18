import type { MetaFunction } from "@remix-run/node";
import Group from "src/components/extenders/Group";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Text from "src/components/primitives/Text";
import Checkbox from "src/components/primitives/Checkbox";
import Title from "src/components/primitives/Title";
import { sizeScale, lookScale } from "src/utils/tailwind";
import Showcase from "~/components/Showcase";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Buttons" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Buttons() {
  return (
    <div>
      <Box>
        <Title h={1}>Buttons</Title>
        <Text>Displays a button or a link that looks like a button.</Text>
        <Showcase sizes={sizeScale.map((n) => n)} looks={lookScale.map((n) => n)}>
          <Button>Button</Button>
        </Showcase>
        <Button accent={"harm"} look="tint" className="justify-center">
          Themed
        </Button>
      </Box>
    </div>
  );
}
