import type { PropsWithChildren } from "react";
import type { Component } from "../../utils/types";

export type EventBlockerProps = Component<PropsWithChildren>;

export default function EventBlocker({ children, ...props }: EventBlockerProps) {
  return (
    <div
      {...props}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}>
      {children}
    </div>
  );
}
