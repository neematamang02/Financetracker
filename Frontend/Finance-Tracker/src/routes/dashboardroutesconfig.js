import Userdash from "../Pages/Userdashboard/Userdash";
import Transaction from "../Pages/Userdashboard/Transaction";
import Reports from "../Pages/Userdashboard/Reports";
import Userprofile from "../Pages/Userdashboard/Userprofile";
import SavingGoals from "@/Pages/Userdashboard/SavingGoals";
import BudgetManage from "@/Pages/Userdashboard/BudgetManage";

const dashboardroutesconfig = [
  { path: "userdash", Component: Userdash },
  { path: "transaction", Component: Transaction },
  { path: "reports", Component: Reports },
  { path: "userprofile", Component: Userprofile },
  { path: "SavingGoals", Component: SavingGoals },
  { path: "BudgetManage", Component: BudgetManage },
];

export default dashboardroutesconfig;
