import type { Themable } from "../../utils/types";
import useThemedVariables from "./useThemedVariables";

export default function useThemableProps(props: Themable) {
  return useThemedVariables(props.coloring, props.accent, props.mode);
}
