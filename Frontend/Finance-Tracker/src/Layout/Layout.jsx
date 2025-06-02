import Footer from "../Pages/Footer";
import { useLocation } from "react-router-dom";
import DASH_ROUTES from "../routes/dashboardroutes";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/Pages/Login&register/Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith(DASH_ROUTES.DashBoard);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
};

export default Layout;
