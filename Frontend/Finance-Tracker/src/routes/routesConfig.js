import Homepage from "../Pages/Homepage";
import AboutMe from "../Pages/AboutMe";
import Testimonials from "../Pages/Testimonials";
import ContactForm from "../Pages/ContactForm";
import ROUTES from "./routes";
import Loginpg from "../Pages/Login&register/Loginpg";
import Registerpg from "../Pages/Login&register/Registerpg";

const routesConfig = [
  { path: ROUTES.HOME, Component: Homepage },
  { path: ROUTES.ABOUT_ME, Component: AboutMe },
  { path: ROUTES.TESTIMONIALS, Component: Testimonials },
  { path: ROUTES.CONTACT_FORM, Component: ContactForm },
  { path: ROUTES.Login_Page, Component: Loginpg },
  { path: ROUTES.Register_page, Component: Registerpg },
];

export default routesConfig;
