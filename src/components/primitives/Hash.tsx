import { Icon, mergeClass, OverrideTheme } from "dappkit/src";
import { useMemo } from "react";
import Text, { type TextProps } from "./Text";
import useClipboard from "../../hooks/useClipboard";

export type HashProps = Omit<TextProps, "children"> & {
  format: "full" | "short" | "prefix";
  value?: boolean;
  children?: string;
  copy?: boolean
};

export default function Hash({ format, value, copy, children: hash, className, ...props }: HashProps) {
  const formatted: string = useMemo(() => {
    if (!hash) return "";

    switch (format) {
      case "prefix":
        return hash.slice(0, 6);
      case "short":
        return `${hash?.substring(0, 6)}…${hash.substring(hash.length, hash.length - 4)}`;
      default:
        return hash;
    }
  }, [hash, format]);

  const { copy: copyCall, isCopied} = useClipboard();
  const copyButton = useMemo(() => copy && <OverrideTheme coloring={isCopied ? "good" : undefined}><Icon className="text-main-9" size="sm" remix={isCopied ? "RiCheckboxCircleFill" : "RiFileCopyLine"}/></OverrideTheme>, [copy, isCopied])

  if (value) return <span className="font-mono">{formatted}</span>;
  return (
    <Text onClick={() => copyCall(hash)} {...props} className={mergeClass("hover:underline active:no-underline cursor-pointer font-mono gap-sm", copy && "select-none inline-flex", className)}>
      {formatted}
      {copyButton}
    </Text>
  );
}
