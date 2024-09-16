import { type Size, sizes } from "./variables";

/**
 * Returns size utility classes from the scale
 */
export function deriveSizingUtilityClasses(radius: number[], padding: number[]) {
    const radiusClasses: { [S in Size]: number } & { [S in `${Size}+${Size}`]: number } =
      sizes.reduce(
        (obj, size, index) => {
          return Object.assign(
            obj,
            { [size]: radius[index] },
            sizes.reduce((_obj, _size, _index) =>
              Object.assign(_obj, { [`${size}+${_size}`]: radius[index] + padding[_index] }),
            ),
            {} as { [S in `${Size}+${Size}`]: number },
          );
        },
        {} as { [S in Size]: number } & { [S in `${Size}+${Size}`]: number },
      );
  
    const paddingClasses: { [S in Size]: number } & { [S in `${Size}+${Size}`]: number } & {
      [S in `${Size}${"*" | "/"}${2 | 4}`]: number;
    } = sizes.reduce(
      (obj, size, index) => {
        return Object.assign(
          obj,
          { [size]: padding[index] },
          [2, 4].reduce((_obj, factor, _index) =>
            Object.assign(_obj, {
              [`${size}/${factor}`]: padding[index] / factor,
              [`${size}*${factor}`]: padding[index] * factor,
            }),
          ),
          {} as { [S in `${Size}${"*" | "/"}${2 | 4}`]: number },
        );
      },
      {} as { [S in Size]: number } & { [S in `${Size}+${Size}`]: number } & {
        [S in `${Size}${"*" | "/"}${2 | 4}`]: number;
      },
    );
  
    return { padding: paddingClasses, radius: radiusClasses };
  }
  