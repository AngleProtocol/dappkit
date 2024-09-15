import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import WalletButton from "src/components/dapp/WalletButton";
import Group from "src/components/extenders/Group";
import Modal from "src/components/extenders/Modal";
import Select from "src/components/extenders/Select";
import Box from "src/components/primitives/Box";
import Button from "src/components/primitives/Button";
import Title from "src/components/primitives/Title";
import List from "src/components/primitives/List";
import type { ReactElement } from "react";
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

  const components = {
    primitives: ["card", "box", "group", "list", "text", "title", "icon", "tooltip"],
    interactive: ["button", "select"],
  };

  return (
    <div className="font-sans p-lg">
      <Group size="lg" className="grid grid-cols-[200px,1fr] w-full">
        <Box size="md" content="lg" className="items-center col-span-2 justify-between flex-row">
          <Group>
            <Title h={3}>DappKit</Title>
          </Group>
          <Group>
            <List look="bold" flex="row" size="lg">
              <Button onClick={() => setMode((n) => (n === "dark" ? "light" : "dark"))}>
                {mode !== "dark" ? <Icon remix="RiSunFill" /> : <Icon remix="RiMoonFill" />}
              </Button>
              <Select state={[theme, setTheme]} value={theme} options={availableThemes} />
            </List>
            <WalletButton look="tint" size="lg" />
          </Group>
        </Box>
        <Group size="lg" className="flex-col">
          <Modal open={true} />
          <Group look="soft" className="flex-col" size="lg">
            {
              Object.entries(components).flatMap(([title, _components]) => [
                <List key={title} look="base" size="lg">
                  <Box>
                    <Title h={4}>{title} </Title>
                  </Box>
                  {_components.map(
                    (component) =>
                      (
                        <Button look="soft" key={component} to={component}>
                          {component}
                        </Button>
                      ),
                    )}
                </List>,
              ]) as ReactElement[] | ReactElement[]
            }
            {/* <Box size="md" content="sm">
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
            </Box> */}
          </Group>

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
