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
    concept: ["themes", "dsq"],
    primitives: ["card", "box", "group", "list", "text", "title", "icon", "tooltip"],
    interactive: ["button", "select", "input", "slider", "checkbox"],
  };

  return (
    <div className="font-sans p-lg">
      <Title h1 h2 >Select</Title>
    </div>
  );
}
