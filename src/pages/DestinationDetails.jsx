import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/* ------------------ Price Formatter ------------------ */
const formatPrice = (price, currency = "INR") => {
  if (typeof price !== "number") return price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const docRef = doc(db, "destinations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDestination(docSnap.data());
        } else {
          setDestination(null);
        }
      } catch (error) {
        console.error("Error fetching destination:", error);
        setDestination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg">Loading destination...</p>
        </div>
      </Layout>
    );
  }

  if (!destination) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-lightHeading dark:text-heading">
          <p>
            Destination not found.{" "}
            <Link
              to="/destinations"
              className="text-lightCta dark:text-cta underline"
            >
              Go back
            </Link>
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors">

        {/* HERO */}
        {/* Mobile: h-[55vh] | Desktop: h-[70vh] */}
        <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
          <img
            src={destination.img}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Mobile: px-4 pb-10 | Desktop: px-12 pb-16 */}
          <div className="relative z-10 h-full flex flex-col justify-end px-4 pb-10 md:px-12 md:pb-16 text-white">
            <span className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest text-lightCta">
              <MapPinIcon className="w-4 h-4" />
              {destination.country}
            </span>

            {/* Mobile: text-3xl | Desktop: text-5xl */}
            <h1 className="text-3xl md:text-5xl font-bold mt-2 md:mt-3 mb-3 md:mb-4 leading-tight">
              {destination.name} Adventure
            </h1>

            <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm text-white/90">
              <span className="font-semibold text-lightCta">
                Starting from {formatPrice(destination.price, destination.currency)}
              </span>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        {/* Mobile: px-4 py-8 gap-10 | Desktop: px-12 py-16 gap-14 */}
        <section className="px-4 py-8 md:px-12 md:py-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14">

          {/* LEFT CONTENT */}
          {/* Mobile: space-y-8 | Desktop: space-y-12 */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12">

            {/* ABOUT */}
            <div>
              {/* Mobile: text-2xl | Desktop: text-3xl */}
              <h2 className="text-2xl md:text-3xl font-bold text-lightHeading dark:text-heading mb-3 md:mb-4">
                About the Destination
              </h2>
              <p className="text-sm md:text-base text-lightMutedText dark:text-mutedText leading-relaxed text-justify md:text-left">
                Explore the wonders of {destination.name}. This package offers a
                perfect blend of adventure, relaxation, and cultural exploration.
              </p>
            </div>

            {/* HIGHLIGHTS */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-lightHeading dark:text-heading mb-4 md:mb-6">
                Package Highlights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {destination.highlights?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 md:p-4 rounded-xl
                      bg-white/80 dark:bg-gray-800/90
                      border border-lightBorder dark:border-white/10"
                  >
                    <CheckCircleIcon className="w-5 h-5 text-lightCta dark:text-cta shrink-0" />
                    <span className="text-sm md:text-base text-lightHeading dark:text-heading">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* GALLERY */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-lightHeading dark:text-heading mb-4 md:mb-6">
                Gallery
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/${id}${i}/400/300`}
                    alt="Gallery"
                    // Mobile: h-32 | Desktop: h-40
                    className="rounded-xl object-cover h-32 md:h-40 w-full
                      hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="sticky top-24 h-fit p-5 md:p-6 rounded-2xl
            bg-white/90 dark:bg-gray-800/90
            border border-lightBorder dark:border-white/10
            shadow-lg"
          >
            <h3 className="text-lg md:text-xl font-bold text-lightHeading dark:text-heading mb-3 md:mb-4">
              Book This Package
            </h3>

            <p className="text-xs md:text-sm text-lightMutedText dark:text-mutedText mb-4 md:mb-6">
              Secure your spot today with flexible payment options.
            </p>

            <div className="flex items-center justify-between mb-4 md:mb-6">
              <span className="text-xs md:text-sm text-lightMutedText dark:text-mutedText">
                Total Price
              </span>
              <span className="text-xl md:text-2xl font-bold text-lightCta dark:text-cta">
                {formatPrice(destination.price, destination.currency)}
              </span>
            </div>

            <button
              onClick={() => navigate(`/booking/${id}`, { state: { destination } })}
              className="w-full py-3 md:py-4 rounded-full bg-lightCta dark:bg-cta
                text-white font-bold text-base md:text-lg
                hover:scale-105 transition-transform"
            >
              Book Now
            </button>
          </div>

        </section>
      </div>
    </Layout>
  );
};

export default DestinationDetails;