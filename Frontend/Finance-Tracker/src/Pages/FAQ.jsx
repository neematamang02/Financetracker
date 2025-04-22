import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqList.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
              >
                <span className="font-medium text-left">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-4 pb-4 text-gray-600 overflow-hidden transition-max-height duration-300 ease-in-out ${
                  openIndex === idx ? "max-h-96 pt-2" : "max-h-0"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
