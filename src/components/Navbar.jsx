import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Wallet } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cartCoupons")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, [location.pathname]);

  const handleProtectedClick = (path) => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate(path);
      setIsMobileMenuOpen(false);
    }
  };

  const handleWalletClick = () => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate("/wallet");
      setIsMobileMenuOpen(false);
    }
  };

  const handleCartClick = () => {
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate("/my-coupons");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-brandBlue">EzyFix</Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-sm font-medium items-center">
            <Link to="/" className="hover:text-brandBlue">Home</Link>
            <Link to="/coupons" className="hover:text-brandBlue">Coupons</Link>
            <button onClick={() => handleProtectedClick("/my-coupons")} className="hover:text-brandBlue">My Coupons</button>
            <button onClick={() => handleProtectedClick("/query")} className="hover:text-brandBlue">Query</button>
            <button onClick={() => handleProtectedClick("/profile")} className="hover:text-brandBlue">Profile</button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Wallet */}
            <button onClick={handleWalletClick} className="text-gray-600 hover:text-brandBlue flex items-center gap-1">
              <Wallet className="w-5 h-5" />
              {user && (
                <span className="text-sm text-brandBlue font-medium">
                  🪙{parseFloat(user.wallet || 0).toFixed(0)}
                </span>
              )}
            </button>

            {/* Cart with badge */}
            <div className="relative">
              <button onClick={handleCartClick} className="text-gray-600 hover:text-brandBlue">
                <ShoppingCart className="w-5 h-5" />
              </button>
              {user && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-0.5 py-0.3 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Auth or Greet */}
            {user ? (
              <span className="text-sm text-gray-700 hidden sm:inline">Hi, {user.name}</span>
            ) : (
              <button
                onClick={() => setShowAuthPopup(true)}
                className="bg-brandBlue text-white px-4 py-1.5 rounded text-sm hover:bg-[#2DA7ED]"
              >
                Sign In / Sign Up
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-600 hover:text-brandBlue"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-brandBlue">Home</Link>
            <Link to="/coupons" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-brandBlue">Coupons</Link>
            <button onClick={() => handleProtectedClick("/my-coupons")} className="block w-full text-left hover:text-brandBlue">My Coupons</button>
            <button onClick={() => handleProtectedClick("/query")} className="block w-full text-left hover:text-brandBlue">Query</button>
            <button onClick={() => handleProtectedClick("/profile")} className="block w-full text-left hover:text-brandBlue">Profile</button>
          </div>
        )}
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

export default Navbar;
