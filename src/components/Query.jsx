import React from "react";
import Navbar from "./Navbar";

const Query = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Submit Your Query</h1>
        <p className="text-center text-gray-600 mb-10">
          Have a question, issue, or feedback? We're here to help!
        </p>

        <form className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Your Name</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Subject</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
              placeholder="e.g. Payment issue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Message</label>
            <textarea
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brandBlue"
              rows="4"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-brandBlue text-white px-6 py-2 rounded hover:bg-[#2DA7ED] transition"
            >
              Submit Query
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Query;
