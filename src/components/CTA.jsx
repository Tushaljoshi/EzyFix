import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const CTA = () => {
  const navigate = useNavigate();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const handleCTA = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate("/coupons");
    }
  };

  return (
    <>
      <section className="bg-brandBlue py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Saving Smarter?</h2>
        <p className="mb-6 max-w-xl mx-auto text-lg">
          Sign up for EzyFix today and get instant access to exclusive deals and personalized offers. Your wallet will thank you!
        </p>
        <button
          onClick={handleCTA}
          className="bg-white text-brandBlue font-semibold px-6 py-3 rounded hover:bg-gray-100"
        >
          Get Your First Coupons Now!
        </button>
      </section>

      {/* Auth Popup */}
      {showAuthPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
            >
              <X />
            </button>
            <h2 className="text-lg font-bold text-center mb-3">Sign In Required</h2>
            <p className="text-sm text-center text-gray-600 mb-4">
              Please sign in to access coupons and start saving.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowAuthPopup(false);
                  navigate("/signin");
                }}
                className="bg-brandBlue text-white px-6 py-2 rounded hover:bg-[#2DA7ED]"
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CTA;
