import type { MetaFunction } from "@remix-run/node";
import Group from "src/components/extenders/Group";
import Select from "src/components/extenders/Select";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Input from "src/components/primitives/Input";
import Text from "src/components/primitives/Text";
import Title from "src/components/primitives/Title";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Buttons" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function PageSwap() {
  const size = "lg";
  return (
    <div>
      <Box size="lg">
        <Title h={1}>Swap</Title>
        <Text>Imitates uniswap's swap interface</Text>
        <Box look="soft">
          <Box look="soft" size="lg" content={size} className="w-[500px] mx-auto my-xl*2">
            <Input
              header={<Text size="sm">Swap</Text>}
              footer={<Text size="xs">price: 0.01</Text>}
              suffix={<Select look="base" size="md" options={{ 1: "USDC", 2: "USDT" }} />}
              size={size}
              look="soft"
            />
            <Input size={size} look="soft" />
            <Button size={size} className="justify-center" look="hype">
              Swap
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
