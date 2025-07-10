import React, { useEffect } from "react";

const Popup = ({
  title = "",
  message = "Something happened.",
  onClose,
  showAuthButton = false, // Controls if Sign In button is shown
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
        <p className="text-sm text-gray-600 mb-4">{message}</p>

        {showAuthButton && (
          <button
            onClick={() => {
              onClose();
              window.location.href = "/signin";
            }}
            className="bg-brandBlue text-white px-4 py-2 rounded hover:bg-[#2DA7ED] transition"
          >
            Sign In / Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
