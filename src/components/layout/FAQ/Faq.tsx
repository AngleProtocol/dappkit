import type { FC } from "react";
import { FaqList } from "./FaqList";
import { Container } from "dappkit";
import Group from "../../extenders/Group";
import Title from "../../primitives/Title";
import Accordion from "../../primitives/Accordion";

export type FAQ = {
  question: string;
  answer: React.ReactNode | string;
  key: string;
};

const FaqQuestions = FaqList.map((faq) => faq.question);

export type FaqQuestion = (typeof FaqQuestions)[number];

// Utility function to get specific FAQs by question
export function getFaqsByQuestions(questions: FaqQuestion[]): FAQ[] {
  return questions.reduce<FAQ[]>((acc, question) => {
    const faq = FaqList.find((faq) => faq.question === question);
    if (faq) {
      acc.push(faq);
    }
    return acc;
  }, []);
}

const Faq: FC<{
  faqs: FaqQuestion[];
}> = ({ faqs }) => {
  const faqData = getFaqsByQuestions(faqs);

  const accordionItems = faqData.map((faq) => ({
    trigger: faq.question,
    content: faq.answer,
    key: faq.key,
  }));

  return (
    <section className="faq bg-main-1 py-xl*4">
      <Container>
        <Group className="gap-xl lg:gap-0 !items-start">
          <Group className="w-full lg:w-1/4">
            <Title h={2} className="!text-accent-10">
              FAQ
            </Title>
          </Group>
          <Group className="w-full lg:w-3/4">
            <Accordion
              items={accordionItems}
              className="w-full flex flex-col"
            />
          </Group>
        </Group>
      </Container>
    </section>
  );
};

export default Faq;
