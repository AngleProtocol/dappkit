import { Icon, mergeClass, OverrideTheme, type Styled } from "dappkit/src";
import { useMemo } from "react";
import Text, { type TextProps } from "./Text";
import useClipboard from "../../hooks/useClipboard";

import type { textStyles } from "./Text";

export type HashProps = Omit<TextProps, "children"> & {
  format: "full" | "short" | "prefix";
  children?: string;
  size?: Styled<typeof textStyles>["size"];
  copy?: boolean;
};

export default function Hash({
  format,
  copy,
  size,
  children: hash,
  className,
  ...props
}: HashProps) {
  const formatted: string = useMemo(() => {
    if (!hash) return "";

    switch (format) {
      case "prefix":
        return hash.slice(0, 6);
      case "short":
        return `${hash?.substring(0, 6)}…${hash.substring(
          hash.length,
          hash.length - 4
        )}`;
      default:
        return hash;
    }
  }, [hash, format]);

  const { copy: copyCall, isCopied } = useClipboard();
  const copyButton = useMemo(
    () =>
      copy && (
        <OverrideTheme coloring={isCopied ? "good" : undefined}>
          <Icon
            className="text-main-11"
            remix={isCopied ? "RiCheckboxCircleFill" : "RiFileCopyFill"}
          />
        </OverrideTheme>
      ),
    [copy, isCopied]
  );

  return (
    <Text
      size={size}
      onClick={() => copyCall(hash)}
      {...props}
      className={mergeClass(
        "items-center gap-md cursor-pointer font-text",
        copy && "select-none inline-flex",
        className
      )}
    >
      {formatted}
      {copyButton}
    </Text>
  );
}
