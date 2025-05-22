import axios from "axios";

export const fetchDashboardData = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token found");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Now we pass config on each call:
    const [expensesRes, goalsRes] = await Promise.all([
      axios.get(`/api/expenses/user/${userId}`, config),
      axios.get("/api/goals", config),
    ]);

    const expenses = expensesRes.data;
    const goals = goalsRes.data;

    // Calculate Total Income
    const totalIncome = expenses
      .filter((exp) => exp.type === "income")
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate Total Expense
    const totalExpense = expenses
      .filter((exp) => exp.type === "expense")
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate Total Savings
    const totalSavings = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

    // Calculate Total Budget
    const totalBudget = totalIncome - totalExpense - totalSavings;

    // Prepare data for the graph (income and expenses over time by month)
    const expensesByMonth = expenses.reduce((acc, exp) => {
      const month = new Date(exp.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0 };
      }
      if (exp.type === "income") {
        acc[month].income += exp.amount;
      } else if (exp.type === "expense") {
        acc[month].expense += exp.amount;
      }
      return acc;
    }, {});

    // Sort months chronologically and prepare chart data
    const chartLabels = Object.keys(expensesByMonth).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const incomeData = chartLabels.map(
      (label) => expensesByMonth[label].income
    );
    const expenseData = chartLabels.map(
      (label) => expensesByMonth[label].expense
    );

    // Get recent transactions (e.g., last 5 expenses)
    const recentTransactions = expenses
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    return {
      totalIncome,
      totalExpense,
      totalSavings,
      totalBudget,
      chartData: {
        labels: chartLabels,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Expense",
            data: expenseData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      recentTransactions,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error; // Let the caller handle the error
  }
};
