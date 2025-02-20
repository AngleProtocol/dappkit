import * as RemixIcon from "@remixicon/react";
import { type ReactElement, useMemo } from "react";
import { tv } from "tailwind-variants";
import { mergeClass } from "../..";
import type { Component, Styled, Themable } from "../..";
import useThemableProps from "../../hooks/theming/useThemableProps";
import Image from "./Image";

export const iconStyles = tv({
  base: "flex flex-col border-0 overflow-hidden self-center rounded-sm w-[1em] h-[1em]",
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
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
  Styled<typeof iconStyles> &
    Themable & {
      src?: string;
      remix?: keyof typeof RemixIcon;
    },
  HTMLImageElement
>;

export default function Icon({ rounded, remix, size, src, alt, className, ...props }: IconProps) {
  const themeVars = useThemableProps(props);
  const styles = useMemo(() => iconStyles({ rounded, size }), [rounded, size]);

  const Component = useMemo(() => {
    if (remix) return RemixIcon[remix] as () => ReactElement;
    return (imageProps: Component<unknown>) => <Image alt={alt} src={src} {...imageProps} />;
  }, [remix, alt, src]);

  return <Component {...props} style={themeVars} className={mergeClass(styles, className)} />;
}
