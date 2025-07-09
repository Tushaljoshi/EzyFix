import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MIN_COIN_BALANCE = 100;

const MyCoupons = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [purchasedCoupons, setPurchasedCoupons] = useState([]);
  const [cartCoupons, setCartCoupons] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const fetchUserData = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    setIsUserLoggedIn(true);
    const wallet = parseFloat(user.wallet || 0);
    setWalletBalance(wallet);

    const purchased = JSON.parse(localStorage.getItem("purchasedCoupons")) || [];
    const cart = JSON.parse(localStorage.getItem("cartCoupons")) || [];
    const history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    const redeemed = JSON.parse(localStorage.getItem("redeemedCoupons")) || [];

    setPurchasedCoupons(purchased);
    setCartCoupons(cart);
    setTransactions(history);
    setRedeemedCoupons(redeemed);
  };

  useEffect(() => {
    fetchUserData();
    window.addEventListener("storage", fetchUserData);
    return () => window.removeEventListener("storage", fetchUserData);
  }, []);

  const handleBuyNow = (coupon) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please sign in.");
      return;
    }

    const price = coupon.price || 250;
    if (walletBalance < MIN_COIN_BALANCE || walletBalance < price) {
      alert("❌ Insufficient coins. Minimum 100 coins required.");
      return;
    }

    const newBalance = walletBalance - price;
    const updatedPurchased = [...purchasedCoupons, { ...coupon, status: "Active" }];
    const updatedCart = cartCoupons.filter((c) => c.id !== coupon.id);
    const transaction = {
      id: Date.now(),
      title: coupon.title,
      amount: price,
      type: "Purchase",
      date: new Date().toLocaleString()
    };

    user.wallet = newBalance;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("purchasedCoupons", JSON.stringify(updatedPurchased));
    localStorage.setItem("cartCoupons", JSON.stringify(updatedCart));
    localStorage.setItem("transactionHistory", JSON.stringify([...transactions, transaction]));

    setWalletBalance(newBalance);
    setPurchasedCoupons(updatedPurchased);
    setCartCoupons(updatedCart);
    setTransactions([...transactions, transaction]);

    if (document.getElementById("liveWalletBalance")) {
      document.getElementById("liveWalletBalance").innerText = `🪙${newBalance.toFixed(2)}`;
    }

    window.dispatchEvent(new Event("storage"));

    alert("✅ Coupon purchased successfully!");
  };

  const handleRedeem = (coupon) => {
    const updatedCoupons = purchasedCoupons.map((c) =>
      c.id === coupon.id ? { ...c, status: "Redeemed", redeemedAt: new Date().toLocaleDateString() } : c
    );
    const redeemedCoupon = {
      couponId: coupon.id,
      code: coupon.code || "asd123xyz",
      type: coupon.category || "General",
      expireDate: coupon.validTill,
      price: coupon.price,
    };

    const updatedRedeemed = [...redeemedCoupons, redeemedCoupon];
    setPurchasedCoupons(updatedCoupons);
    setRedeemedCoupons(updatedRedeemed);

    localStorage.setItem("purchasedCoupons", JSON.stringify(updatedCoupons));
    localStorage.setItem("redeemedCoupons", JSON.stringify(updatedRedeemed));
    alert("🎉 Coupon redeemed successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        {isUserLoggedIn ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10 text-center">
            <div>
              <p className="text-xl font-bold text-brandBlue" id="liveWalletBalance">🪙{walletBalance.toFixed(2)}</p>
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
              <p className="text-xl font-bold text-brandBlue"></p>
              <p className="text-sm text-gray-600">Expiring Soon</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 mb-10">Please sign in to view your coupons.</div>
        )}

        <h2 className="text-2xl font-bold mb-4">Your Active Coupons</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCoupons.map((coupon) => (
            <div key={coupon.id} className="bg-white p-4 rounded shadow border">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800 text-sm">{coupon.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  coupon.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : coupon.status === "Expired"
                    ? "bg-red-100 text-red-500"
                    : "bg-blue-100 text-blue-600"
                }`}>{coupon.status}</span>
              </div>
              <p className="text-lg font-bold text-brandBlue mt-1">🪙{coupon.price}</p>
              <p className="text-sm text-gray-500 mb-3">Valid till: {coupon.validTill}</p>
              <div className="flex justify-between">
                <button className="bg-brandBlue text-white px-4 py-1 rounded text-sm" onClick={() => handleRedeem(coupon)}>Redeem</button>
                <button onClick={() => setShowDetails(true)} className="text-sm text-brandBlue underline">Details</button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">Coupons in Cart</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartCoupons.map((coupon) => (
            <div key={coupon.id} className="bg-white p-4 rounded shadow border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">{coupon.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">In Cart</span>
              </div>
              <p className="text-lg font-bold text-brandBlue mb-2">🪙{coupon.price}</p>
              <p className="text-sm text-gray-500 mb-4">Valid till: {coupon.validTill}</p>
              <div className="flex justify-between">
                <button onClick={() => handleBuyNow(coupon)} className="bg-brandBlue text-white px-4 py-1 rounded text-sm">Buy Now</button>
                <button onClick={() => setShowDetails(true)} className="text-sm text-brandBlue underline">Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* Redeemed Coupons Section */}
        <h2 className="text-2xl font-bold mt-12 mb-4">Redeemed Coupons</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="text-left p-3">Coupon ID</th>
                <th className="text-left p-3">Coupon Code</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Expiry</th>
                <th className="text-left p-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {redeemedCoupons.map((c, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">{c.couponId}</td>
                  <td className="p-3">{c.code}</td>
                  <td className="p-3">{c.type}</td>
                  <td className="p-3">{c.expireDate}</td>
                  <td className="p-3">🪙{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
              <p className="text-center">Coupon Details Coming Soon</p>
              <button onClick={() => setShowDetails(false)} className="mt-4 w-full bg-brandBlue text-white py-2 rounded">Close</button>
            </div>
          </div>
        )} 
      </div>
      <Footer />
    </div>
  );
};

export default MyCoupons;
