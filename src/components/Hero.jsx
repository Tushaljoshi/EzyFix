import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name || "User");
    }
  }, []);

  if (isLoggedIn) {
    // 🔐 Logged-in Hero Section
    return (
      <motion.section
        className="relative bg-cover bg-center text-white py-28 px-6"
        style={{
          backgroundImage: `url('https://source.unsplash.com/1600x900/?shopping,sale,coupons')`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-brandBlue/70 z-0" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome back, <span className="text-brandBlue">{userName}</span> 👋
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Explore new deals and save up to <strong>90%</strong> on your favorite categories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/coupons"
              className="inline-block bg-white text-brandBlue font-bold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              View Coupons
            </Link>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  // 🌟 Guest Hero Section
  return (
    <motion.section
      className="text-center py-24 px-6 bg-gradient-to-b from-white to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Unlock Incredible Savings with <span className="text-brandBlue">EzyFix</span>
      </motion.h1>
      <motion.p
        className="max-w-2xl mx-auto text-gray-600 mb-8 text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Your ultimate destination for exclusive discounts on dining, travel, entertainment & more!
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          to="/signup"
          className="inline-block bg-brandBlue text-white px-6 py-3 text-lg font-bold rounded-md hover:bg-[#2DA7ED] shadow-lg transition"
        >
          Sign Up for Free
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Hero;