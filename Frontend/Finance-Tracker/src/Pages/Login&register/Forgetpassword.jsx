import React from "react";
import Buttons from "../../components/Buttons";

const Forgetpassword = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="forgetpass lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-white shadow-md rounded-md">
          <form action="#">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Forget Password
            </h1>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              placeholder="Email"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 p-3 rounded-xl mt-2 w-full cursor-pointer"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgetpassword;
