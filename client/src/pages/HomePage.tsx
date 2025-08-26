import { useState } from "react";
import Header from "../components/homepage/section/Header";
import Hero from "../components/homepage/section/Hero";
import ValueProposition from "../components/homepage/section/ValueProposition";
import FeaturedCollection from "../components/homepage/section/FeaturedCollection";
import Testimonials from "../components/homepage/section/Testimonials";
import Blog from "../components/homepage/section/Blog";
import About from "../components/homepage/section/About";
import Newsletter from "../components/homepage/section/Newsletter";
import Footer from "../components/homepage/section/Footer";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="scroll-smooth">
        <Hero />
        <ValueProposition />
        <FeaturedCollection />
        <Testimonials />
        <Blog />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;