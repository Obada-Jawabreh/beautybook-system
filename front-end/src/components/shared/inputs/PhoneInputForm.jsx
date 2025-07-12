import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneInputForm({
  label,
  id,
  errors,
  field,
  isDisabled,
  placeholder,
  className = "",
  required,
  optional,
}) {
  return (
    <div className={`flex flex-col w-full gap-1 ${className}`}>
      <label htmlFor={id} className="text-white text-sm font-medium">
        {label}
        {required && <span className="text-[#71717A]"> (Required)</span>}
        {optional && <span className="text-[#71717A]"> (Optional)</span>}
      </label>
      <div className="phone-input-container">
        <PhoneInput
          {...field}
          id={id}
          placeholder={placeholder || "Enter phone number"}
          disabled={isDisabled}
          defaultCountry="US"
          international
          countryCallingCodeEditable={false}
          className={`phone-input ${errors ? "error" : ""}`}
          style={{
            "--PhoneInputCountrySelect-background-color": "#18181b",
            "--PhoneInputCountrySelect-color": "white",
            "--PhoneInputCountrySelectArrow-color": "#6b7280",
          }}
        />
      </div>
      {errors && (
        <span className="text-sm text-red-600" role="alert">
          {errors.message}
        </span>
      )}

      <style jsx global>{`
        .phone-input-container {
          position: relative;
        }

        .phone-input {
          width: 100%;
        }

        .phone-input .PhoneInputInput {
          width: 100%;
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid #3f3f46;
          background-color: transparent;
          color: white;
          font-size: 16px;
          outline: none;
          transition: all 0.2s;
        }

        .phone-input .PhoneInputInput:hover {
          border-color: #3b82f6;
        }

        .phone-input .PhoneInputInput:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }

        .phone-input .PhoneInputInput::placeholder {
          color: #6b7280;
        }

        .phone-input .PhoneInputCountrySelect {
          background-color: transparent;
          border: none;
          color: white;
          margin-right: 12px;
          min-width: 80px;
          padding: 4px 8px;
        }

        .phone-input .PhoneInputCountrySelectArrow {
          color: #6b7280;
          margin-left: 6px;
        }

        .phone-input .PhoneInputCountryIcon {
          width: 24px;
          height: 18px;
          margin-right: 8px;
        }

        .phone-input.error .PhoneInputInput {
          border-color: #ef4444;
        }

        .phone-input.error .PhoneInputInput:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 1px #ef4444;
        }

        .phone-input .PhoneInputInput:disabled {
          background-color: #27272a;
          color: #6b7280;
          border-color: #3f3f46;
        }

        .PhoneInputCountrySelect option {
          background-color: #18181b !important;
          color: white !important;
          padding: 8px 12px;
        }

        .PhoneInputCountrySelect option:hover {
          background-color: #27272a !important;
        }

        .PhoneInputCountrySelect option:checked {
          background-color: #3b82f6 !important;
        }

        .PhoneInputCountrySelect {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }

        .PhoneInputCountrySelect:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .PhoneInputCountrySelect select {
          background-color: #18181b !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
