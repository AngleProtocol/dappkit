import type { CssVariable, Sizing } from "./variables";

/**
 * Assigns spacing scale to the corresponding css variables
 * @returns returns css variables
 */
export function reduceSpacingIntoVariables<N extends string>(spacing: Sizing, varName: N, unit = "px") {
  return Object.entries(spacing).reduce(
    (obj, [space, value]) => Object.assign(obj, { [`--${varName}-${space}`]: `${value}${unit}` }),
    {} as { [S in keyof Sizing as CssVariable<`${N}-${S}`>]: string },
  );
}
