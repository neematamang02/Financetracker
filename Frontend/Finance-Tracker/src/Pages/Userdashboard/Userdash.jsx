// import React, { useEffect, useState } from "react";
// import Labelcharts from "../../components/Labelcharts";
// import Useuser from "../../components/Useuser";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const Userdash = () => {
//   const { user, loading, error } = Useuser();
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading user data: {error.message}</p>;
//   return (
//     <>
//       <div className="dashboardallcontents">
//         <div className="Username">
//           <h1 className="font-bold text-3xl">Hello {user?.name || "User"}!!</h1>
//           <p className="text-gray-500">Welcome back !</p>
//         </div>
//         <div className="grid gap-3 mt-5 sm:grid-cols-none lg:grid-cols-3 xl:grid-cols-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Income</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Card Content</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Expense</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Card Content</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Savings</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Card Content</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Budget</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Card Content</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* chart table */}
//         <div class="w-full max-w-full bg-white rounded-lg mt-5 shadow-sm dark:bg-gray-800">
//           <div class="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
//             <div>
//               <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
//                 $12,423
//               </h5>
//               <p class="text-base font-normal text-gray-500 dark:text-gray-400">
//                 Sales this week
//               </p>
//             </div>
//             <div class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
//               23%
//               <svg
//                 class="w-3 h-3 ms-1"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 10 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M5 13V1m0 0L1 5m4-4 4 4"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div class="w-full px-2.5">
//             <Labelcharts />
//           </div>
//           <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
//             <div class="flex justify-between items-center pt-5">
//               <button
//                 id="dropdownDefaultButton"
//                 data-dropdown-toggle="lastDaysdropdown"
//                 data-dropdown-placement="bottom"
//                 class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
//                 type="button"
//               >
//                 Last 7 days
//                 <svg
//                   class="w-2.5 m-2.5 ms-1.5"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 10 6"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m1 1 4 4 4-4"
//                   />
//                 </svg>
//               </button>
//               <div
//                 id="lastDaysdropdown"
//                 class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
//               >
//                 <ul
//                   class="py-2 text-sm text-gray-700 dark:text-gray-200"
//                   aria-labelledby="dropdownDefaultButton"
//                 >
//                   <li>
//                     <a
//                       href="#"
//                       class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Yesterday
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Today
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Last 7 days
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Last 30 days
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                     >
//                       Last 90 days
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <a
//                 href="#"
//                 class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
//               >
//                 Sales Report
//                 <svg
//                   class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 6 10"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m1 9 4-4-4-4"
//                   />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>

//         <div class="bg-white rounded-xl shadow-md p-6 mb-8 mt-5">
//           <h2 class="text-2xl font-bold text-gray-800 mb-6">
//             Recent Transactions
//           </h2>

//           {/* transaction table */}
//           <div class="overflow-x-auto mb-6">
//             <table class="min-w-full">
//               <thead>
//                 <tr>
//                   <th class="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
//                     Category
//                   </th>
//                   <th class="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
//                     Expense Type
//                   </th>
//                   <th class="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
//                     Amount
//                   </th>
//                   <th class="bg-gray-800 text-white px-6 py-3 text-left text-lg font-semibold">
//                     Date
//                   </th>
//                   <th class="bg-gray-800 text-white px-6 py-3 text-center text-lg font-semibold">
//                     Delete
//                   </th>
//                 </tr>
//               </thead>
//               <tbody id="transactions-table-body"></tbody>
//             </table>
//           </div>
//           <div class="bg-green-100 p-4 rounded-lg">
//             <p class="text-lg font-semibold text-center text-gray-800">
//               Total Budget: <span id="total-budget-display">0</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Userdash;
import React, { useEffect, useState } from "react";
import WelcomeMessage from "@/components/WelcomeMessage";
import FinancialSummary from "@/components/FinancialSummary";
import ChartSection from "@/components/charts/ChartSection";
import TransactionsTable from "@/components/TransactionsTable";
import { fetchDashboardData } from "@/services/dashboardService";
import Useuser from "@/hooks/use-user";

const Userdash = () => {
  const { user, loading: userLoading, error: userError } = Useuser();
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

  if (userLoading) return <p>Loading user data...</p>;
  if (userError) return <p>Error loading user data: {userError.message}</p>;
  if (isFetching) return <p>Loading dashboard data...</p>;
  if (fetchError) return <p className="text-red-500">{fetchError}</p>;

  return (
    <div className="dashboardallcontents">
      <WelcomeMessage name={user?.name} />
      <FinancialSummary
        totalIncome={dashboardData.totalIncome}
        totalExpense={dashboardData.totalExpense}
        totalSavings={dashboardData.totalSavings}
        totalBudget={dashboardData.totalBudget}
      />
      <ChartSection data={dashboardData.chartData} />
      <TransactionsTable
        transactions={dashboardData.recentTransactions}
        totalBudget={dashboardData.totalBudget}
      />
    </div>
  );
};

export default Userdash;
