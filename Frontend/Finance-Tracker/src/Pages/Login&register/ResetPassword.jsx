import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Buttons from "../../components/Buttons";
import ROUTES from "../../routes/routes";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { newPassword }
      );
      setMessage(response.data.message);
      toast.success(response.data.message);
      setNewPassword("");
      setTimeout(() => {
        navigate(ROUTES.Login_Page);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
      toast.error(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="resetpass lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-white shadow-md rounded-md">
          <form onSubmit={handlePasswordReset}>
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Reset Password
            </h1>
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Buttons
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none cursor-pointer"
              buttontext="Reset Password"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
