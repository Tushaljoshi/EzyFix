import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Popup from "../components/Popup"; // ✅ Make sure this path is correct

const MIN_COIN_BALANCE = 100;

const MyCoupons = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [purchasedCoupons, setPurchasedCoupons] = useState([]);
  const [cartCoupons, setCartCoupons] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [popup, setPopup] = useState({ open: false, message: "" });
  const [visibleRedeemedCount, setVisibleRedeemedCount] = useState(5);
  const [visibleCartCount, setVisibleCartCount] = useState(6);
  const [visibleActiveCount, setVisibleActiveCount] = useState(6);



  const openPopup = (message) => setPopup({ open: true, message });
  const closePopup = () => setPopup({ open: false, message: "" });

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
      openPopup("Please sign in to buy a coupon.");
      return;
    }

    const price = coupon.price || 250;
    if (walletBalance < MIN_COIN_BALANCE || walletBalance < price) {
      openPopup("❌ Insufficient coins. Minimum 100 coins required.");
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
    openPopup("✅ Coupon purchased successfully!");
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
      redeemedAt: new Date().toLocaleString(),
    };


    const updatedRedeemed = [...redeemedCoupons, redeemedCoupon];
    setPurchasedCoupons(updatedCoupons);
    setRedeemedCoupons(updatedRedeemed);

    localStorage.setItem("purchasedCoupons", JSON.stringify(updatedCoupons));
    localStorage.setItem("redeemedCoupons", JSON.stringify(updatedRedeemed));
    openPopup("🎉 Coupon redeemed successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {popup.open && (
        <Popup title="Notice" message={popup.message} onClose={closePopup} />
      )}

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
              <p className="text-xl font-bold text-brandBlue">0</p>
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
                <span className={`text-xs px-2 py-0.5 rounded-full ${coupon.status === "Active"
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
        {cartCoupons.length === 0 ? (
          <p className="text-gray-500">No coupons in cart.</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...cartCoupons]
                .sort((a, b) => new Date(b.addedAt || b.createdAt || Date.now()) - new Date(a.addedAt || a.createdAt || Date.now()))
                .slice(0, visibleCartCount)
                .map((coupon) => (
                  <div key={coupon.id} className="bg-white p-4 rounded shadow border">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">{coupon.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">In Cart</span>
                    </div>
                    <p className="text-lg font-bold text-brandBlue mb-2">🪙{coupon.price}</p>
                    <p className="text-sm text-gray-500 mb-4">Valid till: {coupon.validTill}</p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleBuyNow(coupon)}
                        className="bg-brandBlue text-white px-4 py-1 rounded text-sm"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => setShowDetails(true)}
                        className="text-sm text-brandBlue underline"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {visibleCartCount < cartCoupons.length && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setVisibleCartCount((prev) => prev + 6)}
                  className="text-sm text-brandBlue hover:underline"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        <h2 className="text-2xl font-bold mt-12 mb-4">Redeemed Coupons</h2>
        {redeemedCoupons.length === 0 ? (
          <p className="text-gray-500">No redeemed coupons yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="p-3">Coupon ID</th>
                    <th className="p-3">Coupon Code</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Expiry</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Redeemed At</th>
                  </tr>
                </thead>
                <tbody>
                  {[...redeemedCoupons]
                    .sort((a, b) => new Date(b.redeemedAt) - new Date(a.redeemedAt)) // latest first
                    .slice(0, visibleRedeemedCount)
                    .map((c, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        <td className="p-3">{c.couponId || "N/A"}</td>
                        <td className="p-3">{c.code || "N/A"}</td>
                        <td className="p-3">{c.type || "General"}</td>
                        <td className="p-3">{c.expireDate || "N/A"}</td>
                        <td className="p-3">🪙{c.price || 0}</td>
                        <td className="p-3">{c.redeemedAt || "N/A"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {visibleRedeemedCount < redeemedCoupons.length && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setVisibleRedeemedCount((prev) => prev + 5)}
                  className="text-brandBlue hover:underline text-sm"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
              <p className="text-center">Coupon Details Coming Soon</p>
              <button onClick={() => setShowDetails(false)} className="mt-4 w-full bg-brandBlue text-white py-2 rounded">Close</button>
            </div>
          </div>
        )}
      </div>
      {/* How to Use Coupons Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How to Use Coupons on EzyFix</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brandBlue mb-2">1. Sign In or Register</h3>
            <p className="text-sm text-gray-600">Create an account or log in to access exclusive coupons, earn wallet coins, and manage your purchases.</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brandBlue mb-2">2. Browse Coupons</h3>
            <p className="text-sm text-gray-600">Explore categories like Food, Shopping, Travel, and more. Use filters and location detection to find nearby deals.</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brandBlue mb-2">3. Add to Cart or Buy Now</h3>
            <p className="text-sm text-gray-600">Add coupons to your cart to review later, or instantly buy them using your wallet coins with the “Buy Now” button.</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brandBlue mb-2">4. Redeem Coupons</h3>
            <p className="text-sm text-gray-600">Go to your “My Coupons” page and click “Redeem” to reveal the coupon code or barcode before use.</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brandBlue mb-2">5. Use at Store or Online</h3>
            <p className="text-sm text-gray-600">Show the coupon code at the billing counter or enter it online to enjoy the discount or deal instantly.</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-brandBlue mb-2">6. Track Your Activity</h3>
            <p className="text-sm text-gray-600">Check your transaction history and redeemed coupons anytime in your dashboard. Stay updated with new offers!</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyCoupons;
