import React from "react";
import { DollarSign, Tag, Table, BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const featureList = [
  {
    icon: <DollarSign className="h-8 w-8 text-blue-500" />,
    title: "Expense Tracking",
    description:
      "Log your spending in natural text format and let the system record every purchase seamlessly.",
  },
  {
    icon: <Tag className="h-8 w-8 text-blue-500" />,
    title: "Smart Categorization",
    description:
      "Our keyword-detection algorithm auto-classifies expenses into categories like Food, Transport, and more.",
  },
  {
    icon: <Table className="h-8 w-8 text-blue-500" />,
    title: "Interactive Data Table",
    description:
      "View all past expenses in a sortable, filterable table — find what you spent and when in seconds.",
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-blue-500" />,
    title: "Visual Reports",
    description:
      "Generate charts and graphs to analyze spending trends over time and make smarter decisions.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Key Features
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
