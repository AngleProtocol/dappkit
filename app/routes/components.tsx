import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import Group from "src/extenders/Group";
import Select from "src/extenders/Select";
import Box from "src/primitives/Box";
import Button from "src/primitives/Button";
import Title from "src/primitives/Title";
import { useTheme } from "src/theme/Theme.context";

export const meta: MetaFunction = () => {
  return [
    { title: "DappKit/Components" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { themes, theme, setTheme, setMode, mode } = useTheme();

  // console.log(Object.keys(themes).reduce((obj, theme) => Object.assign(obj, { [theme]: theme }), {}));

  return (
    <div className="font-sans p-4">
      <Group size="lg" className="grid grid-cols-[200px,1fr] w-full">
        <Group size="lg" className="flex-col">
          {/* <Select value={theme} options={Object.keys(themes).reduce((obj, theme) => Object.assign(obj, { [theme]: theme }), {})} /> */}
          <Box>
            <Title h={3}>Components</Title>
            <Link to='button'>Button</Link>
            <Link to='select'>Select</Link>
            <Link to='input'>Input</Link>
            <Link to='preview'>Previews</Link>
          </Box>
          <Box>
            <Title h={3}>Themes</Title>
            <Group className="flex-col">
              <Select value={mode} onValueChange={setMode} options={{ dark: "Dark", light: "Light" }} />
              {Object.keys(themes).map((t) => <Button key={t} onClick={() => setTheme(t)}>{t}</Button>)}
            </Group>
          </Box>
        </Group>
        <Outlet />
      </Group>
    </div>
  );
}
