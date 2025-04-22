import Homepage from "../Pages/Homepage";
import ROUTES from "./routes";
import Loginpg from "../Pages/Login&register/Loginpg";
import Registerpg from "../Pages/Login&register/Registerpg";
import Userdash from "../Pages/Userdashboard/Userdash";
import Transaction from "../Pages/Userdashboard/Transaction";
import Userprofile from "../Pages/Userdashboard/Userprofile";
import Reports from "../Pages/Userdashboard/Reports";
import Forgetpassword from "../Pages/Login&register/Forgetpassword";

const routesConfig = [
  { path: ROUTES.HOME, Component: Homepage },
  { path: ROUTES.Login_Page, Component: Loginpg },
  { path: ROUTES.Register_page, Component: Registerpg },
  { path: ROUTES.User_dash, Component: Userdash },
  { path: ROUTES.Transaction_pg, Component: Transaction },
  { path: ROUTES.Userprofile_pg, Component: Userprofile },
  { path: ROUTES.Reports_pg, Component: Reports },
  { path: ROUTES.Forget_pass, Component: Forgetpassword },
];

export default routesConfig;
