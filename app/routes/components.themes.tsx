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
import { useMemo, useState } from "react";
import { generateTheme } from "src/utils/theming";
import { useTheme } from "src/context/Theme.context";
import { fillVariables } from "src/theme/variabless";
import ColorPicker from "src/components/primitives/ColorPicker";
import { createColoring, reduceColorIntoVariables } from "@/theming/coloring";
import { Coloring } from "@/theming/variables";
import Slider from "@/components/primitives/Slider";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Lists" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Themes() {
  const [colorMain, setColorMain] = useState<string>("");
  const [colorAccent, setColorAccent] = useState<string>("");
  const [colorBackground, setColorBackground] = useState<string>("");

  const { mode } = useTheme();
  const theme = useMemo(() => {
    if (![colorMain, colorAccent].every((color) => color && color !== "")) return;

    try {
      return reduceColorIntoVariables({
        dark: { main: colorMain, accent: colorAccent },
        light: { main: colorMain, accent: colorAccent },
      });
    } catch (err) {
      return;
    }
  }, [colorMain, colorAccent]);

  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const [size, setSize] = useState(1);
  const [border, setBorder] = useState(1);

  const s = sizes[size];
  const b = sizes[border];

  const [previewColoring, setPreviewColoring] = useState<Coloring>();
  const variables = useMemo(() => {
    if (!previewColoring) return;

    const all = reduceColorIntoVariables(previewColoring);

    return (["main", "accent"] as const).reduce(
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      (vars, scale) => Object.assign(vars, all["dark"][scale]),
      {},
    );
  }, [previewColoring]);

  const testThemes: { [name: string]: Coloring } = {
    uniswap: createColoring(["#131313", "#FC72FF"], ["#FFFFFF", "#FC72FF"]),
    "1inch": createColoring(["#131823", "#172A45"], ["#FFFFFF", "#DDECFE"]),
    kiln: createColoring(["#000000", "#FF6521"], ["#FFFFFF", "#FF6521"]),
    avocado: createColoring(["#0E121C", "#07A65D"], ["#FFFFFF", "#07A65D"]),
    pancakeswap: createColoring(["#27262C", "#1FC7D4"], ["#FFFFFF", "#1FC7D4"]),
    optimism: createColoring(["#000000", "#FF0420"], ["#FBFCFE", "#7A6EAA"]),
  };

  return (
    <div>
      <Box content="lg">
        <Title h={1}>Themes</Title>
        <Text>
          Themes are primarily composed of 2 colors scales for backgrounds and accent colors.
        </Text>
        <Box look="soft" className="grid grid-cols-2">
          <List look="soft">
            <div className={"bg-accent-1 text-accent-12"}>1 - backgrounds</div>
            <div className={"bg-accent-2 text-accent-12"}>2 - backgrounds</div>
            <div className={"bg-accent-3 text-accent-12"}>3 - interactive components</div>
            <div className={"bg-accent-4 text-accent-12"}>4 - interactive components</div>
            <div className={"bg-accent-5 text-accent-12"}>5 - interactive components</div>
            <div className={"bg-accent-6 text-accent-12"}>6 - borders / separators</div>
            <div className={"bg-accent-7 text-accent-12"}>7 - borders / separators</div>
            <div className={"bg-accent-8 text-accent-12"}>8 - borders / separators</div>
            <div className={"bg-accent-9 text-accent-12"}>9 - solid colors</div>
            <div className={"bg-accent-10 text-accent-12"}>10 - solid colors</div>
            <div className={"bg-accent-11 text-accent-12"}>11 - text</div>
            <div className={"bg-accent-12 text-accent-1"}>12 - text</div>
          </List>
          <List look="soft">
            <div className={"bg-main-1 text-main-12"}>1 - backgrounds</div>
            <div className={"bg-main-2 text-main-12"}>2 - backgrounds</div>
            <div className={"bg-main-3 text-main-12"}>3 - interactive components</div>
            <div className={"bg-main-4 text-main-12"}>4 - interactive components</div>
            <div className={"bg-main-5 text-main-12"}>5 - interactive components</div>
            <div className={"bg-main-6 text-main-12"}>6 - borders / separators</div>
            <div className={"bg-main-7 text-main-12"}>7 - borders / separators</div>
            <div className={"bg-main-8 text-main-12"}>8 - borders / separators</div>
            <div className={"bg-main-9 text-main-12"}>9 - solid colors</div>
            <div className={"bg-main-10 text-main-12"}>10 - solid colors</div>
            <div className={"bg-main-11 text-main-12"}>11 - text</div>
            <div className={"bg-main-12 text-main-1"}>12 - text</div>
          </List>
        </Box>
        <Text>
          The accent scale is influenced by the background scale at the generation step in order to
          have matching color specs. Additional colors from the accent can therefore be generated to
          use for states (info, good, warn, harm) or subject-adjusted dynamic colors (chains,
          tokens, protocols...).
        </Text>
        <Box style={variables} look="soft" container={"true"} content="lg">
          <List size={"lg"} flex="row">
            {Object.entries(testThemes).map(([label, coloring]) => (
              <Button
                className="justify-center"
                onClick={() => setPreviewColoring(coloring)}
                key={label}
                look="soft"
              >
                {label}
              </Button>
            ))}
          </List>
          <div>
            <List flex="row" look="soft">
              <div className={"bg-accent-1 text-accent-12"}>1</div>
              <div className={"bg-accent-2 text-accent-12"}>2</div>
              <div className={"bg-accent-3 text-accent-12"}>3</div>
              <div className={"bg-accent-4 text-accent-12"}>4</div>
              <div className={"bg-accent-5 text-accent-12"}>5</div>
              <div className={"bg-accent-6 text-accent-12"}>6</div>
              <div className={"bg-accent-7 text-accent-12"}>7</div>
              <div className={"bg-accent-8 text-accent-12"}>8</div>
              <div className={"bg-accent-9 text-accent-12"}>9</div>
              <div className={"bg-accent-10 text-accent-12"}>10</div>
              <div className={"bg-accent-11 text-accent-12"}>11</div>
              <div className={"bg-accent-12 text-accent-1"}>12</div>
            </List>
            <List flex="row" look="soft">
              <div className={"bg-main-1 text-main-12"}>1</div>
              <div className={"bg-main-2 text-main-12"}>2</div>
              <div className={"bg-main-3 text-main-12"}>3</div>
              <div className={"bg-main-4 text-main-12"}>4</div>
              <div className={"bg-main-5 text-main-12"}>5</div>
              <div className={"bg-main-6 text-main-12"}>6</div>
              <div className={"bg-main-7 text-main-12"}>7</div>
              <div className={"bg-main-8 text-main-12"}>8</div>
              <div className={"bg-main-9 text-main-12"}>9</div>
              <div className={"bg-main-10 text-main-12"}>10</div>
              <div className={"bg-main-11 text-main-12"}>11</div>
              <div className={"bg-main-12 text-main-11"}>12</div>
            </List>
          </div>
          <Box look="bold" className="flex-row justify-center">
            {(["soft", "base", "bold", "tint", "hype"] as const).map((look) => (
              <Button key={look} look={look}>
                Button
              </Button>
            ))}
          </Box>
          <Group className="flex-col" look="soft">
            <List size="xl" flex="row">
              <Box className="flex-col w-full">
                <Text size="sm">size</Text>
                <Slider format={(n) => sizes[n]} state={[size, setSize]} max={sizes.length - 1} />
              </Box>
              <Box className="flex-col w-full">
                <Text size="sm">emphasis</Text>
                <Slider
                  format={(n) => sizes[n]}
                  state={[border, setBorder]}
                  max={sizes.length - 1}
                />
              </Box>
            </List>
            <Box
              look="bold"
              size={b}
              content={s}
              container={"true"}
              className="w-[500px] mx-auto my-xl*2"
            >
              <Input
                look="bold"
                size={s}
                header={<Text size="sm">Swap</Text>}
                footer={<Text size="xs">price: 0.01</Text>}
                // suffix={<Select look="base" size="md" options={{ 1: "USDC", 2: "USDT" }} />}
              />
              <Input
                look="bold"
                size={s}
                header={<Text size="sm">Swap</Text>}
                footer={<Text size="xs">price: 0.01</Text>}
              />
              <Button className="justify-center" look="hype" size={s}>
                Swap
              </Button>
            </Box>
          </Group>
        </Box>
      </Box>
    </div>
  );
}
