import { tv } from "tailwind-variants"
import type { Component } from "../utils/types"

export const titleStyles = tv({
    base: "text-main-12",
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

export type TitleProps = Component<typeof titleStyles> & {
    h: 1 | 2 | 3 | 4 | 5
}

export default function Title({ look, h, children }: TitleProps) {
    switch (h) {
        case 1:
            return <h1 className={titleStyles({ look, h })} children={children} />;
        case 2:
            return <h2 className={titleStyles({ look, h })} children={children} />;
        case 3:
            return <h3 className={titleStyles({ look, h })} children={children} />;
        case 4:
            return <h4 className={titleStyles({ look, h })} children={children} />;
        case 5:
            return <h5 className={titleStyles({ look, h })} children={children} />;
        default:
            break;
    }
}