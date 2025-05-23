import { useEffect, useState } from "react";
import useUser from "@/hooks/use-user";
import WelcomeMessage from "@/components/WelcomeMessage";
import FinancialSummary from "@/components/FinancialSummary";
import ChartSection from "@/components/charts/ChartSection";
import TransactionsTable from "@/components/TransactionsTable";
import { fetchDashboardData } from "@/services/dashboardService";

const Dashboard = () => {
  const { user, loading: userLoading, error: userError } = useUser();
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalSavings: 0,
    totalBudget: 0,
    chartData: { labels: [], datasets: [] },
    recentTransactions: [],
  });
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (user) {
        setIsFetching(true);
        try {
          const data = await fetchDashboardData(user._id);
          setDashboardData(data);
          setFetchError(null);
        } catch (err) {
          setFetchError("Failed to load dashboard data");
          console.error("Failed to fetch dashboard data:", err);
        } finally {
          setIsFetching(false);
        }
      }
    };
    loadDashboardData();
  }, [user]);

  if (userError) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">
            Error loading user data: {userError.message}
          </p>
          <p className="text-sm mt-1">
            Please try refreshing the page or contact support if the issue
            persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <WelcomeMessage name={user?.name} isLoading={userLoading} />

      <FinancialSummary
        totalIncome={dashboardData.totalIncome}
        totalExpense={dashboardData.totalExpense}
        totalSavings={dashboardData.totalSavings}
        totalBudget={dashboardData.totalBudget}
        isLoading={userLoading || isFetching}
      />

      <ChartSection
        data={dashboardData.chartData}
        isLoading={userLoading || isFetching}
      />

      <div className="mt-5">
        <TransactionsTable
          transactions={dashboardData.recentTransactions}
          totalBudget={dashboardData.totalBudget}
          isLoading={userLoading || isFetching}
        />
      </div>

      {fetchError && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{fetchError}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
