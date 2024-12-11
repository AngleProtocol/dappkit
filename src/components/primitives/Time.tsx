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
      .replace(/in\s/, prefix ? `${prefix} ` : "in ")
      .replace(/\bminute(s?)\b/g, "m")
      .replace(/\bsecond(s?)\b/g, "s")
      .replace(/\bhour(s?)\b/g, "hours")
      .replace(/\bday(s?)\b/g, "days")
      .replace(/\bmonth(s?)\b/g, (match, plural) => (plural ? "months" : "month"));
  }, [timestamp, prefix]);

  return time;
}
