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
      className={className}
      disabled={disabled}
    >
      {buttontext}
    </button>
  );
};

export default Buttons;
