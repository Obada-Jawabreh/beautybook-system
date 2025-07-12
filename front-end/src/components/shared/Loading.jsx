import React from "react";

const Loading = ({
  text = "Loading...",
  description = "Please wait...",
  size = "w-36 h-36",
  textSize = "text-2xl",
  descriptionSize = "text-sm",
}) => {
  return (
    <div className="flex justify-center items-center w-full py-20">
      <div className="text-center backdrop-blur-sm  rounded-2xl p-8 shadow-md">
        <div
          className={`mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center ${size}`}
        >
          <svg
            className="w-8 h-8 text-blue-400 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 className={`font-bold text-white mb-4 ${textSize}`}>{text}</h1>
        <p className={`text-zinc-400 ${descriptionSize}`}>{description}</p>
      </div>
    </div>
  );
};

export default Loading;
