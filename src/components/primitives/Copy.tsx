import { Icon, OverrideTheme, type Styled, Text, mergeClass } from "../..";
import useClipboard from "../../hooks/useClipboard";
import type { TextProps } from "./Text";

import type { textStyles } from "./Text";

export type CopyProps = Omit<TextProps, "children" | "value"> & {
  value: string;
  size?: Styled<typeof textStyles>["size"];
};

export default function Copy({ size, value, className, ...props }: CopyProps) {
  const { copy: copyCall, isCopied } = useClipboard();
  return (
    <Text size={size} {...props} className={mergeClass("dim select-none inline-flex", className)}>
      <OverrideTheme coloring={isCopied ? "good" : undefined}>
        <Icon
          className="text-main-11"
          remix={isCopied ? "RiCheckboxCircleFill" : "RiFileCopyFill"}
          onClick={() => copyCall(value)}
        />
      </OverrideTheme>
    </Text>
  );
}
