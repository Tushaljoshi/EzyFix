import React from "react";
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
  return (
    <section className="py-16 bg-gray-50 px-6 text-center">
      <h2 className="text-3xl font-bold mb-10">Explore Deals by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="border border-gray-200 bg-white py-6 px-2 rounded-lg shadow-sm hover:shadow-md transition text-sm font-medium text-gray-700 flex flex-col items-center"
          >
            {cat.icon}
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
