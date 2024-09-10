import { tv } from "tailwind-variants"
import type { Component, Styled } from "../utils/types"
import { boxStyles } from "../primitives/Box"

export const groupStyles = tv({
    extend: boxStyles,
    base: "flex-row bg-main-0 p-0 border-0 flex-wrap",
    variants: {
        look: {
            base: "bg-main-0",
            soft: "bg-main-0",
            bold: "bg-main-0",
            hype: "bg-main-0"
        },
        size: {
            xs: "p-0",
            sm: "p-0",
            md: "p-0",
            lg: "p-0",
            xl: "p-0"
        }
    },
    defaultVariants: {
        size: "md",
        look: "base"
    }
})

export type GroupProps = Component<Styled<typeof groupStyles>, HTMLDivElement>

export default function Group({ look, size, className, ...props }: GroupProps) {
    return <div className={[groupStyles({ look, size }), className].join(' ')} {...props} />
}