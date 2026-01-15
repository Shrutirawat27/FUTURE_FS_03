import React from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/home/HeroSection";
import FeaturedDestinations from "../components/home/FeaturedDestinations";
import TravelCategories from "../components/home/TravelCategories";
import DealsOffers from "../components/home/DealsOffers";
import HolidayPackages from "../components/home/HolidayPackages";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background font-sans text-lightHeading dark:text-heading">
        <HeroSection />
        <FeaturedDestinations />
        <TravelCategories />
        <DealsOffers />
        <HolidayPackages />
        <WhyChooseUs />
        <Testimonials />
      </div>
    </Layout>
  );
};

export default Home;
