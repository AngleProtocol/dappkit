import { tv } from "tailwind-variants"
import type { Component, Styled } from "../../utils/types"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { mergeClass } from "src/utils/css"

export const boxStyles = tv({
    base: "flex flex-col border-1 gap-1 p-2",
    variants: {
        look: {
            base: "bg-main-2 border-main-3 text-main-12",
            soft: "bg-main-0 border-main-3",
            bold: "bg-primary-4 border-main-5 text-main-12",
            hype: "bg-primary-9 border-main-10 text-primary-12"
        },
        size: {
            xs: "",
            sm: "",
            md: " p-4 gap-2 rounded-lg",
            lg: "p-4 gap-4 rounded-lg",
            xl: "p-4 gap-6 rounded-xl"
        }
    },
    defaultVariants: {
        size: "md",
        look: "base"
    }
})

export type BoxProps = Component<Styled<typeof boxStyles>>

export default function Box({look, size, className, ...props}: BoxProps) {
    return <div className={mergeClass(boxStyles({look, size}), className)} {...props}/>
}