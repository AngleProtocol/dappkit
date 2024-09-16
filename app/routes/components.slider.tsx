import type { MetaFunction } from "@remix-run/node";
import Group from "src/components/extenders/Group";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Input from "src/components/primitives/Input";
import Slider from "src/components/primitives/Slider";
import Text from "src/components/primitives/Text";
import Title from "src/components/primitives/Title";
import List from "src/components/primitives/List";
import Showcase from "~/components/Showcase";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Buttons" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Inputs() {
  return (
    <div>
      <Box>
        <Title h={1}>Sliders</Title>
        <Text>Sliders</Text>
        <Showcase>
          <Slider className="w-[500px]" />
        </Showcase>
        <List flex="row">
          <Slider look="soft" className="w-[500px]" />
          <Button look="soft" size="md" children="qsmldksq" />
        </List>
      </Box>
    </div>
  );
}
