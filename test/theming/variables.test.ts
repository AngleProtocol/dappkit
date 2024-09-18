import { createColoring, reduceColorIntoVariables } from "@/theming/coloring";
import { reduceSpacingIntoVariables } from "@/theming/spacing";
import { generateVariableAssigners } from "@/theming/tailwind";
import { sizes } from "@/theming/variables";
import { describe, expect, it } from "bun:test";

describe("Generating css variables", () => {
  it("Matches semantically between tailwind classes and css variables", () => {
    // console.log(generateVariableAssigners());
    // console.log(
    //   reduceColorIntoVariables({
    //     dark: { accent: "#FC72FF", main: "#3D3D3D" },
    //     light: { accent: "#FC72FF", main: "#131313" },
    //   }).dark,
    // );
    // console.log(reduceSpacingIntoVariables({ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }, "spacing"));
    // console.log('a:', sizes.flatMap((size) =>
    //   sizes.flatMap((content) => [
    //     {
    //       size,
    //       content,
    //       container: true as const,
    //       class: `rounded-${size}+${content}` as `rounded-${typeof size}+${typeof content}`,
    //     },
    //     {
    //       size,
    //       content,
    //       container: false as const,
    //       class: `rounded-${size}` as `rounded-${typeof size}`,
    //     },
    //   ]),
    // ))
    // console.log(reduceColorIntoVariables(createColoring(["black", "white"], ["black", "white"])));
  });
});
