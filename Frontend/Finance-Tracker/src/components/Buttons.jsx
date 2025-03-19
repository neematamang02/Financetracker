// components/Button.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Buttons = ({
  navigateto,
  buttontext,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate(navigateto);
    }
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
      }`}
      disabled={disabled}
    >
      {buttontext}
    </button>
  );
};

export default Buttons;
