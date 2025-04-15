import React from "react";
import { landingpgimg } from "../assets/images";
import Buttons from "../components/Buttons";

const Homepage = () => {
  return (
    <>
      <div className="homepage p-10">
        <div className="grid xl:grid-cols-2 text-center xl:text-left">
          <div className="content p-13">
            <h1 className="text-7xl font-bold mb-5 tracking-wide">
              <span className="text-blue-900">Save Money,</span> <br /> Without
              thinking <br /> About it
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              culpa rerum alias pariatur? Accusamus consectetur, pariatur sunt
              voluptate recusandae quod quidem nesciunt, id voluptatum a magni
              cumque saepe amet deleniti!
            </p>
            <Buttons
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-2xl w-45 text-sm font-bold cursor-pointer mt-5"
              buttontext={"SIGN UP NOW"}
            ></Buttons>
          </div>
          <div className="landingpgimg">
            <img src={landingpgimg} alt="landingpgimg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
