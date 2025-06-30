import React from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    text: "EzyFix has completely transformed how I shop! The deals are always fresh and relevant. It’s honestly the smartest way to save.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Lee",
    text: "As a busy professional, I appreciate the convenience of having my favorite discounts in one place. I’ve saved hundreds already!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Rodriguez",
    text: "Being a student, every rupee counts! EzyFix makes it easy to enjoy weekend fun and essentials without overspending.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Kim",
    text: "I use EzyFix for every family outing and dinner. It’s saved me more than any other app out there.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white px-6">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
      <p className="text-center mb-10">Join thousands of happy savers! Read genuine reviews from people who love using EzyFix to unlock amazing discounts.</p>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, index) => (
          <div key={index} className="p-6 border rounded shadow-sm bg-gray-50">
            <p className="italic text-gray-700 mb-4">“{t.text}”</p>
            <div className="flex items-center gap-3 mt-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="text-sm font-semibold text-brandBlue">{t.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
