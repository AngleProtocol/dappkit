import type { PropsWithChildren } from "react";
import type { Component } from "../../utils/types";

export type EventBlockerProps = Component<PropsWithChildren>;

export default function EventBlocker({ ...props }: EventBlockerProps) {
  return (
    <div
      {...props}
      onKeyDown={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
}
