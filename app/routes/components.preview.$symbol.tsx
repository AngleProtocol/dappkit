import { json, type MetaFunction } from "@remix-run/node";
import Group from "src/extenders/Group";
import Box from "src/primitives/Box";
import Button from "src/primitives/Button";
import Input from "src/primitives/Input";
import Title from "src/primitives/Title";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart"
import { Bar, BarChart, AreaChart, Area, AreaS, CartesianGrid, XAxis, ResponsiveContainer, LineChart, Tooltip, YAxis, Line, Legend } from "recharts"
import { useLoaderData } from "@remix-run/react";
import Thief from "colorthief";

export const meta: MetaFunction = () => {
  return [
    { title: "DappKit/Buttons" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    optimism: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    optimism: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    optimism: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    optimism: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    optimism: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    optimism: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    optimism: 2100,
  },
];

export async function loader({ params }) {
  const res = await (await fetch("https://api.merkl.xyz/v1/tokens")).json() as any as { [chain: number]: { [address: string]: { logoURI: string, symbol: string } } };

  const token = () => {
    for (const [chain, tokens] of Object.entries(res)) {
      for (const [address, token] of Object.entries(tokens)) {
        if (token.symbol.toLowerCase() === params.symbol.toLowerCase())
          return token.logoURI;
      }
    }
  }

  console.log(token());
  


  return json(token() ?? "nnoen;dsqh");
}

export default function Previews() {

  return (
    <div>
      <Box look="hype">
        <Title h1 >Previews</Title>
        {/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full"> */}
        <Box className="flex">

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} stroke="var(--main-6)" />
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Area type="monotone" dataKey="uv" stackId="1" stroke="var(--primary-8)" fill="var(--primary-11)" />
              <Area type="monotone" dataKey="pv" stackId="1" stroke="#1755F4" fill="#1755F4" />
              <Area type="monotone" dataKey="optimism" stackId="1" stroke="#FF0420" fill="#FF0420" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>


        {/* </ChartContainer> */}
        <Group className="flex-col">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) =>
            <Group key={size}>{
              (["base", "soft", "bold", "hype"] as const).map((look) =>
                <Input key={look} size={size} look={look} />
              )
            }</Group>
          )}
        </Group>
      </Box>
    </div>
  );
}
