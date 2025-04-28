import React from "react";
import { Edit3, Tag, Filter, BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const processSteps = [
  {
    icon: <Edit3 className="h-10 w-10 text-blue-500" />,
    title: "Write Expense",
    description:
      "Simply enter your expense in plain English (e.g., 'Lunch $12 at Café').",
  },
  {
    icon: <Tag className="h-10 w-10 text-blue-500" />,
    title: "Auto Categorize",
    description:
      "Our keyword detection algorithm assigns the correct category instantly.",
  },
  {
    icon: <Filter className="h-10 w-10 text-blue-500" />,
    title: "Filter & Review",
    description:
      "Use filters to sort by date, category or amount and review past entries.",
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-blue-500" />,
    title: "Analyze Trends",
    description:
      "Generate insightful charts to understand your spending patterns.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Process
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
