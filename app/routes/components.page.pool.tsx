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

export default function PagePool() {
  return (
    <div>
      <Box>
        <Title h={1}>Swap</Title>
        <Text>Imitates uniswap's swap interface</Text>
        <Box look="soft" >
        <Box look="soft" size="lg" className="w-[500px] mx-auto my-10">
          <Group className="flex-col ">
            <Input look="soft" />
            <Input look="soft" />
            <Button size='lg' className="justify-center" look="hype">Swap</Button>
          </Group>
        </Box>
        </Box>
      </Box>
    </div>
  );
}
