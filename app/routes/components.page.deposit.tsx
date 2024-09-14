import type { MetaFunction } from "@remix-run/node";
import Group from "src/components/extenders/Group";
import Select from "src/components/extenders/Select";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Input from "src/components/primitives/Input";
import Text from "src/components/primitives/Text";
import Title from "src/components/primitives/Title";
import List from "src/components/primitives/List";
import Slider from "src/components/primitives/Slider";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Buttons" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function PageSwap() {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const [size, setSize] = useState(1);
  const [border, setBorder] = useState(1);

  const s = sizes[size];
  const b = sizes[border];

  return (
    <div>
      <Box size="lg">
        <Title h={1}>Deposit</Title>
        <Text>Imitates uniswap's swap interface</Text>
        <Box look="soft">
          <Slider
            format={(n) => sizes[n]}
            state={[size, setSize]}
            max={sizes.length - 1}
            className="w-[500px] mx-auto"
          />
          <Slider
            format={(n) => sizes[n]}
            state={[border, setBorder]}
            max={sizes.length - 1}
            className="w-[500px] mx-auto"
          />
          <Box look="base" size={b} content={s} className="w-[500px] mx-auto my-xl*2">
            <Input
              size={s}
              look="bold"
              header={<Text size="sm">Deposit</Text>}
              footer={<Text size="xs">price: 0.01</Text>}
              // suffix={<Select look="base" size="md" options={{ 1: "USDC", 2: "USDT" }} />}
            />
            <Input
              size={s}
              look="bold"
              header={<Text size="sm">Deposit</Text>}
              footer={<Text size="xs">price: 0.01</Text>}
            />
            <Button size={s} className="justify-center" look="hype">
              Deposit
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
