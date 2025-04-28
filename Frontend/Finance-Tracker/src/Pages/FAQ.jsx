import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqList = [
  {
    question: "How do I log my expenses?",
    answer:
      "Just type your expense in plain text, like 'Bought coffee for $4 at Starbucks', then hit enter—the system will record it automatically.",
  },
  {
    question: "How are my expenses categorized?",
    answer:
      "Our keyword-detection algorithm scans your input and assigns categories (e.g., 'coffee' → 'Food & Drinks', 'Uber' → 'Transport').",
  },
  {
    question: "Can I filter my past expenses?",
    answer:
      "Yes—use the filter controls above the data table to narrow by date range, category, or amount. Find exactly what you spent in seconds.",
  },
  {
    question: "How do I view spending trends?",
    answer:
      "Switch to the Reports section for charts and graphs that visualize your spending over weeks, months, or years.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Support
          </Badge>
        </div>
        <Accordion type="single" collapsible className="px-10">
          {faqList.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
