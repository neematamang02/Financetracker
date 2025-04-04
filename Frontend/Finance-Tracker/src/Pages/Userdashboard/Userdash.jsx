import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/routes";
import {
  MdDashboard,
  TbReportSearch,
  FaMoneyBillTransfer,
  CgProfile,
  IoMdSettings,
} from "../../assets/logo/index";

const Userdash = () => {
  return (
    // <div className="min-h-screen flex">
    //   <aside className="w-64 p-4 bg-gray-800 text-white">
    //     <div className="userprofile flex gap-5 p-4">
    //       <img
    //         src="https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
    //         alt="profile"
    //         className="rounded-full h-12 w-12"
    //       />
    //       <p className="mt-4">Mr. Dummy</p>
    //     </div>
    //     <div className="p-4 text-lg font-semibold border-b border-gray-700">
    //       Dashboard
    //     </div>
    //     <nav>
    //       <ul>
    //         <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
    //           <MdDashboard className="mt-1" />
    //           <Link to={ROUTES.User_dash} className="hover:text-primary">
    //             Overview
    //           </Link>
    //         </li>
    //         <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
    //           <FaMoneyBillTransfer className="mt-1" />
    //           <Link to={ROUTES.Transaction_pg} className="hover:text-primary">
    //             Transactions
    //           </Link>
    //         </li>
    //         <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
    //           <TbReportSearch className="mt-1" />
    //           <Link to={ROUTES.Reports_pg} className="hover:text-primary">
    //             Reports
    //           </Link>
    //         </li>
    //       </ul>

    //       <ul className="profilesettings mt-5">
    //         <p className="p-4 text-gray-500">Account</p>
    //         <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
    //           <CgProfile className="mt-1" />
    //           <Link to={ROUTES.Userprofile_pg} className="hover:text-primary">
    //             Profile
    //           </Link>
    //         </li>
    //         <li className=" flex gap-3 p-4 hover:bg-gray-700 transition-colors">
    //           <IoMdSettings className="mt-1" />
    //           <Link to={ROUTES.User_dash} className="hover:text-primary">
    //             Settings
    //           </Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </aside>
    //   <div className="flex-1 bg-gray-100 p-6">
    //     <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {/* Card 1 */}
    //       <div className="bg-white shadow rounded-lg p-6">
    //         <p className="text-gray-700">Card 1 Content</p>
    //       </div>
    //       {/* Card 2 */}
    //       <div className="bg-white shadow rounded-lg p-6">
    //         <p className="text-gray-700">Card 2 Content</p>
    //       </div>
    //       {/* Card 3 */}
    //       <div className="bg-white shadow rounded-lg p-6">
    //         <p className="text-gray-700">Card 3 Content</p>
    //       </div>
    //     </div>
    //   </>
    // </div>
    <>
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-700">Card 1 Content</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-700">Card 2 Content</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-700">Card 3 Content</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdash;
