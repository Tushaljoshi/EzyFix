import React from "react";
import { Home, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
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
          <Link to="/profile">
            <Users className="w-5 h-5 text-gray-400 hover:text-brandBlue cursor-pointer" />
          </Link>
          <Link to="/my-coupons">
            <Sparkles className="w-5 h-5 text-gray-400 hover:text-brandBlue cursor-pointer" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
