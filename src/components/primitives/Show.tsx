import type { PropsWithChildren } from "react";

/**
 * Shorthand for conditionally displaying components
 * @param if show or not
 */
export default function Show({ if: enabled, children }: PropsWithChildren<{ if: boolean }>) {
  //TODO: add collapsible options to animate enabling/disabling
  if (!enabled) return;
  return children;
}
