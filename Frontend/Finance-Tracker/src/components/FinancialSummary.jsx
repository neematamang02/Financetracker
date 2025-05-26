import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";

const FinancialSummary = ({
  totalIncome,
  totalExpense,
  totalSavings,
  totalBudget,
  isLoading = false,
}) => {
  if (isLoading) {
    return <FinancialSummarySkeleton />;
  }

  return (
    <div className="grid gap-3 mt-5 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-2">
          <CardTitle className="flex items-center text-lg text-green-800">
            <PiggyBank className="h-5 w-5 mr-2 text-green-600" />
            Total Income
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-2xl font-bold text-green-600">
            ${totalIncome.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 pb-2">
          <CardTitle className="flex items-center text-lg text-red-800">
            <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
            Total Expense
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-2xl font-bold text-red-600">
            ${totalExpense.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2">
          <CardTitle className="flex items-center text-lg text-blue-800">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Total Savings
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-2xl font-bold text-blue-600">
            ${totalSavings.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 pb-2">
          <CardTitle className="flex items-center text-lg text-purple-800">
            <Wallet className="h-5 w-5 mr-2 text-purple-600" />
            Total Budget
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-2xl font-bold text-purple-600">
            ${totalBudget.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Skeleton component for loading state
const FinancialSummarySkeleton = () => {
  return (
    <div className="grid gap-3 mt-5 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent className="pt-4">
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FinancialSummary;
