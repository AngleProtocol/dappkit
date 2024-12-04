import * as RemixIcon from "@remixicon/react";
import { mergeClass } from "dappkit";
import type { Component, Styled } from "dappkit";
import { useMemo } from "react";
import { tv } from "tailwind-variants";
import Image from "./Image";

export const iconStyles = tv({
  base: "flex flex-col border-0 gap-1 overflow-hidden self-center rounded-sm w-[calc(1em+2px)] h-[calc(1em+2px)]",
  variants: {
    size: {
      xs: "w-xs h-xs",
      sm: "w-sm h-sm",
      md: "w-md h-md rounded-md",
      lg: "w-lg h-lg rounded-md",
      xl: "w-xl h-xl rounded-lg",
    },
    rounded: {
      true: "rounded-full",
      false: "",
    },
  },
  defaultVariants: {
    rounded: false,
  },
});

export type IconProps = Component<
  Styled<typeof iconStyles> & {
    src?: string;
    remix?: keyof typeof RemixIcon;
  },
  HTMLImageElement
>;

export default function Icon({ rounded, remix, src, alt, className, ...props }: IconProps) {
  const styles = useMemo(() => iconStyles({ rounded }), [rounded]);

  const Component = useMemo(() => {
    if (remix) return RemixIcon[remix];
    return () => {
      const { size, ...rest } = props;

      return <Image className={mergeClass(styles, className)} alt={alt} src={src} {...rest} />;
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [remix, alt, src, className, styles, props]);

  return <Component {...props} className={mergeClass(styles, className)} />;
}
