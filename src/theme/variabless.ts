import { sizeScale } from "../utils/tailwind";

export const sizingScale = ["xs", "sm", "md", "lg", "xl"] as const;
export const empa = ["xs", "sm", "md", "lg", "xl"] as const;
export type SizingArray<T = number> = [T, T, T, T, T];
export type ColorArray<T = string> = [T, T, T, T, T, T, T, T, T, T, T, T];

export function fillVariables(name: string, variables: ColorArray) {
  return variables.reduce((vars, color, index) => Object.assign(vars, { [`--${name}-${index + 1}`]: color }), {});
}

export default function generateSizingVariables(radiusScale: SizingArray, paddingScale: SizingArray) {
  const radiuses = sizeScale.reduce(function distributeRadiusScale(variables, size, index) {
    const radius = radiusScale[index];

    return Object.assign(
      variables,
      { [size]: radius },
      sizeScale.reduce(function distributePaddingOffset(offsets, offset, pIndex) {
        const padding = radiusScale[pIndex];
        return Object.assign(offsets, { [`${size}+${offset}`]: radius + padding });
      }, {}),
    );
  }, {});

  const paddings = sizeScale.reduce(function distributePaddingScale(variables, size, index) {
    const padding = paddingScale[index];

    return Object.assign(
      variables,
      { [size]: padding },
      [2].reduce(function distributePaddingOffset(offsets, factor) {
        return Object.assign(
          offsets,
          { [`${size}/${factor}`]: padding / factor },
          { [`${size}*${factor}`]: padding * factor },
        );
      }, {}),
    );
  }, {});

  return {
    borderRadius: Object.entries(radiuses).reduce(
      (s, [className, value]) => Object.assign(s, { [className]: value }),
      {},
    ),
    padding: Object.entries(paddings).reduce((s, [className, value]) => Object.assign(s, { [className]: value }), {}),
  };
}
