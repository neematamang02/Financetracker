import React from "react";

const WelcomeMessage = ({ name }) => {
  return (
    <div className="Username">
      <h1 className="font-bold text-3xl">Hello {name || "User"}!!</h1>
      <p className="text-gray-500">Welcome back!</p>
    </div>
  );
};

export default WelcomeMessage;
