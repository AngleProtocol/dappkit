import * as RemixIcon from "@remixicon/react";
import { mergeClass } from "dappkit";
import type { Component, Styled } from "dappkit";
import { useMemo } from "react";
import { tv } from "tailwind-variants";
import Image from "./Image";

export const iconStyles = tv({
  base: "flex flex-col border-0 gap-1 rounded-md overflow-hidden self-center rounded-sm w-[calc(1em+2px)] h-[calc(1em+2px)]",
  variants: {
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
    return () => <Image className={mergeClass(styles, className)} alt={alt} src={src} {...props} />;
  }, [remix, alt, src, props]);

  return <Component {...props} className={mergeClass(styles, className)} />;
}
