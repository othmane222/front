//import React from "react";
//import BannerBackground from "../components/Assets/home-banner-background.png";
//import BannerImage from "../components/Assets/home-banner-image.png";
import LandingNav from "../components/LandingNav";
import { FiArrowRight } from "react-icons/fi";
import MainSection from "../components/MainSection";
import Work from "../components/Work";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import About from "../components/About";
import Contact from "../components/Contact";
import Pricing from "../components/Pricing";
import Features from "../components/Features";
import Stats from "../components/Stats";
import CallToAction from "../components/CallToAction";

const Home = () => {
  return (
    <div>
      <LandingNav />
      <MainSection />
      <Features />
        <Stats />
        <Testimonial />
        <CallToAction />
        <About />
        <Work />
        <Pricing />
        <Contact />
        <Footer />
    </div>
  );
};

export default Home;