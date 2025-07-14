import React, { useEffect, useState } from "react";
import { Home, Users, Sparkles, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, [location.pathname]);

  const handleProtectedClick = (path) => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <footer className="bg-gray-100 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
          {/* Language Button */}
          <div className="mb-4 md:mb-0">
            <button className="px-3 py-1.5 border rounded-md text-gray-600">English</button>
          </div>

          {/* Center Text */}
          <div className="text-center font-semibold text-gray-800">
            EzyFix
            <div className="text-xs mt-1 text-gray-500">
              © {new Date().getFullYear()} EzyFix Inc.
            </div>
          </div>

          {/* Right Side Icons with Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/">
              <Home className="w-5 h-5 text-gray-400 hover:text-brandBlue cursor-pointer" />
            </Link>
            <button onClick={() => handleProtectedClick("/profile")}>
              <Users className="w-5 h-5 text-gray-400 hover:text-brandBlue cursor-pointer" />
            </button>
            <button onClick={() => handleProtectedClick("/my-coupons")}>
              <Sparkles className="w-5 h-5 text-gray-400 hover:text-brandBlue cursor-pointer" />
            </button>
          </div>
        </div>
      </footer>

      {/* Sign In Required Popup */}
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
              Please sign in to access this feature.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowAuthPopup(false);
                  navigate("/signup");
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

export default Footer;
