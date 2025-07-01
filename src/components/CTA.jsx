import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link

const CTA = () => {
  return (
    <section className="bg-brandBlue py-16 px-6 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">Ready to Start Saving Smarter?</h2>
      <p className="mb-6 max-w-xl mx-auto text-lg">
        Sign up for EzyFix today and get instant access to exclusive deals and personalized offers. Your wallet will thank you!
      </p>
      <Link to="/coupons">
        <button className="bg-white text-brandBlue font-semibold px-6 py-3 rounded hover:bg-gray-100">
          Get Your First Coupons Now!
        </button>
      </Link>
    </section>
  );
};

export default CTA;
