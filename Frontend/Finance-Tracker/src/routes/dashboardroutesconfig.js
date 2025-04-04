import Userdash from "../Pages/Userdashboard/Userdash";
import Transaction from "../Pages/Userdashboard/Transaction";
import Reports from "../Pages/Userdashboard/Reports";
import Userprofile from "../Pages/Userdashboard/Userprofile";

const dashboardroutesconfig = [
  { path: "userdash", Component: Userdash },
  { path: "transaction", Component: Transaction },
  { path: "reports", Component: Reports },
  { path: "userprofile", Component: Userprofile },
];

export default dashboardroutesconfig;
