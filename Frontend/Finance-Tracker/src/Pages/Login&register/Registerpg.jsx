import React, { useState } from "react";
import Buttons from "../../components/Buttons";
import { Google } from "../../assets/logo";
import { expensebg2 } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";
import axios from "axios";

const Registerpg = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
    monthlyIncome: "",
  });
  const [error, setError] = useState("");

  const registeruserchange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const registeruser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Log to verify data before sending
      console.log("User data to be sent:", userdata);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: userdata.fullname,
          email: userdata.email,
          password: userdata.password,
          cpassword: userdata.cpassword,
          monthlyIncome: Number(userdata.monthlyIncome),
        }
      );
      alert("Registration successful! Please log in.");
      navigate(ROUTES.Login_Page);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="text-center">
            <h1 className="font-bold text-5xl">Money Mate</h1>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <Buttons
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow"
                  buttontext={"Sign Up with Google"}
                >
                  <img src={Google} className="w-4" alt="Google Icon" />
                </Buttons>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>
              <form onSubmit={registeruser}>
                <div className="mx-auto max-w-xs">
                  <input
                    name="fullname"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Fullname"
                    value={userdata.fullname}
                    onChange={registeruserchange}
                    required
                  />
                  <input
                    name="email"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    value={userdata.email}
                    onChange={registeruserchange}
                    required
                  />
                  <input
                    name="password"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    value={userdata.password}
                    onChange={registeruserchange}
                    required
                  />
                  <input
                    name="cpassword"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Confirm Password"
                    value={userdata.cpassword}
                    onChange={registeruserchange}
                    required
                  />
                  {/* Commenting out monthly income if not currently used */}
                  {/* <input
                    name="monthlyIncome"
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="number"
                    placeholder="Monthly Income"
                    value={userdata.monthlyIncome}
                    onChange={registeruserchange}
                    required
                  /> */}
                  {error && (
                    <p className="text-red-500 text-center text-sm mt-2">
                      {error}
                    </p>
                  )}
                  <Buttons
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    buttontext={"Sign Up"}
                  />
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's{" "}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <span className="hover:text-purple-500 text-purple-400 cursor-pointer">
                      <Link to={ROUTES.Login_Page}>Login here</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img src={expensebg2} alt="Background" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpg;
