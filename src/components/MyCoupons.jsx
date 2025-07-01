import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const purchasedCoupons = [
  {
    id: 1,
    title: "20% off your entire order at Gourmet Bites online.",
    status: "Active",
    discount: "20% OFF",
    validTill: "Dec 31, 2025",
    image: "https://source.unsplash.com/400x300/?burger"
  },
  {
    id: 2,
    title: "Save ₹50 on any electronics purchase over ₹2000.",
    status: "Active",
    discount: "₹50 OFF",
    validTill: "Nov 20, 2025",
    image: "https://source.unsplash.com/400x300/?electronics"
  },
  {
    id: 3,
    title: "Buy one get one free on all BOGO foods.",
    status: "Expired",
    discount: "BOGO FREE",
    validTill: "Oct 10, 2024",
    image: "https://source.unsplash.com/400x300/?snacks"
  },
];

const cartCoupons = [
  {
    id: 101,
    title: "Free shipping on orders over ₹999",
    status: "In Cart",
    discount: "Free Shipping",
    validTill: "Dec 10, 2025",
    image: "https://source.unsplash.com/400x300/?delivery"
  },
  {
    id: 102,
    title: "₹200 off groceries above ₹1500",
    status: "In Cart",
    discount: "₹200 OFF",
    validTill: "Nov 30, 2025",
    image: "https://source.unsplash.com/400x300/?groceries"
  }
];

const CouponDetailsPopup = ({ onClose }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    console.log("Comment submitted:", comment);
    setComment("");
  };

  return (
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
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className="bg-brandBlue text-white px-4 py-1 rounded text-sm mb-3"
        >
          Submit
        </button>
        <div className="text-center text-yellow-400 text-xl">★★★★☆</div>
      </div>
    </div>
  );
};

const MyCoupons = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-brandBlue">My Coupons</h1>

        <h2 className="text-2xl font-semibold mb-4">Your Active Coupons</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
            >
              <img
                src={coupon.image}
                alt="Coupon"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {coupon.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      coupon.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {coupon.status}
                  </span>
                </div>
                <p className="text-brandBlue text-lg font-bold mb-2">
                  {coupon.discount}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Valid till: {coupon.validTill}
                </p>
                <div className="flex justify-between">
                  <button className="bg-brandBlue text-white px-3 py-1 text-sm rounded">
                    Redeem Now
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-sm text-brandBlue underline"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Coupons in Cart</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
            >
              <img
                src={coupon.image}
                alt="Cart Coupon"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {coupon.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">
                    {coupon.status}
                  </span>
                </div>
                <p className="text-brandBlue text-lg font-bold mb-2">
                  {coupon.discount}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Valid till: {coupon.validTill}
                </p>
                <div className="flex justify-between">
                  <button className="bg-brandBlue text-white px-3 py-1 text-sm rounded">
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
            </div>
          ))}
        </div>
      </main>
      <Footer />
      {showDetails && <CouponDetailsPopup onClose={() => setShowDetails(false)} />}
    </div>
  );
};

export default MyCoupons;
