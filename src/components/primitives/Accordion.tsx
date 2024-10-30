import * as RadixAccordion from "@radix-ui/react-accordion";

import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";
import Icon from "./Icon";
import Title from "./Title";

export const accordionStyles = tv({
  base: "w-full flex items-center justify-between pb-xl",
  variants: {
    look: {
      soft: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12 focus-visible:border-main-9",
      base: "",
      bold: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
      tint: "bg-accent-3 border-accent-3 hover:bg-accent-5 active:bg-accent-3 text-accent-11 focus-visible:border-accent-9",
      hype: "bg-accent-9 border-accent-9 hover:bg-accent-10 active:bg-accent-8 text-main-12 focus-visible:border-accent-10",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
});

export type AccordionProps = Component<
  Styled<typeof accordionStyles> & { items: itemsProps[] }
>;

export type itemsProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  key: string;
};

export default function Accordion({
  look,
  size,
  items,
  className,
}: AccordionProps) {
  return (
    <RadixAccordion.Root
      className={mergeClass(
        accordionStyles({ look: look ?? "base", size: size ?? "md" }),
        className
      )}
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {items.map((item, index) => {
        return (
          <RadixAccordion.Item
            key={item.key}
            className="w-full border-b-2 py-xl border-accent-10 first:pt-0 focus-within:relative focus-within:z-10 focus-within:outline-dotted focus-within:outline-offset-4 focus-within:outline-accent-8"
            value={`item-${index}`}
          >
            <RadixAccordion.Trigger className="text-left overflow-hidden text-main-12 [&>svg]:data-[state=open]:rotate-0 [&>*]:data-[state=open]:!text-accent-12 w-full flex items-center justify-between">
              <Title h={3} className="ease">
                {item.trigger}
              </Title>
              <Icon
                remix="RiCloseLargeFill"
                className="rotate-45 ease"
                alt="cross"
                aria-hidden
              />
            </RadixAccordion.Trigger>

            <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp xl:w-4/5 text-accent-12">
              <div className="pt-xl"> {item.content}</div>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        );
      })}
    </RadixAccordion.Root>
  );
}
