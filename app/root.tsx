import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "remixicon/fonts/remixicon.css"
import ThemeProvider from "./src/theme/Theme.context";
import type { LinksFunction } from "@remix-run/node";

// eslint-disable-next-line import/no-duplicates
import styles from "./tailwind.css?url";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles, as: "style" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body> 
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <ThemeProvider><Outlet /></ThemeProvider>;
}
