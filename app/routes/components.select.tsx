import type { MetaFunction } from "@remix-run/node";
import Select from "src/components/extenders/Select";
import Box from "src/components/primitives/Box";
import Showcase from "~/components/Showcase";
import Title from "src/components/primitives/Title";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Buttons" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Selects() {
  return (
    <div className="animate-fadeIn">
      <Box>
        <Title h={1}>Select</Title>
        <Showcase
          looks={["soft", "base", "bold", "tint", "hype"]}
          sizes={["xs", "sm", "md", "lg", "xl"]}
        >
          <Select options={{ 1: "eth", 2: "arb", 3: "op" }}/>
        </Showcase>
      </Box>
    </div>
  );
}
