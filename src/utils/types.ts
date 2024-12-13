import type { Dispatch, SetStateAction } from "react";
import type { Coloring, Mode, State } from "../theming/variables";

/**
 * Variant
 * @template T type to compound to the div's
 * @template Key type union of omitted keys
 */
export type Variant<
  T extends { variants: { [x: string]: unknown } },
  Key extends keyof T["variants"],
> = keyof T["variants"][Key];

/**
 * Components
 * @template E HTML type
 * @template T type to compound to the div's
 * @template Key
 */
export type Styled<
  T extends { variants: { [x: string]: unknown } },
  Key extends keyof T["variants"] = keyof T["variants"],
> = { [K in Key]?: Variant<T, K> extends "true" | "false" ? boolean : Variant<T, K> };

/**
 * Themable
 */
export type Themable = {
  theme?: Coloring | State;
  coloring?: Coloring | State;
  accent?: Coloring | State;
  mode?: Mode;
};

/**
 * Components
 * @template E HTML type
 * @template T type to compound to the div's
 * @template Key
 */
export type Component<Props, Element = HTMLDivElement> = Props & Omit<React.AllHTMLAttributes<Element>, keyof Props>;

/**
 * Represents the type of a div element
 * @template E HTML type
 * @template T type to compound to the div's
 * @template O type union of omitted keys
 */
export type ElementWith<E, T, O extends string | number | symbol = ""> = T &
  Omit<Omit<React.AllHTMLAttributes<E>, keyof T>, O>;

/**
 * [Getter, Setter] for a given react state
 * @template T type of the state
 */
export type GetSet<T> = [T | undefined, (v: T) => void];
