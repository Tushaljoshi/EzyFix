// src/pages/Coupons.jsx
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

  const openCouponModal = (category, index) => {
    setSelectedCoupon({
      title: `${category} Deal #${index + 1}`,
      image: sampleImages[index % sampleImages.length],
      price: "₹250.00",
      description: `Save up to 50% off on top ${category.toLowerCase()} offers.`,
      validity: "31st Dec 2025",
      quantity: 1,
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
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-start overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full mx-6 my-10 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCoupon(null)}
              className="absolute top-2 right-3 text-xl text-gray-400 hover:text-gray-600"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div>
                <img
                  src={selectedCoupon.image}
                  alt="Coupon"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      src={`https://source.unsplash.com/100x100/?deal,${i}`}
                      alt={`thumb-${i}`}
                      className="w-full rounded border"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{selectedCoupon.title}</h2>
                <p className="text-brandBlue text-xl font-bold mb-2">{selectedCoupon.price}</p>
                <p className="text-gray-600 mb-2">
                  Valid until: <strong>{selectedCoupon.validity}</strong>
                </p>
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

                <button className="w-full bg-brandBlue text-white py-2 rounded mb-2 hover:bg-[#2DA7ED]">
                  Add {selectedCoupon.quantity || 1} to Cart
                </button>
                <button className="w-full border border-brandBlue text-brandBlue py-2 rounded hover:bg-blue-50">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="px-6 pb-6">
              <h3 className="text-xl font-bold mb-4">Size / Details</h3>
              <p className="bg-gray-100 rounded p-3 text-sm">
                One size combo meal including burger, fries, drink. No customization allowed.
              </p>

              <h4 className="mt-6 font-semibold">How to Use</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>Show coupon at the counter or online checkout</li>
                <li>Valid once per user</li>
                <li>Coupon code will be sent via email/SMS</li>
              </ul>

              <h4 className="mt-6 font-semibold">Terms & Conditions</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>No refunds on redeemed coupons</li>
                <li>Not combinable with other deals</li>
                <li>Only valid for participating stores</li>
              </ul>

              <div className="mt-10">
                <h4 className="font-semibold mb-2">Add Your Review</h4>
                <div className="bg-white rounded shadow p-4 mb-6">
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
                        {r} Star{r > 1 && "s"}
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

                <h4 className="font-semibold mb-2">Customer Reviews</h4>
                {reviews.slice(0, visibleReviews).map((review, i) => (
                  <div key={i} className="bg-white rounded shadow p-4 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{review.name}</span>
                      <span className="text-yellow-400">{"★".repeat(review.rating)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                  </div>
                ))}
                {visibleReviews < reviews.length && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleLoadMoreReviews}
                      className="text-brandBlue font-medium hover:underline"
                    >
                      Load More Reviews
                    </button>
                  </div>
                )}
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
