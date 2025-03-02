import moment from "moment";
import { useMemo } from "react";

export type DurationProps = {
  timestamp: number | bigint;
  relative?: "hours" | "day" | "auto";
};

export default function Duration({ timestamp }: DurationProps) {
  const time = useMemo(() => {
    const then = moment.duration(Number(timestamp)).humanize();

    return then
      .replace(/a\s/, "1 ")
      .replace(/\bminute(s?)\b/g, "m")
      .replace(/\bsecond(s?)\b/g, "s")
      .replace(/\bhour(s?)\b/g, (_match, plural) => (plural ? "hours" : "hour"))
      .replace(/\bday(s?)\b/g, (_match, plural) => (plural ? "days" : "day"))
      .replace(/\bmonth(s?)\b/g, (_match, plural) => (plural ? "months" : "month"));
  }, [timestamp]);

  return time;
}
