//import React from "react";
//import BannerBackground from "../components/Assets/home-banner-background.png";
//import BannerImage from "../components/Assets/home-banner-image.png";
import LandingNav from "../LandingNav";
import { FiArrowRight } from "react-icons/fi";
import MainSection from "../MainSection";
import Work from "../Work";
import Testimonial from "../Testimonial";
import Footer from "../Footer";
import About from "../About";
import Contact from "../Contact";
import Pricing from "../Pricing";
import Features from "../Features";
import Stats from "../Stats";
import CallToAction from "../CallToAction";

const Student = () => {
  return (
    <div>
     <LandingNav/>
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

export default Student;