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
      .replace(/in\s/, prefix ? `${prefix} ` : "In ")
      .replace(/a\s/, "1 ")
      .replace(/\bminute(s?)\b/g, "m")
      .replace(/\bsecond(s?)\b/g, "s")
      .replace(/\bhour(s?)\b/g, (_match, plural) => (plural ? "hours" : "hour"))
      .replace(/\bday(s?)\b/g, (_match, plural) => (plural ? "days" : "day"))
      .replace(/\bmonth(s?)\b/g, (_match, plural) => (plural ? "months" : "month"));
  }, [timestamp, prefix]);

  return time;
}
