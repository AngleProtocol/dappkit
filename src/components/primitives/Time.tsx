import moment from "moment";
import { useMemo } from "react";

export type TimeProps = {
  timestamp: number | bigint;
  relative?: "hours" | "day" | "auto";
};

export default function Time({ timestamp, relative }: TimeProps) {
  const time = useMemo(() => {
    const then = moment(Number(timestamp)).fromNow();

    return then
      .replace("/ minute| minutes/g", "m")
      .replace(/\ba\b/, "1")
      .replace(/ seconds| second/g, "s")
      .replace(/ hours| hour/g, "h")
      .replace(/ days| day/g, "d")
      .replace(/ months| month/g, "d");
  }, [timestamp, relative]);

  return time;
}
