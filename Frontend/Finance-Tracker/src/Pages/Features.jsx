// import { DollarSign, Tag, Table, BarChart2 } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// const featureList = [
//   {
//     icon: <DollarSign className="h-8 w-8 text-blue-500" />,
//     title: "Expense Tracking",
//     description:
//       "Log your spending in natural text format and let the system record every purchase seamlessly.",
//   },
//   {
//     icon: <Tag className="h-8 w-8 text-blue-500" />,
//     title: "Smart Categorization",
//     description:
//       "Our keyword-detection algorithm auto-classifies expenses into categories like Food, Transport, and more.",
//   },
//   {
//     icon: <Table className="h-8 w-8 text-blue-500" />,
//     title: "Interactive Data Table",
//     description:
//       "View all past expenses in a sortable, filterable table — find what you spent and when in seconds.",
//   },
//   {
//     icon: <BarChart2 className="h-8 w-8 text-blue-500" />,
//     title: "Visual Reports",
//     description:
//       "Generate charts and graphs to analyze spending trends over time and make smarter decisions.",
//   },
// ];

// const Features = () => {
//   return (
//     <section id="features" className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="max-w-2xl mx-auto text-center mb-16">
//           <Badge className="mb-4" variant="outline">
//             Key Features
//           </Badge>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {featureList.map((feature) => (
//             <div
//               key={feature.title}
//               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;
import {
  DollarSign,
  Tag,
  Table,
  BarChart2,
  Shield,
  Zap,
  Users,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const featureList = [
  {
    icon: <DollarSign className="h-8 w-8 text-violet-500" />,
    title: "Smart Expense Tracking",
    description:
      "Log your spending in natural text format and let our AI system record every purchase seamlessly with intelligent categorization.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: <Tag className="h-8 w-8 text-blue-500" />,
    title: "Auto Categorization",
    description:
      "Our advanced keyword-detection algorithm automatically classifies expenses into categories like Food, Transport, and Entertainment.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: <Table className="h-8 w-8 text-emerald-500" />,
    title: "Interactive Dashboard",
    description:
      "View all past expenses in a beautiful, sortable, filterable interface — find what you spent and when in seconds.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-orange-500" />,
    title: "Visual Analytics",
    description:
      "Generate stunning charts and graphs to analyze spending trends over time and make data-driven financial decisions.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: <Shield className="h-8 w-8 text-cyan-500" />,
    title: "Bank-Level Security",
    description:
      "Your financial data is protected with enterprise-grade encryption and security measures you can trust.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "Lightning Fast",
    description:
      "Experience blazing-fast performance with real-time updates and instant synchronization across all your devices.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    icon: <Users className="h-8 w-8 text-pink-500" />,
    title: "Family Sharing",
    description:
      "Share budgets and track expenses with family members while maintaining privacy and individual financial goals.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: <Target className="h-8 w-8 text-indigo-500" />,
    title: "Goal Setting",
    description:
      "Set and track financial goals with visual progress indicators and smart recommendations to achieve them faster.",
    color: "from-indigo-500 to-purple-600",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Badge className="bg-violet-100 text-violet-700 border-violet-200 px-4 py-2">
            ✨ Key Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Everything you need
            </span>
            <br />
            <span className="text-gray-800">to manage your money</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Powerful features designed to make financial management effortless
            and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((feature) => (
            <Card
              key={feature.title}
              className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-6 relative">
                {/* Background Gradient */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}
                ></div>

                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-violet-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
