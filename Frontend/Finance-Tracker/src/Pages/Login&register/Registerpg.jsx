// import { useState } from "react";
// import Buttons from "../../components/Buttons";
// import { Google } from "../../assets/logo";
// import { expensebg2 } from "../../assets/images";
// import { Link, useNavigate } from "react-router-dom";
// import ROUTES from "../../routes/routes";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { Eye, EyeSlash } from "iconsax-reactjs";

// const Registerpg = () => {
//   const navigate = useNavigate();
//   const [userdata, setuserdata] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     cpassword: "",
//     monthlyIncome: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const registeruserchange = (e) => {
//     setuserdata({ ...userdata, [e.target.name]: e.target.value });
//   };

//   const registeruser = async (e) => {
//     e.preventDefault();

//     try {
//       // Log to verify data before sending
//       console.log("User data to be sent:", userdata);
//       const response = await axios.post(`/api/auth/register`, {
//         name: userdata.fullname,
//         email: userdata.email,
//         password: userdata.password,
//         cpassword: userdata.cpassword,
//         monthlyIncome: Number(userdata.monthlyIncome),
//       });
//       toast.success("Registration successful! Please log in.");
//       navigate(ROUTES.Login_Page);
//     } catch (err) {
//       console.error(err);
//       toast.error(
//         err.response?.data?.message || "Registration failed. Please try again."
//       );
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="min-h-screen pt-20 text-gray-900 flex justify-center">
//         <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
//           <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
//             <div className="text-center">
//               <h1 className="font-bold text-5xl">Money Mate</h1>
//             </div>
//             <div className="mt-12 flex flex-col items-center">
//               <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
//               <div className="w-full flex-1 mt-8">
//                 <div className="flex flex-col items-center">
//                   <Buttons
//                     className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow"
//                     buttontext={"Sign Up with Google"}
//                   >
//                     <img
//                       src={Google || "/placeholder.svg"}
//                       className="w-4"
//                       alt="Google Icon"
//                     />
//                   </Buttons>
//                 </div>
//                 <div className="my-12 border-b text-center">
//                   <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
//                     Or sign up with e-mail
//                   </div>
//                 </div>
//                 <form onSubmit={registeruser}>
//                   <div className="mx-auto max-w-xs">
//                     <input
//                       name="fullname"
//                       className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                       type="text"
//                       placeholder="Fullname"
//                       value={userdata.fullname}
//                       onChange={registeruserchange}
//                       required
//                     />
//                     <input
//                       name="email"
//                       className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
//                       type="email"
//                       placeholder="Email"
//                       value={userdata.email}
//                       onChange={registeruserchange}
//                       required
//                     />
//                     <div className="relative mt-5">
//                       <input
//                         name="password"
//                         className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white pr-12"
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Password"
//                         value={userdata.password}
//                         onChange={registeruserchange}
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={togglePasswordVisibility}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                       >
//                         {showPassword ? (
//                           <EyeSlash
//                             size="20"
//                             color="#555555"
//                             variant="Broken"
//                           />
//                         ) : (
//                           <Eye size="20" color="#555555" variant="Broken" />
//                         )}
//                       </button>
//                     </div>
//                     <div className="relative mt-5">
//                       <input
//                         name="cpassword"
//                         className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white pr-12"
//                         type={showConfirmPassword ? "text" : "password"}
//                         placeholder="Confirm Password"
//                         value={userdata.cpassword}
//                         onChange={registeruserchange}
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={toggleConfirmPasswordVisibility}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                       >
//                         {showConfirmPassword ? (
//                           <EyeSlash
//                             size="20"
//                             color="#555555"
//                             variant="Broken"
//                           />
//                         ) : (
//                           <Eye size="20" color="#555555" variant="Broken" />
//                         )}
//                       </button>
//                     </div>
//                     {/* Commenting out monthly income if not currently used */}
//                     {/* <input
//                       name="monthlyIncome"
//                       className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
//                       type="number"
//                       placeholder="Monthly Income"
//                       value={userdata.monthlyIncome}
//                       onChange={registeruserchange}
//                       required
//                     /> */}
//                     <Buttons
//                       type="submit"
//                       className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
//                       buttontext={"Sign Up"}
//                     />
//                     <p className="mt-6 text-xs text-gray-600 text-center">
//                       I agree to abide by templatana&apos;s
//                       <a
//                         href="#"
//                         className="border-b border-gray-500 border-dotted"
//                       >
//                         Terms of Service
//                       </a>{" "}
//                       and its{" "}
//                       <a
//                         href="#"
//                         className="border-b border-gray-500 border-dotted"
//                       >
//                         Privacy Policy
//                       </a>
//                     </p>
//                     <p className="mt-6 text-xs text-gray-600 text-center">
//                       Already have an account?{" "}
//                       <span className="hover:text-purple-500 text-purple-400 cursor-pointer">
//                         <Link to={ROUTES.Login_Page}>Login here</Link>
//                       </span>
//                     </p>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
//             <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
//               <img src={expensebg2 || "/placeholder.svg"} alt="Background" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Registerpg;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  DollarSign,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ROUTES from "../../routes/routes";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
    monthlyIncome: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerUserChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`/api/auth/register`, {
        name: userdata.fullname,
        email: userdata.email,
        password: userdata.password,
        cpassword: userdata.cpassword,
        monthlyIncome: Number(userdata.monthlyIncome),
      });
      toast.success("Registration successful! Please log in.");
      navigate(ROUTES.Login_Page);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>

              {/* Main Illustration */}
              <div className="w-80 h-80 bg-gradient-to-br from-violet-100 to-blue-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-200/20 to-blue-200/20"></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      Smart Finance
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Take control of your financial future
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4 max-w-md">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Welcome to MoneyMate
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Join thousands of users who have transformed their financial
                lives with our intelligent money management platform.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">M</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Create Account
                  </h1>
                  <p className="text-gray-600">
                    Start your financial journey today
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Google Sign Up */}
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </Button>

                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500 font-medium">
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={registerUser} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="fullname"
                      type="text"
                      placeholder="Full Name"
                      value={userdata.fullname}
                      onChange={registerUserChange}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={userdata.email}
                      onChange={registerUserChange}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={userdata.password}
                      onChange={registerUserChange}
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="cpassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={userdata.cpassword}
                      onChange={registerUserChange}
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Account
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Terms and Login Link */}
                <div className="space-y-4 text-center text-sm">
                  <p className="text-gray-600">
                    By creating an account, you agree to our{" "}
                    <Link
                      to="#"
                      className="text-violet-600 hover:text-violet-700 font-medium underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="#"
                      className="text-violet-600 hover:text-violet-700 font-medium underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to={ROUTES.Login_Page}
                      className="text-violet-600 hover:text-violet-700 font-semibold hover:underline transition-all"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
