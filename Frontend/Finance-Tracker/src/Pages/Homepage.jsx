// import { useEffect } from "react";
// import { landingpgimg } from "../assets/images";
// import Buttons from "../components/Buttons";
// import Features from "./Features";
// import FAQ from "./FAQ";
// import Process from "./Process";
// import { useLocation } from "react-router-dom";

// const Homepage = () => {
//   const { state } = useLocation();

//   useEffect(() => {
//     if (state?.scrollTo) {
//       // give React a moment to layout everything
//       setTimeout(() => {
//         const el = document.getElementById(state.scrollTo);
//         if (el) {
//           el.scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//       }, 100);
//     }
//   }, [state]);
//   return (
//     <>
//       <section
//         id="home"
//         className="container min-h-screen mx-auto flex justify-center scroll-mt-24"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
//           <div className="landingpgimg order-first lg:order-last w-full px-4 flex justify-center">
//             <img
//               src={landingpgimg}
//               alt="landing page graphic"
//               className="w-full h-auto object-cover"
//             />
//           </div>
//           <div className="content order-last lg:order-first w-full text-center lg:text-left px-4">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-wide">
//               <span className="text-blue-900">Save Money,</span> <br />
//               Without thinking <br /> About it
//             </h1>
//             <p className="md:text-xl">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
//               culpa rerum alias pariatur? Accusamus consectetur, pariatur sunt
//               voluptate recusandae quod quidem nesciunt, id voluptatum a magni
//               cumque saepe amet deleniti!
//             </p>
//             <Buttons
//               className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-2xl text-sm font-bold cursor-pointer mt-5 animate-bounce"
//               buttontext="SIGN UP NOW"
//             />
//           </div>
//         </div>
//       </section>

//       <section id="features" className="py-20 scroll-mt-24">
//         <Features />
//       </section>
//       <section id="faq" className="py-20 scroll-mt-24">
//         <FAQ />
//       </section>
//       <section id="process" className="py-20 scroll-mt-24">
//         <Process />
//       </section>
//     </>
//   );
// };

// export default Homepage;

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Features from "./Features";
import FAQ from "./FAQ";
import Process from "./Process";

import ROUTES from "@/routes/routes";

const Homepage = () => {
  const { state } = useLocation();
  const router = useNavigate();

  useEffect(() => {
    if (state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(state.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [state]);

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 animate-pulse"></div>

        <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <Badge className="bg-violet-100 text-violet-700 border-violet-200 px-4 py-2">
                  ✨ Trusted by 10,000+ users
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Save Money,
                  </span>
                  <br />
                  <span className="text-gray-800">Without thinking</span>
                  <br />
                  <span className="text-gray-800">About it</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Transform your financial future with intelligent money
                  management. Track expenses, set goals, and build wealth
                  effortlessly with our AI-powered platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => router(ROUTES.Register_page)}
                  className="h-14 px-8 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="mr-2">Sign Up Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-violet-600">10K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-violet-600">$2M+</div>
                  <div className="text-sm text-gray-600">Money Saved</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-violet-600">4.9★</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Dashboard Preview */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">
                          Monthly Overview
                        </h3>
                        <Badge className="bg-green-100 text-green-700">
                          +12.5%
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Income</span>
                          <span className="font-semibold text-green-600">
                            $5,240
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Expenses
                          </span>
                          <span className="font-semibold text-red-600">
                            $3,180
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Savings</span>
                          <span className="font-semibold text-blue-600">
                            $2,060
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating Cards */}
                <Card className="absolute -top-4 -right-4 bg-white shadow-lg border-0 w-48 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          Goal Progress
                        </div>
                        <div className="text-xs text-gray-600">
                          85% Complete
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="absolute -bottom-4 -left-4 bg-white shadow-lg border-0 w-44 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Secure</div>
                        <div className="text-xs text-gray-600">
                          Bank-level encryption
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-purple-200 rounded-3xl blur-3xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-24">
        <Features />
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 scroll-mt-24">
        <Process />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 scroll-mt-24">
        <FAQ />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-violet-100 leading-relaxed">
              Join thousands of users who have already taken control of their
              financial future. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router(ROUTES.Register_page)}
                className="h-14 px-8 bg-white text-violet-600 hover:bg-gray-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="mr-2">Sign Up Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-violet-100">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="ml-2">Rated 4.9/5 by 1000+ users</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
