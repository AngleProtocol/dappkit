import * as RemixIcon from "@remixicon/react";
import { mergeClass } from "dappkit";
import type { Component, Styled } from "dappkit";
import { useMemo } from "react";
import { tv } from "tailwind-variants";
import Image from "./Image";

export const iconStyles = tv({
  base: "flex flex-col border-0 gap-1 rounded-md overflow-hidden self-center rounded-sm",
  variants: {
    size: {
      xs: "w-xs*4 h-xs*4",
      sm: "w-sm*4 h-sm*4",
      md: "w-md*4 h-md*4",
      lg: "w-lg*4 h-lg*4",
      xl: "w-xl*4 h-xl*4",
    },
    rounded: {
      true: "rounded-full",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
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

export default function Icon({
  size,
  rounded,
  remix,
  src,
  alt,
  className,
  ...props
}: IconProps) {
  const styles = useMemo(() => iconStyles({ size, rounded }), [size, rounded]);

  const Component = useMemo(() => {
    if (remix) return RemixIcon[remix];
    return () => (
      <Image
        className={mergeClass(styles, className)}
        alt={alt}
        src={src}
        {...props}
      />
    );
  }, [remix, alt, src, props]);

  return <Component {...props} className={mergeClass(styles, className)} />;
}
