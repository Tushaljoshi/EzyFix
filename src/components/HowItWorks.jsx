import React from "react";
import { Sparkles, Ticket, PiggyBank } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    { icon: <Sparkles className="w-8 h-8 text-brandBlue" />, title: "Discover Deals", desc: "Browse thousands of local and online deals from featured stores and services." },
    { icon: <Ticket className="w-8 h-8 text-brandBlue" />, title: "Redeem Instantly", desc: "Click and redeem deals on the spot. No waiting, no fuss. Instant savings." },
    { icon: <PiggyBank className="w-8 h-8 text-brandBlue" />, title: "Save Big", desc: "Cut your expenses on food, shopping, and services. More value, more savings." },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">How EzyFix Works</h2>
      <p className="text-gray-600 mb-10">Geting the best deals and coupons for your favorite stores and services</p>
      <div className="grid md:grid-cols-3 gap-8 px-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
