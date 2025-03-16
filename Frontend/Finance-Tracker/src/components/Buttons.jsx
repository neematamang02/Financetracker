// components/Button.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Buttons = ({
  to,
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate(to);
    }
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Buttons;
