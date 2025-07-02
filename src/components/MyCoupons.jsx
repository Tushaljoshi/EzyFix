import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CouponDetailsPopup = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gourmet Bites</h2>
        <button onClick={onClose} className="text-gray-500">✕</button>
      </div>
      <ul className="text-sm text-gray-700 mb-4">
        <li><strong>Offer Details:</strong> 20% off your entire order at Gourmet Bites online.</li>
        <li><strong>Expiry Date:</strong> Dec 31, 2024</li>
        <li><strong>Coupon Cost:</strong> 360</li>
        <li><strong>Coupon ID:</strong> 1234-qwerty-567</li>
      </ul>
      <h3 className="text-gray-800 font-bold mb-2">Details</h3>
      <p className="text-sm text-gray-600 mb-4">
        Elit nisi ad excepteur aliquip cupidatat aliquip occaecat consectetur ex. Non culpa laborum pariatur mollit anim et nisi quis sint enim consequat fugiat consequat labore.
      </p>
      <textarea className="w-full p-2 border rounded mb-2" placeholder="Add a comment..."></textarea>
      <button className="bg-brandBlue text-white px-3 py-1 rounded text-sm mb-3">Submit</button>
      <div className="text-center text-yellow-400 text-xl">★★★★☆</div>
    </div>
  </div>
);

