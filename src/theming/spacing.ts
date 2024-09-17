import type { CssVariable, Sizing } from "./variables";

/**
 * Assigns spacing scale to the corresponding css variables
 * @returns returns css variables
 */
export function reduceSpacingIntoVariables<N extends string>(spacing: Sizing, varName: N) {
  return Object.entries(spacing).reduce(
    (obj, [space, value]) => Object.assign(obj, { [`var(--${varName}-${space})`]: value }),
    {} as { [S in keyof Sizing as CssVariable<`${N}-${S}`>]: number },
  );
}