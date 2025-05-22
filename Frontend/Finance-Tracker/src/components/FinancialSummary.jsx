import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialSummary = ({
  totalIncome,
  totalExpense,
  totalSavings,
  totalBudget,
}) => {
  return (
    <div className="grid gap-3 mt-5 sm:grid-cols-none lg:grid-cols-3 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p>${totalIncome.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <p>${totalExpense.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>${totalSavings.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <p>${totalBudget.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
