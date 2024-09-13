import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import WalletButton from "src/components/dapp/WalletButton";
import Group from "src/components/extenders/Group";
import Modal from "src/components/extenders/Modal";
import Select from "src/components/extenders/Select";
import Box from "src/components/primitives/Box";
import Button, { buttonStyles } from "src/components/primitives/Button";
import Divider from "src/components/primitives/Divider";
import Title from "src/components/primitives/Title";
import { useTheme } from "src/context/Theme.context";

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
        <Box size='lg' content="sm" className="col-span-2 justify-between flex-row">
          <Group>
            <Title h={3}>DappKit</Title>
          </Group>
          <Group>
            <Button
              look="soft"
              size="sm"
              onClick={() => setMode((n) => (n === "dark" ? "light" : "dark"))}
            >
              {mode}
            </Button>
            <Select
              state={[theme, setTheme]}
              value={theme}
              options={availableThemes}
              look="soft"
              size="sm"
            />
            <WalletButton size="sm" look="bold" />
          </Group>
        </Box>
        <Group size="lg" className="flex-col">
          <Modal open={true} />
          {/* <Select value={theme} options={Object.keys(themes).reduce((obj, theme) => Object.assign(obj, { [theme]: theme }), {})} /> */}
          <Box size='md' content="sm">
            <Title h={3}>Components</Title>
            <Divider horizontal className="border-main-4"/>
            <Link className={buttonStyles({look: "soft", size: "sm"})} to="button">Button</Link>
            <Link className={buttonStyles({look: "soft", size: "sm"})} to="select">Select</Link>
            <Link className={buttonStyles({look: "soft", size: "sm"})} to="input">Input</Link>
          </Box>
          <Box size='md' content="sm">
            <Title h={3}>Pages</Title>
            <Divider horizontal className="border-main-4"/>
            <Link className={buttonStyles({look: "soft", size: "sm"})} to="page/swap">Swap</Link>
            <Link className={buttonStyles({look: "soft", size: "sm"})} to="page/token">Token</Link>
            <Link className={buttonStyles({look: "soft", size: "sm"})} to="page/pool">Pool</Link>
          </Box>
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
