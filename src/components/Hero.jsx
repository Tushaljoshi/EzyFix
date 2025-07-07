import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="text-center py-20 bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
        Unlock Incredible Savings with <span className="text-brandBlue">EzyFix</span>
      </h1>
      <p className="max-w-2xl mx-auto text-gray-600 mb-8 text-lg">
        Your ultimate destination for thousands of exclusive deals on dining, travel, shopping and more!
      </p>
      <Link
        to="/signup"
        className="inline-block bg-brandBlue text-white px-6 py-3 text-lg rounded-md hover:bg-[#2DA7ED] transition"
      >
        Sign Up for Free
      </Link>
    </section>
  );
};

export default Hero;
