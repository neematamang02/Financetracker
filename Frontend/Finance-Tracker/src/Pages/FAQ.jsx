// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";

// const faqList = [
//   {
//     question: "How do I log my expenses?",
//     answer:
//       "Just type your expense in plain text, like 'Bought coffee for $4 at Starbucks', then hit enter—the system will record it automatically.",
//   },
//   {
//     question: "How are my expenses categorized?",
//     answer:
//       "Our keyword-detection algorithm scans your input and assigns categories (e.g., 'coffee' → 'Food & Drinks', 'Uber' → 'Transport').",
//   },
//   {
//     question: "Can I filter my past expenses?",
//     answer:
//       "Yes—use the filter controls above the data table to narrow by date range, category, or amount. Find exactly what you spent in seconds.",
//   },
//   {
//     question: "How do I view spending trends?",
//     answer:
//       "Switch to the Reports section for charts and graphs that visualize your spending over weeks, months, or years.",
//   },
// ];

// const FAQ = () => {
//   return (
//     <section id="faq" className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="max-w-2xl mx-auto text-center mb-16">
//           <Badge className="mb-4" variant="outline">
//             Support
//           </Badge>
//         </div>
//         <Accordion type="single" collapsible className="px-10">
//           {faqList.map((faq, index) => (
//             <AccordionItem key={index} value={`faq-${index}`}>
//               <AccordionTrigger>{faq.question}</AccordionTrigger>
//               <AccordionContent>{faq.answer}</AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </section>
//   );
// };

// export default FAQ;

import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqList = [
  {
    question: "How do I log my expenses?",
    answer:
      "Simply type your expense in plain text, like 'Bought coffee for $4 at Starbucks', then hit enter. Our AI-powered system will automatically parse the information and record it with the correct amount, category, and location.",
    category: "Getting Started",
  },
  {
    question: "How are my expenses categorized?",
    answer:
      "Our advanced keyword-detection algorithm scans your input and intelligently assigns categories (e.g., 'coffee' → 'Food & Drinks', 'Uber' → 'Transport'). The system learns from your patterns and becomes more accurate over time.",
    category: "Features",
  },
  {
    question: "Can I filter my past expenses?",
    answer:
      "Use our powerful filter controls above the data table to narrow results by date range, category, amount, or even specific merchants. You can also use the search function to find exactly what you're looking for in seconds.",
    category: "Features",
  },
  {
    question: "How do I view spending trends?",
    answer:
      "Navigate to the Reports section for comprehensive charts and graphs that visualize your spending over weeks, months, or years. You can also set up custom date ranges and compare different time periods.",
    category: "Analytics",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, absolutely. We use bank-level encryption (AES-256) to protect your data both in transit and at rest. We never store your banking credentials, and all data is encrypted with your personal key that only you control.",
    category: "Security",
  },
  {
    question: "Can I set spending limits and budgets?",
    answer:
      "Yes! You can set monthly budgets for different categories, create savings goals, and receive notifications when you're approaching your limits. Our smart alerts help you stay on track with your financial goals.",
    category: "Budgeting",
  },
  {
    question: "Does the app work offline?",
    answer:
      "The app has limited offline functionality. You can log expenses offline, and they'll sync automatically when you reconnect to the internet. However, real-time analytics and reports require an internet connection.",
    category: "Technical",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes, you can export your expense data in multiple formats including CSV, PDF, and Excel. This is useful for tax preparation, sharing with accountants, or creating custom reports.",
    category: "Data Management",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-2">
            💬 Support
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Frequently asked
            </span>
            <br />
            <span className="text-gray-800">questions</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to know about MoneyMate
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <Accordion type="multiple" className="w-full">
                {faqList.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <AccordionTrigger className="px-8 py-6 text-left hover:bg-violet-50 transition-colors group">
                      <div className="flex items-start gap-4 w-full">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                          <HelpCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-violet-600 font-medium mb-1">
                            {faq.category}
                          </div>
                          <div className="text-lg font-semibold text-gray-800 group-hover:text-violet-600 transition-colors">
                            {faq.question}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="ml-12 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
