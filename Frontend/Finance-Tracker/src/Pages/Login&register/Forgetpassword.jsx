import Buttons from "../../components/Buttons";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Forgetpassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/auth/forgot-password", {
        email,
      });
      setMessage(response.data.message);
      toast.success(response.data.message);
      setEmail("");
    } catch (err) {
      console.error("Error sending reset email:", err);
      setError(err.response?.data?.message || "Failed to send reset email");
      toast.error(err.response?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="forgetpass lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-white shadow-md rounded-md">
          <form onSubmit={handleForgotPassword}>
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Forget Password
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
              Email Address
            </label>
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <Buttons
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none cursor-pointer"
              buttontext="Send Reset Link"
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default Forgetpassword;
