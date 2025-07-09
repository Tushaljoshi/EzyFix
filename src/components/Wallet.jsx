import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet } from "lucide-react";

const WalletPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
    const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    setTransactionHistory(history);
  }, []);

  const handleAddMoney = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || isNaN(amount) || amount < 100) {
      return alert("Minimum ₹100 required to add to wallet.");
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual key
      amount: amount * 100, // in paisa
      currency: "INR",
      name: "EzyFix Wallet",
      description: "Add Coins to Wallet",
      handler: function (response) {
        const updatedUser = {
          ...user,
          wallet: (user.wallet || 0) + amount,
        };
        setUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

        const newTransaction = {
          id: Date.now(),
          amount,
          type: "Top-up",
          date: new Date().toLocaleString(),
        };

        const updatedHistory = [newTransaction, ...transactionHistory];
        setTransactionHistory(updatedHistory);
        localStorage.setItem("transactionHistory", JSON.stringify(updatedHistory));

        alert(`₹${amount} added successfully!`);
        setSelectedAmount(null);
        setCustomAmount("");
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
      },
      theme: {
        color: "#3BB5FF",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="bg-brandBlue text-white py-4 px-6 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-bold">My Wallet</h1>
      </div>

      {/* Balance */}
      <div className="bg-brandBlue text-white rounded-xl mx-4 mt-5 p-5 text-center shadow-md">
        <div className="flex justify-center mb-2">
          <Wallet className="mr-2" />
          <span className="text-sm">Available Coins</span>
        </div>
        <h2 className="text-3xl font-bold">
          {typeof user?.wallet === "number" ? user.wallet.toFixed(0) : "0"} Coins
        </h2>
      </div>

      {/* Add Money Section */}
      <div className="bg-white mx-4 mt-6 p-5 rounded-xl shadow-md">
        <h2 className="text-md font-bold mb-4">Add Coins to Wallet</h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[100, 200, 500, 1000, 2000, 5000].map((amt) => (
            <button
              key={amt}
              onClick={() => {
                setSelectedAmount(amt);
                setCustomAmount("");
              }}
              className={`py-2 rounded border text-sm font-medium ${
                selectedAmount === amt
                  ? "bg-brandBlue text-white"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="₹ Enter custom amount"
          className="w-full border rounded px-3 py-2 mb-4 text-sm"
          value={customAmount}
          onChange={(e) => {
            setSelectedAmount(null);
            setCustomAmount(e.target.value);
          }}
        />
        <button
          onClick={handleAddMoney}
          className="w-full bg-brandBlue text-white py-2 rounded-md text-sm font-semibold"
        >
          Add Money
        </button>
        <p className="text-xs text-gray-500 mt-2">Note: Minimum add amount is ₹100</p>
      </div>

      {/* Transaction History */}
      <div className="bg-white mx-4 mt-6 mb-6 p-5 rounded-xl shadow-md">
        <h2 className="text-md font-bold mb-3">Transaction History</h2>
        {transactionHistory.length > 0 ? (
          <ul className="text-sm">
            {transactionHistory.map((tx) => (
              <li key={tx.id} className="flex justify-between py-2 border-b">
                <span>{tx.date}</span>
                <span className="text-green-600 font-semibold">+₹{tx.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
