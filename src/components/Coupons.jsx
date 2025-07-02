import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  "Restaurants",
  "Hotels & Travel",
  "Online Shopping",
  "Health & Wellness",
  "Activities & Events",
  "Spas & Experiences",
  "Beauty & Salon",
  "Education",
  "Fitness & Sports",
  "Entertainment",
];

const sampleImages = [
  "https://source.unsplash.com/400x300/?food",
  "https://source.unsplash.com/400x300/?shopping",
  "https://source.unsplash.com/400x300/?travel",
  "https://source.unsplash.com/400x300/?fitness",
];

const initialReviews = [
  { name: "Aman", rating: 5, comment: "Great value for money!" },
  { name: "Riya", rating: 4, comment: "Tasty food and quick service." },
  { name: "Dev", rating: 5, comment: "Highly recommend this deal." },
  { name: "Sneha", rating: 3, comment: "Good but could be better." },
  { name: "Karan", rating: 4, comment: "Nice packaging and delivery." },
];

const Coupons = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [reviews, setReviews] = useState(initialReviews);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);
  const handleLoadMoreReviews = () => setVisibleReviews((prev) => Math.min(prev + 2, reviews.length));

  const handleReviewSubmit = () => {
    if (newReview.name && newReview.comment) {
      setReviews((prev) => [newReview, ...prev]);
      setVisibleReviews((prev) => prev + 1);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  const addToCart = (coupon) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please sign in to add coupons to your cart.");
      return;
    }

    if (!coupon.available) {
      alert("Sorry, this coupon is no longer available.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cartCoupons")) || [];
    const newCoupon = {
      id: Date.now(),
      title: coupon.title,
      discount: "₹250 OFF",
      validTill: coupon.validity,
      status: "In Cart",
    };
    const updatedCart = [...cart, newCoupon];
    localStorage.setItem("cartCoupons", JSON.stringify(updatedCart));
    alert("Coupon added to cart!");
    setSelectedCoupon(null);
  };

  const handleBuyNow = (coupon) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please sign in to purchase a coupon.");
      return;
    }

    if (!coupon.available) {
      alert("This coupon is no longer available.");
      return;
    }

    const pin = prompt("Enter your wallet PIN to confirm purchase:");
    if (pin !== user.pin) {
      alert("Incorrect PIN. Transaction cancelled.");
      return;
    }

    const price = coupon.quantity * 250;
    const currentBalance = parseFloat(user.wallet.replace("₹", ""));
    if (currentBalance < price) {
      alert("Insufficient wallet balance.");
      return;
    }

    const newBalance = currentBalance - price;
    user.wallet = `₹${newBalance.toFixed(2)}`;
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert(`Coupon purchased successfully! ₹${price} deducted from your wallet.`);
    setSelectedCoupon(null);
  };

  const openCouponModal = (category, index) => {
    setSelectedCoupon({
      title: `${category} Deal #${index + 1}`,
      image: sampleImages[index % sampleImages.length],
      price: "₹250.00",
      description: `Save up to 50% off on top ${category.toLowerCase()} offers.`,
      validity: "31st Dec 2025",
      quantity: 1,
      available: true,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-center mb-10 text-brandBlue">
            Browse Coupons by Category
          </h1>

          {categories.map((category, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{category}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(visibleCount).keys()].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                    onClick={() => openCouponModal(category, i)}
                  >
                    <img
                      src={sampleImages[i % sampleImages.length]}
                      alt="Coupon"
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-700">
                        {category} Deal #{i + 1}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Save up to 50% off on top {category.toLowerCase()} offers.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Expiry: 31st Dec 2025
                      </p>
                      <button className="mt-4 w-full bg-brandBlue text-white py-1.5 rounded hover:bg-[#2DA7ED] text-sm">
                        Grab Coupon
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="text-brandBlue font-semibold hover:underline"
                >
                  Load More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center overflow-y-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-auto relative p-6 max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCoupon(null)}
              className="absolute top-2 right-3 text-xl text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedCoupon.image}
                  alt="Coupon"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="text-sm text-gray-500">
                  Expiry Date: <strong>{selectedCoupon.validity}</strong>
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{selectedCoupon.title}</h2>
                <p className="text-brandBlue text-xl font-bold mb-2">{selectedCoupon.price}</p>
                <p className="text-gray-700 mb-4 text-sm">{selectedCoupon.description}</p>
                <div className="mb-4">
                  <label className="block font-medium text-sm mb-1">Quantity</label>
                  <select
                    className="border p-2 rounded w-full"
                    value={selectedCoupon.quantity || 1}
                    onChange={(e) =>
                      setSelectedCoupon({
                        ...selectedCoupon,
                        quantity: parseInt(e.target.value),
                      })
                    }
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Coupon{i + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Total: <strong>₹{(selectedCoupon.quantity * 250).toLocaleString("en-IN")}.00</strong>
                </p>
                <button
                  onClick={() => addToCart(selectedCoupon)}
                  className="w-full bg-brandBlue text-white py-2 rounded mb-2 hover:bg-[#2DA7ED]"
                >
                  Add {selectedCoupon.quantity || 1} to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(selectedCoupon)}
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
                    <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                </div>
              ))}
              {visibleReviews < reviews.length && (
                <button
                  onClick={handleLoadMoreReviews}
                  className="text-sm text-brandBlue hover:underline mt-2"
                >
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
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
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
      <Footer />
    </div>
  );
};

export default Coupons;
