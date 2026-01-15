import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { collection, getDocs } from "firebase/firestore";
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

const Destinations = () => {
  const [search, setSearch] = useState("");
  const [destinationsData, setDestinationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDestinationsData(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinationsData.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors">

        {/* HERO */}
        {/* Mobile: py-12 px-4 | Desktop: py-24 px-12 */}
        <section className="relative px-4 md:px-12 py-12 md:py-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-lightCta/20 to-transparent dark:from-cta/10"></div>

          {/* Mobile: text-3xl | Desktop: text-5xl */}
          <h1 className="text-3xl md:text-5xl font-bold text-lightHeading dark:text-heading mb-4 relative z-10">
            Explore Destinations
          </h1>
          <p className="text-sm md:text-base text-lightMutedText dark:text-mutedText max-w-2xl mx-auto relative z-10">
            Discover hand-picked destinations around the world and plan your next unforgettable journey.
          </p>

          {/* SEARCH */}
          <div className="mt-8 md:mt-10 max-w-xl mx-auto relative z-10">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-lightMutedText dark:text-mutedText" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // Mobile: py-3 | Desktop: py-4
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-full
                  bg-white/80 dark:bg-background/60
                  border border-lightBorder dark:border-white/10
                  text-lightHeading dark:text-heading
                  placeholder-lightMutedText dark:placeholder-mutedText
                  focus:outline-none focus:border-lightCta dark:focus:border-cta
                  transition-all"
              />
            </div>
          </div>
        </section>

        {/* DESTINATION GRID */}
        {/* Mobile: py-8 px-4 | Desktop: py-16 px-12 */}
        <section className="px-4 md:px-12 py-8 md:py-16 max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-lightMutedText dark:text-mutedText">
              Loading destinations...
            </p>
          ) : filteredDestinations.length === 0 ? (
            <p className="text-center text-lightMutedText dark:text-mutedText">
              No destinations found.
            </p>
          ) : (
            // Mobile: gap-6 | Desktop: gap-8
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredDestinations.map((dest) => (
                <DestinationCard key={dest.id} {...dest} id={dest.id} />
              ))}
            </div>
          )}
        </section>

      </div>
    </Layout>
  );
};

/* -------------------- CARD -------------------- */
const DestinationCard = ({ id, name, country, price, currency = "INR", img }) => {
  const [arrowHover, setArrowHover] = useState(false);

  return (
    <div
      className={`group relative rounded-[2rem] overflow-hidden cursor-pointer
        bg-white/90 dark:bg-gray-800/90
        border border-lightBorder dark:border-white/10
        transition-all duration-500
        ${!arrowHover ? "hover:shadow-neon" : ""}`}
    >
      {/* Mobile: h-56 | Desktop: h-64 */}
      <div className="relative h-56 md:h-64 overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Mobile: p-5 | Desktop: p-6 */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-lightHeading dark:text-heading mb-2 md:mb-3 group-hover:text-lightCta dark:group-hover:text-cta transition-colors">
          {name}
        </h3> 

        <div className="flex items-center gap-2 text-sm text-lightMutedText dark:text-white/80 mb-1">
          {country}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lightCta dark:text-cta font-semibold">
            Starting from {formatPrice(price, currency)}
          </span>

          <Link
            to={`/destinations/${id}`}
            onMouseEnter={() => setArrowHover(true)}
            onMouseLeave={() => setArrowHover(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full
                       bg-lightCta/10 dark:bg-gray-700 text-lightCta/100 dark:text-cta
                       font-bold text-2xl
                       transition-transform duration-300 transform
                       hover:scale-125"
          >
            →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Destinations;