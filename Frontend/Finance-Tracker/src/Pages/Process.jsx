// import { Edit3, Tag, Filter, BarChart2 } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// const processSteps = [
//   {
//     icon: <Edit3 className="h-10 w-10 text-blue-500" />,
//     title: "Write Expense",
//     description:
//       "Simply enter your expense in plain English (e.g., 'Lunch $12 at Café').",
//   },
//   {
//     icon: <Tag className="h-10 w-10 text-blue-500" />,
//     title: "Auto Categorize",
//     description:
//       "Our keyword detection algorithm assigns the correct category instantly.",
//   },
//   {
//     icon: <Filter className="h-10 w-10 text-blue-500" />,
//     title: "Filter & Review",
//     description:
//       "Use filters to sort by date, category or amount and review past entries.",
//   },
//   {
//     icon: <BarChart2 className="h-10 w-10 text-blue-500" />,
//     title: "Analyze Trends",
//     description:
//       "Generate insightful charts to understand your spending patterns.",
//   },
// ];

// const Process = () => {
//   return (
//     <section id="process" className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="max-w-2xl mx-auto text-center mb-16">
//           <Badge className="mb-4" variant="outline">
//             Process
//           </Badge>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {processSteps.map((step, idx) => (
//             <div
//               key={idx}
//               className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="mb-4">{step.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {step.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Process;
import { Edit3, Tag, Filter, BarChart2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const processSteps = [
  {
    icon: <Edit3 className="h-10 w-10 text-white" />,
    title: "Write Expense",
    description:
      "Simply enter your expense in plain English (e.g., 'Lunch $12 at Café'). Our natural language processing does the rest.",
    color: "from-violet-500 to-purple-600",
    step: "01",
  },
  {
    icon: <Tag className="h-10 w-10 text-white" />,
    title: "Auto Categorize",
    description:
      "Our intelligent keyword detection algorithm assigns the correct category instantly, learning from your spending patterns.",
    color: "from-blue-500 to-indigo-600",
    step: "02",
  },
  {
    icon: <Filter className="h-10 w-10 text-white" />,
    title: "Filter & Review",
    description:
      "Use powerful filters to sort by date, category, or amount. Review past entries with lightning-fast search capabilities.",
    color: "from-emerald-500 to-teal-600",
    step: "03",
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-white" />,
    title: "Analyze Trends",
    description:
      "Generate beautiful, insightful charts to understand your spending patterns and make informed financial decisions.",
    color: "from-orange-500 to-red-600",
    step: "04",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
            🚀 How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Simple process,
            </span>
            <br />
            <span className="text-gray-800">powerful results</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get started in minutes with our intuitive 4-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-violet-200 via-blue-200 to-orange-200"></div>

          {processSteps.map((step, idx) => (
            <div key={idx} className="relative">
              <Card className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                    {step.step}
                  </div>

                  {/* Icon Container */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-violet-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for desktop */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}

                  {/* Hover Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                  ></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
