import moment from "moment";
import { useMemo } from "react";

export type TimeProps = {
  timestamp: number | bigint;
  prefix?: string;
  relative?: "hours" | "day" | "auto";
};

export default function Time({ timestamp, prefix }: TimeProps) {
  const time = useMemo(() => {
    const then = moment(Number(timestamp)).fromNow();

    return then
      .replace("in ", (prefix && `${prefix} `) ?? "in ")
      .replace("/ minute| minutes/g", "m")
      .replace(/\ba\b/, "1")
      .replace(/ seconds| second/g, "s")
      .replace(/ hours| hour/g, "hours")
      .replace(/ days| day/g, " days")
      .replace(/ months| month/g, " months");
  }, [timestamp, prefix]);

  return time;
}
