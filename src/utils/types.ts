import type { PropsWithChildren } from "react";
import type { TVReturnType } from "tailwind-variants";

export type Variant<T extends TVReturnType, Key extends keyof T["variants"]> = keyof T["variants"][Key];
export type Component<T extends TVReturnType, Key extends keyof T["variants"] = keyof T["variants"]> = PropsWithChildren<{[K in Key]?: Variant<T, K>}>;