const MyCoupons = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [purchasedCoupons, setPurchasedCoupons] = useState([]);
  const [cartCoupons, setCartCoupons] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      setIsUserLoggedIn(false);
      return;
    }
    setIsUserLoggedIn(true);

    const wallet = parseFloat(user?.wallet || 0);
    setWalletBalance(wallet);

    const purchased = JSON.parse(localStorage.getItem("purchasedCoupons")) || [];
    const cart = JSON.parse(localStorage.getItem("cartCoupons")) || [];
    const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    const redeemed = JSON.parse(localStorage.getItem("redeemedCoupons")) || [];

    setPurchasedCoupons(purchased);
    setCartCoupons(cart);
    setTransactions(history);
    setRedeemedCoupons(redeemed);
  }, []);

  const handleBuyNow = (coupon) => {
    if (!isUserLoggedIn) {
      alert("Please sign in to buy coupons.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const pin = prompt("Enter your wallet PIN to confirm purchase:");
    if (pin !== user.pin) {
      alert("Incorrect PIN. Transaction cancelled.");
      return;
    }

    const price = 250;
    if (walletBalance < price) {
      alert("Insufficient wallet balance.");
      return;
    }

    const newBalance = walletBalance - price;
    const updatedPurchased = [...purchasedCoupons, { ...coupon, status: "Active" }];
    const updatedCart = cartCoupons.filter((c) => c.id !== coupon.id);
    const newTransaction = {
      id: Date.now(),
      title: coupon.title,
      amount: price,
      date: new Date().toLocaleString(),
      type: "Purchase"
    };

    const updatedTransactions = [...transactions, newTransaction];

    setWalletBalance(newBalance);
    setPurchasedCoupons(updatedPurchased);
    setCartCoupons(updatedCart);
    setTransactions(updatedTransactions);

    localStorage.setItem("purchasedCoupons", JSON.stringify(updatedPurchased));
    localStorage.setItem("cartCoupons", JSON.stringify(updatedCart));
    localStorage.setItem("transactionHistory", JSON.stringify(updatedTransactions));

    if (user) {
      user.wallet = newBalance;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }

    alert("Coupon purchased successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Wallet and Stats */}
        {isUserLoggedIn ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10 text-center">
            <div>
              <p className="text-xl font-bold text-brandBlue">₹{walletBalance.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Wallet Balance</p>
            </div>
            <div>
              <p className="text-xl font-bold text-brandBlue">{purchasedCoupons.length + cartCoupons.length}</p>
              <p className="text-sm text-gray-600">Total Coupons</p>
            </div>
            <div>
              <p className="text-xl font-bold text-brandBlue">{purchasedCoupons.filter(c => c.status === 'Active').length}</p>
              <p className="text-sm text-gray-600">Active Coupons</p>
            </div>
            <div>
              <p className="text-xl font-bold text-brandBlue">{redeemedCoupons.length}</p>
              <p className="text-sm text-gray-600">Redeemed This Month</p>
            </div>
            <div>
              <p className="text-xl font-bold text-brandBlue">3</p>
              <p className="text-sm text-gray-600">Expiring Soon</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 mb-10">Please sign in to view your coupons and transaction history.</div>
        )}

        {/* Coupon Cards */}
        <h2 className="text-2xl font-bold mb-4">Your Active Coupons</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isUserLoggedIn && purchasedCoupons.map((coupon) => (
            <div key={coupon.id} className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">{coupon.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  coupon.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : coupon.status === "Expired"
                    ? "bg-red-100 text-red-500"
                    : "bg-blue-100 text-blue-600"
                }`}>
                  {coupon.status}
                </span>
              </div>
              <p className="text-lg font-bold text-brandBlue mb-2">{coupon.discount}</p>
              <p className="text-sm text-gray-500 mb-4">Valid till: {coupon.validTill}</p>
              <div className="flex justify-between">
                <button className="text-white bg-brandBlue px-4 py-1 rounded text-sm">Redeem Now</button>
                <button onClick={() => setShowDetails(true)} className="text-sm text-brandBlue underline">Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Coupons */}
        <h2 className="text-2xl font-bold mt-12 mb-4">Coupons in Cart</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isUserLoggedIn && cartCoupons.map((coupon) => (
            <div key={coupon.id} className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">{coupon.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">{coupon.status}</span>
              </div>
              <p className="text-lg font-bold text-brandBlue mb-2">{coupon.discount}</p>
              <p className="text-sm text-gray-500 mb-4">Valid till: {coupon.validTill}</p>
              <div className="flex justify-between">
                <button onClick={() => handleBuyNow(coupon)} className="text-white bg-brandBlue px-4 py-1 rounded text-sm">Buy Now</button>
                <button onClick={() => setShowDetails(true)} className="text-sm text-brandBlue underline">Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction History */}
        {isUserLoggedIn && (
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-4">Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded">
                <thead>
                  <tr className="bg-gray-100 text-sm text-gray-700">
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Title</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-t text-sm">
                      <td className="p-3 text-gray-600">{txn.date}</td>
                      <td className="p-3 text-gray-800">{txn.title}</td>
                      <td className="p-3 text-blue-500">{txn.type}</td>
                      <td className="p-3 text-gray-800">₹{txn.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Redeemed History */}
        {isUserLoggedIn && (
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-4">Redeemed Coupons History</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {redeemedCoupons.map((coupon) => (
                <div key={coupon.id} className="bg-white p-4 rounded shadow border border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{coupon.title}</h3>
                  <p className="text-sm text-gray-600">Redeemed on: {coupon.redeemedDate}</p>
                  <p className="text-sm text-gray-500 mt-1">Code: {coupon.code}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4">How Coupons Work</h3>
          <div className="bg-white p-4 rounded shadow">
            <details className="mb-2">
              <summary className="cursor-pointer font-medium">How do I redeem my purchased coupons?</summary>
              <p className="text-sm text-gray-600 mt-1">You can redeem them on partner sites or in store by showing the code.</p>
            </details>
            <details className="mb-2">
              <summary className="cursor-pointer font-medium">What happens if a coupon expires?</summary>
              <p className="text-sm text-gray-600 mt-1">Expired coupons will no longer be valid for use.</p>
            </details>
            <details className="mb-2">
              <summary className="cursor-pointer font-medium">Can I share my coupons with others?</summary>
              <p className="text-sm text-gray-600 mt-1">Most coupons are for personal use only and cannot be shared.</p>
            </details>
          </div>
        </div>
      </div>

      <Footer />
      {showDetails && <CouponDetailsPopup onClose={() => setShowDetails(false)} />}
    </div>
  );
};

export default MyCoupons;
