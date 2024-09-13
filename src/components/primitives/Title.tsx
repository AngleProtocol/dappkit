import { tv } from "tailwind-variants"
import type { Component, Styled } from "../../utils/types"
import clsx from "clsx"

export const titleStyles = tv({
    base: "text-main-12 font-main font-medium",
    variants: {
        look: {
            base: "text-main-12",
            soft: "text-main-11",
            bold: "text-secondary-12",
            hype: "text-primary-12"
        },
        h: {
            1: "text-3xl",
            2: "text-2xl",
            3: "text-xl",
            4: "text-md",
            5: "text-sm"
        }
    },
    defaultVariants: {
        size: "md",
        look: "base"
    }
})

export type TitleProps = Component<Styled<typeof titleStyles> & {
    h: 1 | 2 | 3 | 4 | 5
}, HTMLHeadingElement>

export default function Title({ look, h, className, ...props }: TitleProps) {
    switch (h) {
        case 1:
            return <h1 className={clsx(titleStyles({ look, h }), className)} {...props} />;
        case 2:
            return <h2 className={clsx(titleStyles({ look, h }), className)} {...props} />;
        case 3:
            return <h3 className={clsx(titleStyles({ look, h }), className)} {...props} />;
        case 4:
            return <h4 className={clsx(titleStyles({ look, h }), className)} {...props} />;
        case 5:
            return <h5 className={clsx(titleStyles({ look, h }), className)} {...props} />;
        default:
            break;
    }
}