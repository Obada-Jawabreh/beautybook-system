import React from "react";

const Dropdown = ({
  label,
  options,
  onSelect,
  headLabel,
  error,
  disabled,
  classes,
  value,
  required,
  loading = false,
}) => {
  const handleChange = (e) => {
    onSelect(e.target.value);
  };

  const getOptionValue = (option) => {
    return typeof option === "object" && option.value !== undefined
      ? String(option.value)
      : String(option);
  };

  const getOptionLabel = (option) => {
    return typeof option === "object" && option.label !== undefined
      ? String(option.label)
      : String(option);
  };

  return (
    <div className={`w-full flex flex-col gap-1 ${classes}`}>
      {headLabel && (
        <label className="text-sm font-medium">
          {headLabel}
          {required && <span className="text-[#4e4e53]"> (Required)</span>}
        </label>
      )}

      <div className="relative">
        <select
          value={value || ""}
          onChange={handleChange}
          disabled={disabled || loading}
          className={`
            flex w-full px-4 py-3 items-center rounded-md border shadow outline-none transition-all duration-200
            bg-transparent border-zinc-700 hover:border-blue-500 focus:border-blue-500 
            focus:ring-1 focus:ring-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-700
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            appearance-none
          `}
          aria-label={label}
        >
          <option value="" disabled className="text-zinc-500">
            {loading ? "Loading..." : `Select ${label}`}
          </option>

          {options.length > 0 ? (
            options.map((option, index) => (
              <option
                key={index}
                value={getOptionValue(option)}
                className="text-black"
              >
                {getOptionLabel(option)}
              </option>
            ))
          ) : (
            <option disabled>No options available</option>
          )}
        </select>

        {/* Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-500">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
