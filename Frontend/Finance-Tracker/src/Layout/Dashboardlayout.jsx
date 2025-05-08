import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  TbReportSearch,
  FaMoneyBillTransfer,
  CgProfile,
  IoMdSettings,
  BiLogOut,
} from "../assets/logo/index";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ROUTES from "../routes/routes";
import DASH_ROUTES from "../routes/dashboardroutes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Useuser from "../components/Useuser";
import { useUserProfile } from "@/components/Helper";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Dashboardlayout = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { profileImage } = useUserProfile();
  const { user, loading, error } = Useuser();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    toast.success("Logout successfully");
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate(ROUTES.Login_Page);
    }, 500);
  };

  const LogoutDialog = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-3 hover:text-primary focus:outline-none cursor-pointer">
          <BiLogOut className="mt-1" />
          Logout
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="cursor-pointer">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Top Nav (Mobile) */}
      <nav className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {menuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
        <div className="text-xl font-bold ml-4">Dashboard</div>
      </nav>

      <div className="flex">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:block w-64 p-4 bg-gray-800 text-white h-screen">
          <div className="userprofile flex gap-5 p-4">
            <img
              src={
                profileImage ||
                "https://dummycomp.shopespot.com/uploads/partner/254/promo_images/2024/05/dummy-user.png"
              }
              alt="profile"
              className="rounded-full h-12 w-12 object-cover"
            />
            <p className="mt-4">Mr/Mrs. {user?.name || "User"}</p>
          </div>
          <div className="p-4 text-lg font-semibold border-b border-gray-700">
            Dashboard
          </div>
          <nav>
            <ul>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <MdDashboard className="mt-1" />
                <Link to={DASH_ROUTES.User_dash} className="hover:text-primary">
                  Overview
                </Link>
              </li>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <FaMoneyBillTransfer className="mt-1" />
                <Link
                  to={DASH_ROUTES.Transaction_pg}
                  className="hover:text-primary"
                >
                  Transactions
                </Link>
              </li>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <TbReportSearch className="mt-1" />
                <Link to={DASH_ROUTES.Report_pg} className="hover:text-primary">
                  Reports
                </Link>
              </li>
            </ul>

            <ul className="mt-5">
              <p className="p-4 text-gray-500">Account</p>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <CgProfile className="mt-1" />
                <Link
                  to={DASH_ROUTES.Userprofile_pg}
                  className="hover:text-primary"
                >
                  Profile
                </Link>
              </li>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <IoMdSettings className="mt-1" />
                <Link to={ROUTES.User_dash} className="hover:text-primary">
                  Settings
                </Link>
              </li>
              <li className="flex p-4 hover:bg-gray-700 transition-colors">
                {LogoutDialog()}
              </li>
            </ul>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 flex justify-end">
            <button onClick={toggleMenu} className="focus:outline-none">
              <AiOutlineClose size={24} />
            </button>
          </div>
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
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <MdDashboard className="mt-1" />
                <Link
                  to={DASH_ROUTES.User_dash}
                  className="hover:text-primary"
                  onClick={toggleMenu}
                >
                  Overview
                </Link>
              </li>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <FaMoneyBillTransfer className="mt-1" />
                <Link
                  to={DASH_ROUTES.Transaction_pg}
                  className="hover:text-primary"
                  onClick={toggleMenu}
                >
                  Transactions
                </Link>
              </li>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <TbReportSearch className="mt-1" />
                <Link
                  to={DASH_ROUTES.Report_pg}
                  className="hover:text-primary"
                  onClick={toggleMenu}
                >
                  Reports
                </Link>
              </li>
            </ul>
            <ul className="mt-5">
              <p className="p-4 text-gray-500">Account</p>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <CgProfile className="mt-1" />
                <Link
                  to={DASH_ROUTES.Userprofile_pg}
                  className="hover:text-primary"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
              </li>
              <li className="flex gap-3 p-4 hover:bg-gray-700 transition-colors">
                <IoMdSettings className="mt-1" />
                <Link
                  to={ROUTES.User_dash}
                  className="hover:text-primary"
                  onClick={toggleMenu}
                >
                  Settings
                </Link>
              </li>
              <li className="flex p-4 hover:bg-gray-700 transition-color">
                {LogoutDialog()}
              </li>
            </ul>
          </nav>
        </div>

        {/* Overlay when mobile menu is open */}
        {menuOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm md:hidden"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-scroll h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboardlayout;
