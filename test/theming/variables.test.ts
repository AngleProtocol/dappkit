import { reduceThemeIntoVariables } from "@/theming/coloring";
import { generateVariableAssigners } from "@/theming/tailwind";
import { describe, expect, it } from "bun:test";

describe("Generating css variables", () => {
  it("Matches semantically between tailwind classes and css variables", () => {
    console.log(generateVariableAssigners());
    console.log(
      Object.keys(
        reduceThemeIntoVariables({
          dark: { accent: "#FC72FF", main: "#3D3D3D" },
          light: { accent: "#FC72FF", main: "#131313" },
        })[0]
      ),
    );
  });
});
