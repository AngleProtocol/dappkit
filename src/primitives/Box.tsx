import { tv } from "tailwind-variants"
import type { Component } from "../utils/types"

export const boxStyles = tv({
    base: "flex flex-col gap-1 p-2",
    variants: {
        look: {
            base: "bg-main-2 text-main-12",
            soft: "bg-main-0",
            bold: "bg-primary-4 text-main-12",
            hype: "bg-primary-9 text-primary-12"
        },
        size: {
            xs: "",
            sm: "",
            md: "p-4 gap-2 rounded-md",
            lg: "p-4 gap-4 rounded-lg",
            xl: "p-4 gap-6 rounded-xl"
        }
    },
    defaultVariants: {
        size: "md",
        look: "base"
    }
})

export type BoxProps = Component<typeof boxStyles>

export default function Box({look, size, ...props}: BoxProps) {
    return <div className={boxStyles({look, size})} {...props}/>
}