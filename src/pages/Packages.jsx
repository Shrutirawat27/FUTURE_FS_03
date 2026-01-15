import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* ------------------ Price Formatter ------------------ */
const formatPrice = (price, currency = "INR") => {
  if (typeof price !== "number") return price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};

/* -------------------- PAGE -------------------- */
const Packages = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", "Honeymoon", "Family", "Adventure", "Luxury"];
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch packages from Firestore
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "packages"));
        const packages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPackagesData(packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Auto open modal if navigated from Home
  useEffect(() => {
    if (location.state?.selectedPackage) {
      setSelectedPackage(location.state.selectedPackage);
      setIsModalOpen(true);
    }
  }, [location.state]);

  const filteredPackages = packagesData.filter((pkg) => {
    const matchCategory =
      activeCategory === "All" || pkg.category === activeCategory;
    const matchSearch = pkg.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors">

        {/* ================= HERO ================= */}
        {/* Mobile: py-12, px-4 | Desktop: py-24, px-12 */}
        <section className="px-4 md:px-12 py-12 md:py-24 text-center">
          {/* Mobile: text-3xl | Desktop: text-5xl */}
          <h1 className="text-3xl md:text-5xl font-bold text-lightHeading dark:text-heading mb-4">
            Travel Packages
          </h1>
          <p className="text-sm md:text-base text-lightMutedText dark:text-mutedText max-w-2xl mx-auto">
            Choose from curated holiday packages designed for every kind of traveler.
          </p>

          {/* SEARCH */}
          <div className="mt-8 md:mt-10 max-w-xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-lightMutedText dark:text-mutedText" />
              <input
                type="text"
                placeholder="Search packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // Mobile: py-3 | Desktop: py-4
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-full
                  bg-white/80 dark:bg-background/60
                  border border-lightBorder dark:border-white/10
                  text-lightHeading dark:text-heading
                  focus:outline-none focus:border-lightCta dark:focus:border-cta"
              />
            </div>
          </div>
        </section>

        {/* ================= CATEGORY TABS ================= */}
        <section className="px-4 md:px-12 max-w-7xl mx-auto mb-8 md:mb-12">
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 md:px-6 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeCategory === cat
                      ? "bg-lightCta dark:bg-cta text-white"
                      : "bg-white/70 dark:bg-background/60 text-lightHeading dark:text-heading border border-lightBorder dark:border-white/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ================= PACKAGES GRID ================= */}
        <section className="px-4 md:px-12 py-6 md:py-10 max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-lightMutedText dark:text-mutedText">
              Loading packages...
            </p>
          ) : filteredPackages.length === 0 ? (
            <p className="text-center text-lightMutedText dark:text-mutedText">
              No packages found.
            </p>
          ) : (
            // Mobile: gap-6 | Desktop: gap-8
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} openModal={openModal} />
              ))}
            </div>
          )}
        </section>

        {/* ================= MODAL ================= */}
        {isModalOpen && selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={closeModal}
            ></div>
            
            {/* Modal Container - Properly sized with space above/below */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-[90%] md:w-full max-w-md shadow-xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:text-white hover:bg-lightCta dark:hover:bg-lightCta transition z-50 border border-gray-200 dark:border-gray-600"
              >
                <XMarkIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <img
                src={selectedPackage.img}
                alt={selectedPackage.title}
                className="w-full h-44 md:h-52 object-cover rounded-t-2xl"
              />

              <div className="p-4 md:p-5 space-y-3">
                <h2 className="text-lg md:text-xl font-bold text-lightHeading dark:text-heading">
                  {selectedPackage.title}
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-lightCta/10 dark:bg-cta/10 text-lightCta dark:text-cta">
                    {selectedPackage.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {selectedPackage.duration}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                  <p className="text-lg md:text-xl font-bold text-lightCta dark:text-cta">
                    {formatPrice(selectedPackage.price, selectedPackage.currency)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    All inclusive package
                  </p>
                </div>

                {selectedPackage.highlights && selectedPackage.highlights.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lightHeading dark:text-heading mb-2 text-sm">
                      Highlights:
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedPackage.highlights.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-lightCta dark:bg-cta flex-shrink-0"></div>
                          <span className="text-xs text-lightMutedText dark:text-mutedText">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => {
                    closeModal();
                    navigate(`/booking/${selectedPackage.id}`, {
                      state: { selectedPackage },
                    });
                  }}
                  className="w-full mt-2 py-2.5 rounded-full bg-lightCta dark:bg-cta text-white font-bold text-base hover:scale-105 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

/* -------------------- CARD -------------------- */
const PackageCard = ({ id, title, category, duration, price, img, highlights, currency = "INR", openModal }) => {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <div
      className={`group relative rounded-[2rem] overflow-hidden
        bg-white/90 dark:bg-gray-800/90
        border border-lightBorder dark:border-white/10
        transition-all duration-500
        ${!btnHover ? "hover:shadow-neon" : ""}`}
    >
      {/* Mobile: h-48 | Desktop: h-56 */}
      <div className="relative h-48 md:h-56 overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 px-4 py-1 rounded-full
          bg-background/60 dark:bg-lightBackground/100 backdrop-blur-md border border-accent/50 dark:border-lightAccent/50 text-accent dark:text-lightAccent text-xs font-semibold">
          {category}
        </div>
      </div>

      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-lightHeading dark:text-heading mb-2 group-hover:text-lightCta dark:group-hover:text-cta transition-colors">
          {title}
        </h3>

        <p className="text-sm text-lightMutedText dark:text-mutedText mb-4">
          {duration}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-lightCta dark:text-cta">
            {formatPrice(price, currency)}
          </span>
          <button
            onClick={() => openModal({ id, title, category, duration, price, img, highlights, currency })}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="px-4 py-2 rounded-full bg-lightCta/10 dark:bg-cta/10
              text-lightCta dark:text-cta font-semibold
              transition-transform duration-300 transform hover:scale-125 text-sm md:text-base"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Packages;