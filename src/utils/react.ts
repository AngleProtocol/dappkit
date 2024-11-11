import { Children, type ReactNode } from "react";

export function getDefinedIndexesOfChildren(children: ReactNode): [number | null, number | null] {
    const childs = Children.toArray(children);
    let firstIndex = null;
    let lastIndex = null;

    for (let index = 0; index < childs.length; index++) {
        if (firstIndex === null && childs[index] != null) firstIndex = index;
        lastIndex = index;
    }
    return [firstIndex, lastIndex];
}