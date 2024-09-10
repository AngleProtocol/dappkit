import type { PropsWithChildren } from "react";
import type { TVReturnType } from "tailwind-variants";

/**
 * Variant
 * @template T type to compound to the div's
 * @template Key type union of omitted keys
 */
export type Variant<
	T extends TVReturnType,
	Key extends keyof T["variants"],
> = keyof T["variants"][Key];

/**
 * Components
 * @template E HTML type
 * @template T type to compound to the div's
 * @template Key
 */
export type Styled<
	T extends TVReturnType,
	Key extends keyof T["variants"] = keyof T["variants"],
> = { [K in Key]?: Variant<T, K> };

/**
 * Components
 * @template E HTML type
 * @template T type to compound to the div's
 * @template Key
 */
export type Component<Props, Element = HTMLDivElement> = Props &
	Omit<React.AllHTMLAttributes<Element>, keyof Props>;

/**
 * Represents the type of a div element
 * @template E HTML type
 * @template T type to compound to the div's
 * @template O type union of omitted keys
 */
export type ElementWith<E, T, O extends string | number | symbol = ""> = T &
	Omit<Omit<React.AllHTMLAttributes<E>, keyof T>, O>;
