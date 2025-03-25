import moment from "moment";
import { useMemo } from "react";

export type TimeProps = {
  timestamp: number | bigint;
  prefix?: string;
  relative?: "hours" | "day" | "auto";
};

export default function Time({ timestamp, prefix }: TimeProps) {
  const time = useMemo(() => {
    const targetTime = moment(Number(timestamp));
    const isPast = targetTime.isBefore(moment());

    const then = targetTime
      .fromNow()
      .replace(/in\s/, prefix ? `${prefix} ` : "End in ")
      .replace(/a\s/, "1 ")
      .replace(/\bminute(s?)\b/g, "m")
      .replace(/\bsecond(s?)\b/g, "s")
      .replace(/\bhour(s?)\b/g, (_match, plural) => (plural ? "hours" : "hour"))
      .replace(/\bday(s?)\b/g, (_match, plural) => (plural ? "days" : "day"))
      .replace(/\bmonth(s?)\b/g, (_match, plural) => (plural ? "months" : "month"));

    return isPast ? `Ended ${then}` : then;
  }, [timestamp, prefix]);

  return time;
}
