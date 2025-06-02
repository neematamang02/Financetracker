import { useState } from "react";
import Buttons from "../../components/Buttons";
import { expensebg2 } from "../../assets/images";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";
import axios from "axios";
import DASH_ROUTES from "../../routes/dashboardroutes";
import toast, { Toaster } from "react-hot-toast";
import Googlebutton from "../../components/Googlebutton";
import { Eye, EyeSlash } from "iconsax-reactjs";

const Loginpg = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      toast.success("Login successfully");
      localStorage.setItem("token", response.data.token);
      navigate(DASH_ROUTES.User_dash);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Email or password does not match"
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen text-gray-900 pt-20 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="text-center">
              <h1 className="font-bold text-5xl">Money Mate</h1>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleLogin}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="relative mt-5">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white pr-12"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeSlash
                            size="20"
                            color="#555555"
                            variant="Broken"
                          />
                        ) : (
                          <Eye size="20" color="#555555" variant="Broken" />
                        )}
                      </button>
                    </div>
                    <Buttons
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none cursor-pointer"
                      buttontext={"Login"}
                    />
                    <NavLink
                      to={ROUTES.Forget_pass}
                      className="cursor-pointer flex flex-col mt-2 text-right text-sm text-blue-700 hover:text-blue-900"
                    >
                      Forget password?
                    </NavLink>
                    <p className="text-center text-gray-400">or</p>
                    <div className="flex justify-center">
                      <Googlebutton className="flex items-center" />
                    </div>
                    <p className="mt-4 text-xs text-gray-600 text-center">
                      I agree to abide by templatana&apos;s
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted ml-1 mr-1"
                      >
                        Terms of Service
                      </a>
                      and its
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted ml-1"
                      >
                        Privacy Policy
                      </a>
                    </p>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Don&apos;t have an account?{" "}
                      <span className="hover:text-purple-500 text-purple-400 cursor-pointer">
                        <Link to={ROUTES.Register_page}>Register here</Link>
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <img src={expensebg2 || "/placeholder.svg"} alt="Background" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpg;
