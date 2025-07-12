import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
}) => {
  const baseStyles =
    "flex items-center justify-center gap-x-2 px-6 py-3.5 rounded-md transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white  hover:scale-105 hover:shadow-lg",
    gradient:
      "bg-gradient-to-r from-[rgba(5,43,75,1)] to-[rgba(11,102,177,1)] text-white hover:opacity-90",
    danger: "bg-[#D93025] text-white hover:bg-[#b6261f]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} cursor-pointer font-mulish`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "gradient", "danger"]),
};

export default Button;
