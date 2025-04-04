import Homepage from "../Pages/Homepage";
import AboutMe from "../Pages/AboutMe";
import Testimonials from "../Pages/Testimonials";
import ContactForm from "../Pages/ContactForm";
import ROUTES from "./routes";
import Loginpg from "../Pages/Login&register/Loginpg";
import Registerpg from "../Pages/Login&register/Registerpg";
import Userdash from "../Pages/Userdashboard/Userdash";
import Transaction from "../Pages/Userdashboard/Transaction";
import Userprofile from "../Pages/Userdashboard/Userprofile";
import Reports from "../Pages/Userdashboard/Reports";

const routesConfig = [
  { path: ROUTES.HOME, Component: Homepage },
  { path: ROUTES.ABOUT_ME, Component: AboutMe },
  { path: ROUTES.TESTIMONIALS, Component: Testimonials },
  { path: ROUTES.CONTACT_FORM, Component: ContactForm },
  { path: ROUTES.Login_Page, Component: Loginpg },
  { path: ROUTES.Register_page, Component: Registerpg },
  { path: ROUTES.User_dash, Component: Userdash },
  { path: ROUTES.Transaction_pg, Component: Transaction },
  { path: ROUTES.Userprofile_pg, Component: Userprofile },
  { path: ROUTES.Reports_pg, Component: Reports },
];

export default routesConfig;
