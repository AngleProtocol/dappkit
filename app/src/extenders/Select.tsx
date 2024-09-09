
import React, { useState, type PropsWithChildren, type ReactNode } from 'react';
import type { Variant } from '~/src/utils/types';
import { tv } from 'tailwind-variants';
import * as RadixSelect from '@radix-ui/react-select';
import { buttonStyles } from '~/src/primitives/Button';
import Icon from '~/src/primitives/Icon';
import { useTheme } from '../theme/Theme.context';
import clsx from 'clsx';

export const selectStyles = tv({
    extend: buttonStyles,
    base: "flex items-center gap-1",
    variants: {
        look: {
            base: "",
            soft: "",
            bold: "",
            hype: ""
        },
        size: {
            xs: "",
            sm: "",
            md: "",
            lg: "",
            xl: ""
        }
    },
    slots: {
        dropdown: "bg-main-4 mt-2 p-2",
        item: "bg-main-4 p-2 hover:bg-primary-8 hover:text-primary-12 text-main-12",
    }
})

export type SelectProps<Value extends string | number | symbol = string> = PropsWithChildren<{
    size?: Variant<typeof selectStyles, "size">
    look?: Variant<typeof selectStyles, "look">
    value?: Value;
    options?: { [key: string | number | symbol]: ReactNode }
}> & RadixSelect.SelectProps

const SelectItem = React.forwardRef(function Item({ children, ...props }: PropsWithChildren<{className: string}>, forwardedRef) {
    return (
        <RadixSelect.Item
            {...props}
            ref={forwardedRef}
        >
            <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
            <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">

            </RadixSelect.ItemIndicator>
        </RadixSelect.Item>
    );
});

export default function Select<Value extends string | number | symbol = string>({ look, size, options, ...props }: SelectProps<Value>) {
    const { vars } = useTheme();

    const { base, dropdown, item } = selectStyles({ look, size });

    return <RadixSelect.Root {...props}>
        <RadixSelect.Trigger className={base()} aria-label="Food">
            <RadixSelect.Value placeholder="Select a fruit" />
            <Icon remix='RiArrowDropDownLine' />
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
            <RadixSelect.Content position='popper' style={vars} className={clsx(dropdown(), "min-w-[var(--radix-select-trigger-width)]")}>
                <RadixSelect.Viewport>
                    <RadixSelect.Group>
                        {Object.entries(options ?? {}).map(([value, label]) => {
                            return <SelectItem className={item()} key={value} value={value}>{label}</SelectItem>
                        })}
                    </RadixSelect.Group>
                </RadixSelect.Viewport>
            </RadixSelect.Content>
        </RadixSelect.Portal>
    </RadixSelect.Root>
}