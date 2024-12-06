import * as RadixAccordion from "@radix-ui/react-accordion";

import { motion } from "framer-motion";
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

export type AccordionProps = Component<Styled<typeof accordionStyles> & { items: itemsProps[] }>;

export type itemsProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  key: string;
};

export default function Accordion({ look, size, items, className }: AccordionProps) {
  return (
    <RadixAccordion.Root
      className={mergeClass(accordionStyles({ look: look ?? "base", size: size ?? "md" }), className)}
      type="single"
      collapsible>
      {items.map((item, index) => {
        return (
          <div className="[&>*]:first:pt-0 w-full overflow-y-hidden" key={item.key}>
            <motion.div
              className="border-b-2 py-lg*2 border-accent-11"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ delay: 0.2 * index }}
              viewport={{ once: true }}>
              <RadixAccordion.Item value={`item-${index}`} className="faq-item">
                <RadixAccordion.Trigger className="faq-item__trigger text-left overflow-hidden [&>*]:text-accent-11 [&>svg]:data-[state=closed]:rotate-180 [&>svg]:data-[state=open]:rotate-0 w-full flex items-center justify-between">
                  <Title h={3} className="ease">
                    {item.trigger}
                  </Title>
                  <Icon remix="RiArrowUpSLine" className="text-2xl ease" alt="cross" aria-hidden />
                </RadixAccordion.Trigger>
                <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp xl:w-4/5 text-main-12">
                  <div className="pt-xl">{item.content}</div>
                </RadixAccordion.Content>{" "}
              </RadixAccordion.Item>
            </motion.div>
          </div>
        );
      })}
    </RadixAccordion.Root>
  );
}
