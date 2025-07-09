import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";

const categories = [
  "All Deals", "Food", "Retail", "Restaurants", "Education", "Health", "Sports",
  "Hotels & Travels", "Online Shopping"
];

const trendingCoupons = [
  { title: "Deep Home Clean", price: 250, category: "Home" },
  { title: "Full Car Service", price: 250, category: "Services" },
  { title: "Pro Gaming Headset", price: 250, category: "Electronics" },
  { title: "Smart Thermostat", price: 250, category: "Electronics" },
];

const initialReviews = [
  { name: "Aman", rating: 5, comment: "Great value for money!" },
  { name: "Riya", rating: 4, comment: "Tasty food and quick service." },
];
const MIN_COIN_BALANCE = 100;
const CouponsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Deals");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(initialReviews);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setWalletBalance(user?.wallet || 0);
  }, []);

  const filteredCoupons = selectedCategory === "All Deals"
    ? trendingCoupons
    : trendingCoupons.filter(coupon => coupon.category === selectedCategory);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartCoupons")) || [];
    cart.push({ ...selectedCoupon, quantity });
    localStorage.setItem("cartCoupons", JSON.stringify(cart));
    alert("Coupon added to cart!");
    setSelectedCoupon(null);
  };

  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("⚠️ Please sign in first.");
      return;
    }

    const cost = quantity * selectedCoupon.price;
    const currentBalance = Number(user.wallet);

    if (currentBalance < cost) {
      alert("❌ Insufficient coins in wallet. Redirecting to Add Coins...");
      window.location.href = "/wallet";
      return;
    }

    const newBalance = currentBalance - cost;
    user.wallet = newBalance;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setWalletBalance(newBalance);

    const purchased = JSON.parse(localStorage.getItem("purchasedCoupons")) || [];
    purchased.push({ ...selectedCoupon, quantity });
    localStorage.setItem("purchasedCoupons", JSON.stringify(purchased));

    const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    transactionHistory.push({
      id: Date.now(),
      title: selectedCoupon.title,
      amount: cost,
      type: "Purchase",
      date: new Date().toLocaleString(),
    });
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));

    window.dispatchEvent(new Event("storage"));
    alert("✅ Purchase successful!");
    setSelectedCoupon(null);
  };

  const handleReviewSubmit = () => {
    if (newReview.name && newReview.comment) {
      setReviews([newReview, ...reviews]);
      setVisibleReviews(visibleReviews + 1);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  const getCategorySlogan = (category) => {
    const slogans = {
      "Food": "Delicious Deals to Savor!",
      "Retail": "Retail Therapy Starts Here!",
      "Restaurants": "Dine Out with Savings!",
      "Education": "Smart Deals for Smart Minds!",
      "Health": "Healthy Savings for a Healthier You!",
      "Sports": "Score Big with These Sports Deals!",
      "Hotels & Travels": "Adventure Awaits with These Offers!",
      "Online Shopping": "Your Cart Deserves Discounts!",
      "Home": "Clean Up With These Savings!",
      "Services": "Get More Done for Less!",
      "Electronics": "Tech Deals You Can't Miss!"
    };
    return slogans[category] || "Unbeatable Deals Just for You!";
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="text-center py-16 bg-brandBlue">
          <h1 className="text-3xl font-bold text-white mb-2">
            {selectedCategory === "All Deals" ? (
              <>Discover <span className="text-yellow-300">Unbeatable</span> Deals</>
            ) : (
              <>{getCategorySlogan(selectedCategory)}</>
            )}
          </h1>
          {selectedCategory === "All Deals" && (
            <p className="text-white">Find your next great coupon, from food to fashion, all in one place.</p>
          )}
        </section>

        <section className="py-6">
          <h2 className="text-center font-semibold text-gray-700 mb-4 text-lg">Explore Categories</h2>
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? "bg-brandBlue text-white" : "bg-white text-gray-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {filteredCoupons.map((coupon, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCoupon(coupon);
                  setQuantity(1);
                }}
                className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg"
              >
                <img src="#" alt="Coupon" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{coupon.title}</h3>
                  <p className="text-sm text-gray-500">Save up to 50% off on top {coupon.category.toLowerCase()} offers.</p>
                  <p className="text-sm text-gray-500">Expiry: 31st Dec 2025</p>
                  <button className="mt-3 w-full bg-brandBlue text-white py-2 rounded hover:bg-[#2DA7ED]">Grab Coupon</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedCoupon && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center overflow-y-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-auto relative p-6 max-h-[95vh] overflow-y-auto">
              <button onClick={() => setSelectedCoupon(null)} className="absolute top-2 right-3 text-xl text-gray-400 hover:text-gray-600">×</button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img src="#" alt="Coupon" className="w-full h-64 object-cover rounded mb-4" />
                  <p className="text-sm text-gray-500">Expiry Date: <strong>31st Dec 2025</strong></p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{selectedCoupon.title}</h2>
                  <p className="text-brandBlue text-xl font-bold mb-2">🪙 {selectedCoupon.price}</p>
                  <p className="text-gray-700 mb-4 text-sm">Save up to 50% off on top {selectedCoupon.category?.toLowerCase()} offers.</p>

                  <div className="mb-4">
                    <label className="block font-medium text-sm mb-1">Quantity</label>
                    <div className="flex items-center border rounded w-full">
                      <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3 py-1 text-lg">−</button>
                      <span className="flex-1 text-center py-1">{quantity}</span>
                      <button onClick={() => setQuantity(prev => prev + 1)} className="px-3 py-1 text-lg">+</button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">Total: <strong>🪙{selectedCoupon.price * quantity}</strong></p>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-brandBlue text-white py-2 rounded mb-2 hover:bg-[#2DA7ED]"
                  >
                    Add {quantity} to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full border border-brandBlue text-brandBlue py-2 rounded hover:bg-blue-50"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Customer Reviews</h3>
                {reviews.slice(0, visibleReviews).map((review, index) => (
                  <div key={index} className="border rounded p-3 mb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{review.name}</span>
                      <span className="text-yellow-500 flex">{[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                  </div>
                ))}
                {visibleReviews < reviews.length && (
                  <button onClick={() => setVisibleReviews(visibleReviews + 2)} className="text-sm text-brandBlue hover:underline mt-2">
                    Load More Reviews
                  </button>
                )}

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Add Your Review</h4>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    placeholder="Your Comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                  ></textarea>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="border p-2 rounded mb-2"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleReviewSubmit}
                    className="bg-brandBlue text-white px-4 py-2 rounded hover:bg-[#2DA7ED]"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CouponsPage;
