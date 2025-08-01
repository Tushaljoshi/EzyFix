import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const deals = [
  {
    title: "50% Off Gourmet Burger Meal",
    price: "14 coins",
    tag: "Restaurants",
    badge: "Best Deal",
    image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
  },
  {
    title: "Weekend Getaway 20% Discount",
    price: "210 coins",
    tag: "Hotels & Travel",
    badge: "Limited",
    image: "https://cdn.pixabay.com/photo/2016/11/29/05/08/beach-1867883_1280.jpg",
  },
  {
    title: "Soothing Full Body Massage",
    price: "57 coins",
    tag: "Health & Wellness",
    badge: "Top",
    image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/spa-1837420_1280.jpg",
  },
  {
    title: "Adventure Park City Pass",
    price: "60 coins",
    tag: "Activities & Events",
    badge: "New",
    image: "https://cdn.pixabay.com/photo/2016/02/13/12/26/paragliding-1196792_1280.jpg",
  },
  {
    title: "20% Off All Fashion Apparel",
    price: "80 coins",
    tag: "Online Shopping",
    badge: "Style",
    image: "https://cdn.pixabay.com/photo/2016/11/29/02/49/adult-1868750_1280.jpg",
  },
  {
    title: "Buy One Get One Free Coffee",
    price: "5 coins",
    tag: "Restaurants",
    badge: "Deal",
    image: "https://cdn.pixabay.com/photo/2014/09/20/13/52/coffee-452646_1280.jpg",
  },
  {
    title: "Monthly Gym Membership",
    price: "51 coins",
    tag: "Fitness & Sports",
    badge: "Hot",
    image: "https://cdn.pixabay.com/photo/2016/03/27/21/36/sport-1284656_1280.jpg",
  },
  {
    title: "Dental Cleaning & Check-up",
    price: "78 coins",
    tag: "Health & Wellness",
    badge: "Care",
    image: "https://cdn.pixabay.com/photo/2016/03/31/19/57/toothbrush-1292198_1280.png",
  },
];

const FeaturedDeals = () => {
  const navigate = useNavigate();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const handleClick = (tag) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate(`/coupons?search=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <>
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Deals Just For You</h2>
        <p className="text-center text-gray-600 mb-10">
          Explore our hand-picked selection of the top coupons across categories. Don’t miss out!
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <div
              key={index}
              onClick={() => handleClick(deal.tag)}
              className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition bg-white block"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-40 object-cover rounded mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
              <div className="text-sm text-brandBlue font-semibold mb-1">{deal.badge}</div>
              <h3 className="font-bold text-lg mb-1 text-gray-800">{deal.title}</h3>
              <p className="text-brandBlue font-semibold mb-2">{deal.price}</p>
              <div className="text-xs text-gray-500">{deal.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Auth Required Popup */}
      {showAuthPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
            >
              <X />
            </button>
            <h2 className="text-lg font-bold text-center mb-3">Sign In Required</h2>
            <p className="text-sm text-center text-gray-600 mb-4">
              Please sign in to explore our featured deals.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowAuthPopup(false);
                  navigate("/signin");
                }}
                className="bg-brandBlue text-white px-6 py-2 rounded hover:bg-[#2DA7ED]"
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedDeals;
