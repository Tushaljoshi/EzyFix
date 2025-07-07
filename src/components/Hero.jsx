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
    return (
      <motion.section
        className="relative bg-cover bg-center text-white py-32 px-6"
        style={{
          backgroundImage: `url('https://source.unsplash.com/1600x800/?discount,shopping,money')`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-brandBlue/60 z-0" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-5xl font-extrabold mb-4 leading-tight tracking-wide"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Hello, {userName}! 👋
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Exclusive deals await you. Discover hidden gems, mega discounts, and instant savings across dining, travel, and more!
          </motion.p>
          <Link
            to="/coupons"
            className="bg-brandBlue text-white px-6 py-3 text-lg font-bold rounded-md hover:bg-gray-100 transition shadow-lg"
          >
            Start Saving Now →
          </Link>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-24 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto z-10 relative">
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Save More, Spend Less with <span className="text-brandBlue">EzyFix</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Get unbeatable deals on your favorite brands, services, and experiences. Sign up today and unlock a world of savings!
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/signup"
            className="bg-brandBlue text-white px-6 py-3 text-lg font-semibold rounded-md hover:bg-[#2DA7ED] shadow-lg"
          >
            Sign Up for Free
          </Link>
        </motion.div>
      </div>

      {/* Decorative Shapes or Icons */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-brandBlue/20 rounded-full blur-3xl z-0"></div>
    </motion.section>
  );
};

export default Hero;
