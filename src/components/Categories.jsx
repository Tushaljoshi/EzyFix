import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Utensils,
  Hotel,
  ShoppingBag,
  HeartPulse,
  CalendarCheck,
  Sparkles,
  Scissors,
  BookOpen,
  Dumbbell,
  Clapperboard,
  X,
} from "lucide-react";

const categories = [
  { name: "Restaurants", icon: <Utensils className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Hotels & Travel", icon: <Hotel className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Online Shopping", icon: <ShoppingBag className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Health & Wellness", icon: <HeartPulse className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Activities & Events", icon: <CalendarCheck className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Spas & Experiences", icon: <Sparkles className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Beauty & Salon", icon: <Scissors className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Education", icon: <BookOpen className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Fitness & Sports", icon: <Dumbbell className="w-6 h-6 text-brandBlue mb-2" /> },
  { name: "Entertainment", icon: <Clapperboard className="w-6 h-6 text-brandBlue mb-2" /> },
];

const Categories = () => {
  const navigate = useNavigate();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const handleCategoryClick = (categoryName) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      setShowAuthPopup(true);
    } else {
      navigate(`/coupons?category=${encodeURIComponent(categoryName)}`);
    }
  };

  return (
    <>
      <section className="py-16 bg-gray-50 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Explore Deals by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat.name)}
              className="cursor-pointer border border-gray-200 bg-white py-6 px-2 rounded-lg shadow-sm hover:shadow-md transition text-sm font-medium text-gray-700 flex flex-col items-center"
            >
              {cat.icon}
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sign In / Sign Up Popup */}
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
              Please sign in to explore deals by category.
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

export default Categories;
