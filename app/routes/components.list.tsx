import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Group from "src/components/extenders/Group";
import Box from "src/components/primitives/Box";
import Button, { buttonStyles } from "src/components/primitives/Button";
import Input from "src/components/primitives/Input";
import List from "src/components/primitives/List";
import Text from "src/components/primitives/Text";
import Title from "src/components/primitives/Title";
import Select from "src/components/extenders/Select";
import Showcase from "~/components/Showcase";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Lists" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Lists() {
  return (
    <div>
      <Box content="lg">
        <Title h={1}>Lists</Title>
        <Text>Lists are used to display elements in a column layout</Text>
        <Showcase
          looks={["soft", "base", "bold", "tint", "hype"]}
          sizes={["xs", "sm", "md", "lg", "xl"]}
        >
          <List look="hype" className="!min-w-[400px]">
            <Button>Swap</Button>
            <Button look="hype">Swap</Button>
            <Button>Swap</Button>
            <Button>Swap</Button>
            <Button>Swap</Button>
          </List>
        </Showcase>

      </Box>
    </div>
  );
}
