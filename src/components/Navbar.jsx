import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Wallet } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showWallet, setShowWallet] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/signin");
  };

  const handleWalletToggle = () => {
    if (!user) {
      alert("Please sign in to view your wallet.");
      return;
    }
    setShowWallet(!showWallet);
  };

  const handleCartClick = () => {
    if (!user) {
      alert("Please sign in to view your cart.");
      return;
    }
    navigate("/my-coupons");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-brandBlue">EzyFix</Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm font-medium items-center">
          <Link to="/" className="hover:text-brandBlue">Home</Link>
          <Link to="/coupons" className="hover:text-brandBlue">Coupons</Link>
          <Link to="/my-coupons" className="hover:text-brandBlue">My Coupons</Link>
          <Link to="/query" className="hover:text-brandBlue">Query</Link>
          <Link to="/profile" className="hover:text-brandBlue">Profile</Link>
        </div>

        {/* Icons and Auth */}
        <div className="flex gap-4 items-center">
          <button onClick={handleWalletToggle} className="text-gray-600 hover:text-brandBlue">
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
            <Link to="/signin" className="bg-brandBlue text-white px-4 py-1.5 rounded text-sm hover:bg-[#2DA7ED]">
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Wallet Section */}
      {showWallet && user && (
        <div className="bg-gray-100 py-4 border-t text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">🪙 Wallet Balance</h3>
          <p className="text-brandBlue font-bold text-xl mb-2">{user.wallet || 0} coins</p>
          <button
            onClick={() => navigate("/add-coins")}
            className="bg-brandBlue text-white px-4 py-2 rounded hover:bg-[#2DA7ED]"
          >
            Add Coins
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
