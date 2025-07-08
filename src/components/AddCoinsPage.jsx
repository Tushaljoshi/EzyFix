import React from "react";
import { useNavigate, Link } from "react-router-dom";

const AddCoins = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: 100 * 100,
      currency: "INR",
      name: "Coupon Wallet",
      description: "Add Coins",
      handler: function (response) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
        loggedInUser.wallet = (loggedInUser.wallet || 0) + 100;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
        transactionHistory.push({
          id: Date.now(),
          amount: 100,
          type: "Top-up",
          date: new Date().toLocaleString(),
          paymentId: response.razorpay_payment_id
        });
        localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));

        alert("Coins added successfully!");
        navigate("/");
      },
      prefill: {
        name: "User",
        email: "user@example.com",
      },
      theme: {
        color: "#3BB5FF",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4 text-brandBlue">Add Coins to Wallet</h2>
        <p className="text-sm text-gray-600 mb-4">
          Add coins to enjoy exclusive deals. <br />
          <strong>1 Rupee = 1 Coin</strong>
        </p>

        {/* Add Coin Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-brandBlue text-white py-2 rounded hover:bg-[#2DA7ED] transition"
        >
          Add ₹100 / 100 Coins
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-3 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <p className="text-xs text-gray-500 mt-4">
          By proceeding, you agree to our{" "}
          <span className="underline text-brandBlue cursor-pointer">Terms & Conditions</span>.
        </p>

        {/* Transaction Link */}
        <div className="mt-5">
          <Link
            to="/transactions"
            className="inline-block text-sm text-brandBlue hover:underline transition"
          >
            💳 View Transaction History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddCoins;
