import React from "react";
import ROUTES from "../routes/routes";
import { Outlet } from "react-router-dom";
import {
  MdDashboard,
  TbReportSearch,
  FaMoneyBillTransfer,
  CgProfile,
  IoMdSettings,
} from "../assets/logo/index";
import { Link } from "react-router-dom";
import DASH_ROUTES from "../routes/dashboardroutes";

const Dashboardlayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 p-4 bg-gray-800 text-white">
        <div className="userprofile flex gap-5 p-4">
          <img
            src="https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
            alt="profile"
            className="rounded-full h-12 w-12"
          />
          <p className="mt-4">Mr. Dummy</p>
        </div>
        <div className="p-4 text-lg font-semibold border-b border-gray-700">
          Dashboard
        </div>
        <nav>
          <ul>
            <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
              <MdDashboard className="mt-1" />
              <Link to={DASH_ROUTES.User_dash} className="hover:text-primary">
                Overview
              </Link>
            </li>
            <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
              <FaMoneyBillTransfer className="mt-1" />
              <Link
                to={DASH_ROUTES.Transaction_pg}
                className="hover:text-primary"
              >
                Transactions
              </Link>
            </li>
            <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
              <TbReportSearch className="mt-1" />
              <Link to={DASH_ROUTES.Report_pg} className="hover:text-primary">
                Reports
              </Link>
            </li>
          </ul>

          <ul className="profilesettings mt-5">
            <p className="p-4 text-gray-500">Account</p>
            <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
              <CgProfile className="mt-1" />
              <Link
                to={DASH_ROUTES.Userprofile_pg}
                className="hover:text-primary"
              >
                Profile
              </Link>
            </li>
            <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
              <IoMdSettings className="mt-1" />
              <Link to={ROUTES.User_dash} className="hover:text-primary">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboardlayout;
