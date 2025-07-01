import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const purchasedCoupons = [
  {
    id: 1,
    title: "20% off your online order at Gourmet Bites",
    status: "Active",
    discount: "20% OFF",
    validTill: "Dec 31, 2025",
  },
  {
    id: 2,
    title: "Save $50 on any electronics purchase over $200",
    status: "Active",
    discount: "$50 OFF",
    validTill: "Dec 20, 2025",
  },
  {
    id: 3,
    title: "Buy one get one free on all coffee",
    status: "Expired",
    discount: "BOGO FREE",
    validTill: "Jul 1, 2024",
  },
  {
    id: 4,
    title: "30% off any massage or facial treatment",
    status: "Active",
    discount: "30% OFF",
    validTill: "Dec 1, 2025",
  },
  {
    id: 5,
    title: "Get a free e-book with any physical book purchase",
    status: "Redeemed",
    discount: "Free E-Book",
    validTill: "Sep 10, 2025",
  },
  {
    id: 6,
    title: "Enjoy a complimentary pastry with a large coffee",
    status: "Active",
    discount: "Free Pastry",
    validTill: "Aug 31, 2025",
  },
  {
    id: 7,
    title: "15% off your next adventure tour booking",
    status: "Active",
    discount: "15% OFF",
    validTill: "Nov 10, 2025",
  },
];

const cartCoupons = [
  {
    id: 101,
    title: "₹200 off groceries above ₹1500",
    discount: "₹200 OFF",
    validTill: "Nov 30, 2025",
    status: "In Cart",
  },
  {
    id: 102,
    title: "Free shipping on orders over ₹999",
    discount: "Free Shipping",
    validTill: "Dec 10, 2025",
    status: "In Cart",
  },
];

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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 text-center">
          <div>
            <p className="text-xl font-bold text-brandBlue">25</p>
            <p className="text-sm text-gray-600">Total Coupons</p>
          </div>
          <div>
            <p className="text-xl font-bold text-brandBlue">18</p>
            <p className="text-sm text-gray-600">Active Coupons</p>
          </div>
          <div>
            <p className="text-xl font-bold text-brandBlue">7</p>
            <p className="text-sm text-gray-600">Redeemed This Month</p>
          </div>
          <div>
            <p className="text-xl font-bold text-brandBlue">3</p>
            <p className="text-sm text-gray-600">Expiring Soon</p>
          </div>
        </div>

        {/* Coupon Cards */}
        <h2 className="text-2xl font-bold mb-4">Your Active Coupons</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {coupon.title}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    coupon.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : coupon.status === "Expired"
                      ? "bg-red-100 text-red-500"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {coupon.status}
                </span>
              </div>
              <p className="text-lg font-bold text-brandBlue mb-2">
                {coupon.discount}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Valid till: {coupon.validTill}
              </p>
              <div className="flex justify-between">
                <button className="text-white bg-brandBlue px-4 py-1 rounded text-sm">
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
          ))}
        </div>

        {/* Cart Coupons */}
        <h2 className="text-2xl font-bold mt-12 mb-4">Coupons in Cart</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {coupon.title}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">
                  {coupon.status}
                </span>
              </div>
              <p className="text-lg font-bold text-brandBlue mb-2">
                {coupon.discount}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Valid till: {coupon.validTill}
              </p>
              <div className="flex justify-between">
                <button className="text-white bg-brandBlue px-4 py-1 rounded text-sm">
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

        {/* FAQ */}
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4">How Coupons Work</h3>
          <div className="bg-white p-4 rounded shadow">
            <details className="mb-2">
              <summary className="cursor-pointer font-medium">
                How do I redeem my purchased coupons?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                You can redeem them on partner sites or in store by showing the code.
              </p>
            </details>
            <details className="mb-2">
              <summary className="cursor-pointer font-medium">
                What happens if a coupon expires?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Expired coupons will no longer be valid for use.
              </p>
            </details>
            <details className="mb-2">
              <summary className="cursor-pointer font-medium">
                Can I share my coupons with others?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Most coupons are for personal use only and cannot be shared.
              </p>
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
