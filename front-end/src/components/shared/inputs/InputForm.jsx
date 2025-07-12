import React, { useState } from "react";

export default function InputForm({
  label,
  id,
  errors,
  field,
  inputType = "text",
  isDisabled,
  placeholder,
  className = "",
  required,
  optional,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={`flex flex-col w-full gap-1 ${className} `}>
      <label htmlFor={id} className=" text-sm font-medium">
        {label}
        {required && <span className="text-[#4e4e53]"> (Required)</span>}
        {optional && <span className="text-[#4e4e53]"> (Optional)</span>}
      </label>
      <div className="relative">
        <input
          {...field}
          id={id}
          type={
            inputType === "password"
              ? showPassword
                ? "text"
                : "password"
              : inputType
          }
          placeholder={placeholder || label}
          className={`flex w-full px-4 py-3 items-center rounded-md border shadow outline-none transition-all duration-200 bg-transparent border-zinc-700 hover:border-blue-500 focus:border-blue-500  placeholder-zinc-500 focus:ring-1 focus:ring-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-700
            ${errors ? "border-red-500 focus:ring-red-500" : ""}
          `}
          disabled={isDisabled}
          aria-invalid={errors ? "true" : "false"}
        />
        {inputType === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[50%] translate-y-[-50%]  "
          >
            {showPassword ? <div>hide</div> : <div>show</div>}
          </button>
        )}
      </div>
      {errors && (
        <span className="text-sm text-red-600" role="alert">
          {errors.message}
        </span>
      )}
    </div>
  );
}
