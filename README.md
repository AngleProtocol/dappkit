# DappKit

A component library designed to quickly create customizable and accessible user interfaces for EVM decentralized applications. 

Built upon [React](https://react.dev/), [Tailwind](https://tailwindcss.com/) + [Variants](https://www.tailwind-variants.org/), [Radix Primitives](https://www.radix-ui.com/primitives) and [Wagmi](https://wagmi.sh/react/getting-started).

## Concept

The DappKit theme exposes 3 scales of 12 colors that can be customized using the Radix Colors guidelines:

### Tailwind Variables

To be able to define some component styling with abstract colors, we define scales of 12 colors and use them according to the [radix color guidelines](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale):

![image](https://github.com/user-attachments/assets/67109bff-eb4c-43a6-8e5a-7f50773dcc65)

Radix also provides a way to generate appropriates scales from a single color ([preview](https://www.radix-ui.com/colors/custom)), we can then make the configuration only be one color per scale. Instead of defining tailwind color classes with colors, we map them to css variables (`bg-main-2: 'var(--main-2)'`), which gives us room to add a variable declaration later on to assign a color to that class.

![image](https://github.com/user-attachments/assets/6c38d21c-0b5e-4c2a-ac0d-5f46fb0050ce)

### Tailwind Variants

Once we have access to variables through tailwind classes, for each component we can define variants, and map each one to tailwind classes thanks to the [tailwind-variants](https://www.tailwind-variants.org/docs/variants) library.

![image](https://github.com/user-attachments/assets/5e64ace6-c88e-4d8f-b6a7-c9f16521c70f)

Thanks to some generic typing and utility functions we can elegantly define components: 

```tsx
import { mergeClass } from 'src/utils/css';
import type { Component, Styled } from 'src/utils/types';
import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
    base: "text-main-11 flex items-center gap-1 border-1 outline-offset-0 outline-0 text-nowrap",
    variants: {
        look: {
            base: "bg-main-4 border-main-7 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
            soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
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

export type ButtonProps = Component<Styled<typeof buttonStyles>, HTMLButtonElement>

export default function Button({ look, size, className, ...props }: ButtonProps) {
    return <button className={mergeClass(buttonStyles({ look, size }), className)} {...props} type="button"/>
}
```

We then use them in the code in an abstract manner, the configuration of the theme and the variables will take care of styling it:

```tsx
function AnAbstractedButton() {
  return <Button size="lg" look="hype">Explore opportunities</Button>
}
```

## Usage

## Development

You can preview and develop component using the included [Remix](https://remix.run/) app.

```shellscript
npm run dev
```
