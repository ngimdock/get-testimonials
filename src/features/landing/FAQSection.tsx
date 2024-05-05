import React from "react";
import { SectionLayout } from "./SectionLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How can I submit a testimonial for the app?",
    answer:
      "You can submit a testimonial for the app by navigating to the 'Testimonials' section within the app and following the prompts to share your feedback.",
  },
  {
    question: "What should I include in my testimonial?",
    answer:
      "Feel free to share your honest thoughts about your experience with the app. You can talk about what you like most, how the app has helped you, and any specific features you find valuable.",
  },
  {
    question: "Can I include images or videos in my testimonial?",
    answer:
      "Yes, you can include images or videos along with your testimonial to provide a more visual representation of your feedback. Simply upload them when submitting your testimonial.",
  },
  {
    question: "Do I need to provide my real name for the testimonial?",
    answer:
      "While you can choose to remain anonymous, providing your real name adds authenticity to your testimonial. However, we respect your privacy and allow you to use a pseudonym if you prefer.",
  },
  {
    question: "How long should my testimonial be?",
    answer:
      "There's no specific length requirement for testimonials. You can write as much or as little as you like, as long as it effectively conveys your thoughts and experiences with the app.",
  },
  {
    question: "Can I edit my testimonial after submitting it?",
    answer:
      "Once you submit your testimonial, you may not be able to edit it directly. However, you can reach out to our support team if you need to make any changes or updates.",
  },
  {
    question: "Will my testimonial be visible to others?",
    answer:
      "Yes, testimonials are typically displayed publicly to showcase user feedback and experiences with the app. However, if you prefer to keep your testimonial private, you can indicate that during submission.",
  },
  {
    question: "How long does it take for my testimonial to appear on the app?",
    answer:
      "Testimonials are usually reviewed by our team before being published to ensure they meet our guidelines. The review process may take a few days, but we strive to publish testimonials promptly.",
  },
  {
    question:
      "Can I provide multiple testimonials for different features of the app?",
    answer:
      "Absolutely! If you have positive experiences with different aspects of the app, feel free to submit multiple testimonials highlighting each feature separately.",
  },
  {
    question:
      "What if I have a negative experience and want to share feedback?",
    answer:
      "We value all feedback, whether positive or negative. If you have a negative experience with the app, we encourage you to reach out to our support team directly so we can address your concerns and improve your experience.",
  },
];

export const FAQSection = () => {
  return (
    <SectionLayout className="flex  items-start gap-4 max-lg:flex-col max-lg:items-center">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-primary">FAQ</h2>
        <h2 className="text-3xl font-bold text-foreground">
          Fraquently asked questions
        </h2>
      </div>

      <div className="mt-8 w-full max-w-lg flex-1">
        <Accordion type="multiple">
          {FAQS.map(({ question, answer }) => (
            <AccordionItem
              key={question}
              className="border-b border-foreground"
              value={question}
            >
              <AccordionTrigger className="py-4 text-start">
                {question}
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionLayout>
  );
};
