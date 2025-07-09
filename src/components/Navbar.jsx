import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Wallet, X } from "lucide-react";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/signin");
  };

  const handleWalletClick = () => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate("/Wallet");
    }
  };

  const handleCartClick = () => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate("/my-coupons");
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-brandBlue">EzyFix</Link>

          <div className="flex gap-6 text-sm font-medium items-center">
            <Link to="/" className="hover:text-brandBlue">Home</Link>
            <Link to="/coupons" className="hover:text-brandBlue">Coupons</Link>
            <button onClick={() => handleProtectedClick("/my-coupons")} className="hover:text-brandBlue">My Coupons</button>
            <button onClick={() => handleProtectedClick("/query")} className="hover:text-brandBlue">Query</button>
            <button onClick={() => handleProtectedClick("/profile")} className="hover:text-brandBlue">Profile</button>
          </div>

          <div className="flex gap-4 items-center">
            <button onClick={handleWalletClick} className="text-gray-600 hover:text-brandBlue">
              <Wallet />
            </button>
            <button onClick={handleCartClick} className="text-gray-600 hover:text-brandBlue">
              <ShoppingCart />
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm">Hi, {user.name}</span>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthPopup(true)}
                className="bg-brandBlue text-white px-4 py-1.5 rounded text-sm hover:bg-[#2DA7ED]"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Sign In / Sign Up Popup */}
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

export default Navbar;
