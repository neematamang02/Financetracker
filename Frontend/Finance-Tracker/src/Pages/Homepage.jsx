import React, { useEffect } from "react";
import { landingpgimg } from "../assets/images";
import Buttons from "../components/Buttons";
import Features from "./Features";
import FAQ from "./FAQ";
import Process from "./Process";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (state?.scrollTo) {
      // give React a moment to layout everything
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
      <section
        id="home"
        className="container min-h-screen mx-auto flex justify-center scroll-mt-24"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center justify-around gap-10 my-20 md:my-0">
          {/* Text Section */}
          <div className="content w-full lg:w-1/2 text-center lg:text-left px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-wide">
              <span className="text-blue-900">Save Money,</span> <br />
              Without thinking <br /> About it
            </h1>
            <p className="max-w-[600px] md:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              culpa rerum alias pariatur? Accusamus consectetur, pariatur sunt
              voluptate recusandae quod quidem nesciunt, id voluptatum a magni
              cumque saepe amet deleniti!
            </p>
            <Buttons
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-2xl text-sm font-bold cursor-pointer mt-5 animate-bounce"
              buttontext={"SIGN UP NOW"}
            />
          </div>

          {/* Image Section */}
          <div className="landingpgimg w-full lg:w-1/2 px-4">
            <img
              src={landingpgimg}
              alt="landingpgimg"
              className="w-full h-auto max-w-md mx-auto"
            />
          </div>
        </div>
      </section>
      <section id="features" className="py-20 scroll-mt-24">
        <Features />
      </section>
      <section id="faq" className="py-20 scroll-mt-24">
        <FAQ />
      </section>
      <section id="process" className="py-20 scroll-mt-24">
        <Process />
      </section>
    </>
  );
};

export default Homepage;
