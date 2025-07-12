import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          You do not have permission to view this page.
        </p>
        <a
          href="/auth/login"
          className="text-blue-500 hover:text-blue-700 text-lg font-medium"
        >
          Go back to Login
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
