
import type { Component, Styled } from 'src/utils/types';
import { tv } from 'tailwind-variants';

export const inputStyles = tv({
    base: "text-main-11 flex items-center gap-1 border-1 outline-offset-0 outline-0 text-nowrap",
    variants: {
        look: {
            base: "bg-main-1 border-main-4 hover:bg-main-2 active:bg-main-2 text-main-12 focus-visible:border-main-9",
            soft: "bg-main-2 border-main-3 hover:bg-main-4 active:bg-main-3 hover:text-main-12 hover:border-main-6 focus-visible:border-main-7",
            bold: "bg-primary-4 border-primary-6 hover:bg-primary-5 active:bg-primary-3 text-main-12 focus-visible:border-primary-9",
            hype: "bg-primary-9 border-primary-6 hover:bg-primary-10 active:bg-primary-8 text-primary-12 focus-visible:border-primary-10"
        },
        size: {
            xs: "px-2 py-1 text-xs rounded",
            sm: "px-3 py-2 text-sm rounded-sm",
            md: "px-4 py-3 text-md rounded-md",
            lg: "px-5 py-4 text-lg rounded-lg",
            xl: "px-6 py-5 text-xl rounded-xl"
        }
    },
    defaultVariants: {
        size: "md",
        look: "base"
    }
})

export type InputProps = Component<Styled<typeof inputStyles>, HTMLInputElement>

export default function Input({ look, size, ...props }: InputProps) {
    return <input className={inputStyles({ look, size })} {...props} />
}