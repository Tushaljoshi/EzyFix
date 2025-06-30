import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for mobile menu icons

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <nav className="bg-white shadow-sm px-4 py-3 md:px-6">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-brandBlue">EzyFix</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-sm text-gray-700 font-medium">
          <Link to="/" className="hover:text-brandBlue">Homepage</Link>
          <a href="#" className="hover:text-brandBlue">Coupon Details page</a>
          <Link to="/profile" className="hover:text-brandBlue">Profile Page</Link>
          <a href="#" className="hover:text-brandBlue">My Coupons</a>
          <Link to="/query" className="hover:text-brandBlue">Query Page</Link>
        </div>

        {/* Right section (auth + search + profile) */}
        <div className="hidden md:flex items-center space-x-3">
          {!user ? (
            <>
              <Link to="/signin" className="text-sm text-gray-600 hover:text-brandBlue">Sign In</Link>
              <Link to="/signup" className="bg-brandBlue text-white text-sm px-4 py-2 rounded hover:bg-[#2DA7ED]">Sign Up</Link>
            </>
          ) : (
            <Link to="/profile">
              <img
                src={user.avatar || "https://via.placeholder.com/32"}
                alt="User"
                className="w-8 h-8 rounded-full object-cover border"
              />
            </Link>
          )}

          <input
            type="text"
            placeholder="Search deals..."
            className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue text-sm w-44"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="mt-4 md:hidden space-y-4 text-sm text-gray-700">
          <Link to="/" className="block hover:text-brandBlue">Homepage</Link>
          <a href="#" className="block hover:text-brandBlue">Coupon Details page</a>
          <Link to="/profile" className="block hover:text-brandBlue">Profile Page</Link>
          <a href="#" className="block hover:text-brandBlue">My Coupons</a>
          <Link to="/query" className="block hover:text-brandBlue">Query Page</Link>

          {!user ? (
            <>
              <Link to="/signin" className="block hover:text-brandBlue">Sign In</Link>
              <Link to="/signup" className="block text-white bg-brandBlue px-4 py-2 rounded hover:bg-[#2DA7ED]">
                Sign Up
              </Link>
            </>
          ) : (
            <Link to="/profile" className="block">
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar || "https://via.placeholder.com/32"}
                  alt="User"
                  className="w-8 h-8 rounded-full border object-cover"
                />
                <span className="text-sm">{user.name || "Your Profile"}</span>
              </div>
            </Link>
          )}

          <input
            type="text"
            placeholder="Search deals..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue text-sm"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
