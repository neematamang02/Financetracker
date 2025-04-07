import React from "react";
import Navbar from "../Navigation_bar_menu/Navbar";
import Footer from "../Pages/Footer";
import { useLocation } from "react-router-dom";
import DASH_ROUTES from "../routes/dashboardroutes";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNabbar = location.pathname.startsWith(DASH_ROUTES.User_dash);
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNabbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
