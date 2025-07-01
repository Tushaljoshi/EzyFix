import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser"); // ✅ fetch active session
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser"); // ✅ remove active session
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-sm px-4 py-3 md:px-6">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-brandBlue">EzyFix</div>

        <div className="hidden md:flex space-x-6 text-sm text-gray-700 font-medium">
          <Link to="/" className="hover:text-brandBlue">Homepage</Link>
          <a href="#" className="hover:text-brandBlue">Coupon Details page</a>
          <Link to="/profile" className="hover:text-brandBlue">Profile Page</Link>
          <a href="#" className="hover:text-brandBlue">My Coupons</a>
          <Link to="/query" className="hover:text-brandBlue">Query Page</Link>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {!user ? (
            <>
              <Link to="/signin" className="text-sm text-gray-600 hover:text-brandBlue">Sign In</Link>
              <Link to="/signup" className="bg-brandBlue text-white text-sm px-4 py-2 rounded hover:bg-[#2DA7ED]">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <img
                  src={user.avatar || "https://via.placeholder.com/32"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border"
                />
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-red-500"
              >
                Sign Out
              </button>
            </>
          )}

          <input
            type="text"
            placeholder="Search deals..."
            className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue text-sm w-44"
          />
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

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
              <Link to="/signup" className="block text-white bg-brandBlue px-4 py-2 rounded hover:bg-[#2DA7ED]">Sign Up</Link>
            </>
          ) : (
            <>
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
              <button
                onClick={handleSignOut}
                className="text-left w-full text-red-500 hover:underline"
              >
                Sign Out
              </button>
            </>
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
