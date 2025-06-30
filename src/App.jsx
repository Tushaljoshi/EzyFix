import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedDeals from "./components/FeaturedDeals";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Categories from "./components/Categories";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedDeals />
      <HowItWorks />
      <Testimonials />
      <Categories />
      <CTA />
      <Footer />
    </>
  );
}

export default App;
