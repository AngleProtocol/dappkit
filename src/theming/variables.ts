import type { Config as TailwindConfig } from "tailwindcss";

/**
 * Default size array to be defined for components and tailwind classes
 */
export const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
export type Size = (typeof sizes)[number];

/**
 * Default look array to be defined for components and tailwind classes
 */
export const looks = ["soft", "base", "bold", "tint", "hype"] as const;
export type Look = (typeof looks)[number];

/**
 * Colors that needs to be defined in a theme
 */
export const colors = ["main", "accent"] as const;
export type Color = (typeof colors)[number];

/**
 * Modes that needs to be defined in a theme
 */
export const modes = ["dark", "light"] as const;
export type Mode = (typeof modes)[number];

/**
 * Colors that needs to be defined in a theme
 */
export type Coloring = { [M in Mode]: { [C in Color]: string } };

/**
 * Sizes that needs to be defined in a theme
 */
export type Sizing = { [S in Size]: number };

export type CssVariable<T extends string> = `var(--${T})`;

/**
 * Generates the utility classes for colors that maps to to-be-defined css variables
 * @returns an object with {[X(1...12)]: var(--name-X)}
 */
export function generateColorScale<N extends string>(name: N) {
  const scale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

  return scale.reduce(
    (obj, value) => Object.assign(obj, { [value]: `var(--${name}-${value})` }),
    {} as { [V in (typeof scale)[number]]: CssVariable<`${N}-${V}`> },
  );
}

/**
 * Generates the utility classes for spacing that maps to to-be-defined css variables
 * @returns an object with {[X(1...12)]: var(--name-X)} + utility extensions such as X/2 X*2 etc...
 */
export function generateSpacingScale<N extends string>(name: N) {
  type SpacingVariant<ClassSuffix extends string, VariableSuffix extends string> = {
    [V in `${Size}${ClassSuffix}`]: CssVariable<`${N}-${VariableSuffix}`>;
  };

  return sizes.reduce(
    (obj, value) =>
      Object.assign(
        obj,
        { [value]: `var(--${name}-${value})` },
        { [`${value}*2`]: `var(--${name}-${value}-mul-2)` },
        { [`${value}*4`]: `var(--${name}-${value}-mul-4)` },
        { [`${value}/2`]: `var(--${name}-${value}-div-2)` },
        { [`${value}/4`]: `var(--${name}-${value}-div-4)` },
      ),
    {} as { [V in Size]: CssVariable<`${N}-${V}`> } & SpacingVariant<"*2", "mul-2"> &
      SpacingVariant<"*4", "mul-4"> &
      SpacingVariant<"/2", "div-2"> &
      SpacingVariant<"/4", "div-4">,
  );
}

/**
 * Generates the utility classes for radius that maps to to-be-defined css variables
 * @returns an object with {[X(1...12)]: var(--name-X)} + padding extensions such as {[X(1...12)+X(1...12)]: var(--name-X)}
 */
export function generateRadiusScale<N extends string>(name: N) {
  type RadiusExtension<S extends Size = "xs"> = {
    [V in Size as `${S}+${Size}`]: `calc(${CssVariable<`${N}-${S}`>}+${CssVariable<`${N}-${V}`>})`;
  };

  return sizes.reduce(
    (obj, value) =>
      Object.assign(
        obj,
        { [value]: `var(--${name}-${value})` },
        sizes.reduce(
          (_obj, _value) =>
            Object.assign(_obj, {
              [`${value}+${_value}`]: `calc(var(--${name}-${value})+var(--${name}-${_value}))`,
            }),
          {} as RadiusExtension<typeof value>,
        ),
      ),
    {} as { [V in Size]: CssVariable<`${N}-${V}`> } & RadiusExtension<Size>,
  );
}

/**
 * Generates tailwind classes as css variables for all theme related variables
 */
export function generateVariableAssigners(): TailwindConfig["theme"] {
  return {
    colors: {
      main: generateColorScale("main"),
      accent: generateColorScale("accent"),
    },
    borderRadius: generateRadiusScale("radius"),
    padding: generateSpacingScale("spacing"),
    margin: generateSpacingScale("spacing"),
    gap: generateSpacingScale("spacing"),
  };
}
