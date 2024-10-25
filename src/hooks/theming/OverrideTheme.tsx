import { Theme } from "src/theming/coloring";
import type { Coloring, State } from "../../theming/variables";
import useThemedVariables from "./useThemedVariables";
import { PropsWithChildren } from "react";

export type OverrideThemeProps = {
    coloring?: Coloring | State;
    accent?: Coloring | State;
}

/**
 * 
 * @param coloring applies a whole  
 * @returns 
 */
export default function OverrideTheme({coloring, accent, children}: PropsWithChildren<OverrideThemeProps>) {
    const vars = useThemedVariables(coloring, accent);    
    
    return <div style={vars}>
        {children}
    </div>
}