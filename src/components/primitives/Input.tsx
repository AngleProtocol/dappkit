
import { mergeClass } from '../../utils/css';
import type { Component, Styled } from 'src/utils/types';
import { tv } from 'tailwind-variants';

export const inputStyles = tv({
    base: "text-main-11 flex items-center gap-1 border-1 outline-offset-0 outline-0 text-nowrap",
    variants: {
        look: {
            soft: "bg-main-2 border-main-2 hover:border-main-4 active:border-main-7 hover:text-main-12 focus-visible:border-main-7",
            base: "bg-main-0 border-main-4 hover:border-main-4 active:border-main-7 hover:text-main-12 focus-visible:border-main-7",
            bold: "bg-main-1 border-main-1 hover:bg-main-2 active:bg-main-2 text-main-12 focus-visible:border-main-9",
            tint: "bg-primary-4 border-primary-6 hover:bg-primary-5 active:bg-primary-3 text-main-12 focus-visible:border-primary-9",
            hype: "bg-primary-9 border-primary-6 hover:bg-primary-10 active:bg-border-8 text-primary-12 focus-visible:border-primary-10"
        },
        size: {
            xs: "px-xs py-xs text-xs rounded-xs",
            sm: "px-sm py-sm text-sm rounded-sm",
            md: "px-md py-md text-md rounded-md",
            lg: "px-lg py-lg text-lg rounded-lg",
            xl: "px-xl py-xl text-xl rounded-xl"
        }
    },
    defaultVariants: {
        size: "md",
        look: "base"
    }
})

export type InputProps = Component<Styled<typeof inputStyles>, HTMLInputElement>

export default function Input({ look, size, className, ...props }: InputProps) {
    return <input className={mergeClass(inputStyles({ look, size }), className)} {...props} />
}