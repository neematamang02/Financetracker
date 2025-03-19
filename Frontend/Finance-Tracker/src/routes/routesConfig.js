import Homepage from "../Pages/Homepage";
import Portfolio from "../Pages/Portfolio";
import AboutMe from "../Pages/AboutMe";
import Testimonials from "../Pages/Testimonials";
import ContactForm from "../Pages/ContactForm";
import ROUTES from "./routes";

const routesConfig = [
  { path: ROUTES.HOME, Component: Homepage },
  { path: ROUTES.PORTFOLIO, Component: Portfolio },
  { path: ROUTES.ABOUT_ME, Component: AboutMe },
  { path: ROUTES.TESTIMONIALS, Component: Testimonials },
  { path: ROUTES.CONTACT_FORM, Component: ContactForm },
];

export default routesConfig;
