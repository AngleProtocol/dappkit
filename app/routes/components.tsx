import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import WalletButton from "src/components/dapp/WalletButton";
import Group from "src/components/extenders/Group";
import Modal from "src/components/extenders/Modal";
import Select from "src/components/extenders/Select";
import Box from "src/components/primitives/Box";
import Button, { buttonStyles } from "src/components/primitives/Button";
import Divider from "src/components/primitives/Divider";
import Slider from "src/components/primitives/Slider";
import Title from "src/components/primitives/Title";
import List from "src/components/primitives/List";
import { useTheme } from "src/context/Theme.context";
import Icon from "src/components/primitives/Icon";

export const meta: MetaFunction = () => {
  return [{ title: "DappKit/Components" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  const { themes, theme, setTheme, setMode, mode } = useTheme();

  const availableThemes = Object.keys(themes).reduce(
    (obj, t) => Object.assign(obj, { [t]: t }),
    {},
  );

  return (
    <div className="font-sans p-lg">
      <Group size="lg" className="grid grid-cols-[200px,1fr] w-full">
        <Box size="md" content="lg" className="col-span-2 justify-between flex-row">
          <Group>
            <Title h={3}>DappKit</Title>
          </Group>
          <Group>
            <List look="bold" flex="row" size="lg">
              <Button onClick={() => setMode((n) => (n === "dark" ? "light" : "dark"))}>
                {mode !== "dark" ? <Icon remix="RiSunFill"/> : <Icon remix="RiMoonFill"/>}
              </Button>
              <Select state={[theme, setTheme]} value={theme} options={availableThemes} />
            </List>
            <WalletButton look="tint" size="lg" />
          </Group>
        </Box>
        <Group size="lg" className="flex-col">
          <Modal open={true} />
          <List look="soft" size="sm">
            {/* <Select value={theme} options={Object.keys(themes).reduce((obj, theme) => Object.assign(obj, { [theme]: theme }), {})} /> */}
            <Box content="sm">
              <Title h={3}>Components</Title>
              <Divider horizontal className="border-main-4" />
              <List look="soft" size="sm">
                <Button to="select">Title</Button>
                <Button to="select">Text</Button>
                <Button to="button">Button</Button>
                <Button to="select">Select</Button>
                <Button to="select">MultiSelect</Button>
                <Button to="list">List</Button>
                <Button to="select">Icon</Button>
                <Button to="input">Input</Button>
                <Button to="input">Slider</Button>
                <Button to="input">Tooltip</Button>
                <Button to="input">Collapsible</Button>
                <Button to="select">Notification</Button>
                <Button to="select">Box</Button>
                <Button to="select">Group</Button>
                <Button to="select">ScrollBox</Button>
              </List>
            </Box>
            <Box size="md" content="sm">
              <Title h={3}>Pages</Title>
              <Divider horizontal className="border-main-4" />
              <Link className={buttonStyles({ look: "soft", size: "sm" })} to="page/swap">
                Swap
              </Link>
              <Link className={buttonStyles({ look: "soft", size: "sm" })} to="page/token">
                Token
              </Link>
              <Link className={buttonStyles({ look: "soft", size: "sm" })} to="page/pool">
                Pool
              </Link>
            </Box>
            <Box size="md" content="sm">
              <Title h={3}>Sizing</Title>
              <Divider horizontal className="border-main-4" />
              <Title h={5}>Padding</Title>
              <Slider />
              <Title h={5}>Radius</Title>
              <Slider />
            </Box>
          </List>

          {/* <Box>
            <Title h={3}>Themes</Title>
            <Group className="flex-col">
              <Select
                value={mode}
                onValueChange={setMode}
                options={{ dark: "Dark", light: "Light" }}
              />
              {Object.keys(themes).map((t) => (
                <Button key={t} onClick={() => setTheme(t)}>
                  {t}
                </Button>
              ))}
            </Group>
          </Box> */}
        </Group>
        <Outlet />
      </Group>
    </div>
  );
}
