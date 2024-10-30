import * as RemixIcon from "@remixicon/react";
import { mergeClass } from "dappkit";
import type { Component, Styled } from "dappkit";
import { useMemo } from "react";
import { tv } from "tailwind-variants";
import Image from "./Image";

export const iconStyles = tv({
  base: "flex flex-col border-0 gap-1 self-center aspect-square rounded-sm",
  variants: {
    size: {
      xs: "w-sm*2",
      sm: "w-md*2",
      md: "w-lg*2",
      lg: "w-xl*2",
      xl: "w-xl*4",
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

  return <Component className={mergeClass(styles, className)} />;
}
