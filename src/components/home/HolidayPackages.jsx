import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

// ✅ Price formatter
const formatPrice = (price) =>
  price !== undefined && price !== null
    ? `₹${Number(price).toLocaleString("en-IN")}`
    : "";

const HolidayPackages = () => {
  const [featuredPackage, setFeaturedPackage] = useState(null);
  const [otherPackages, setOtherPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const featuredQuery = query(
          collection(db, "packages"),
          where("isFeatured", "==", true),
          limit(1)
        );
        const featuredSnap = await getDocs(featuredQuery);

        if (!featuredSnap.empty) {
          setFeaturedPackage({
            id: featuredSnap.docs[0].id,
            ...featuredSnap.docs[0].data(),
          });
        }

        const otherQuery = query(
          collection(db, "packages"),
          where("isFeatured", "==", false),
          limit(3)
        );
        const otherSnap = await getDocs(otherQuery);

        setOtherPackages(
          otherSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        console.error("Error fetching holiday packages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleOpenPackage = (pkg) => {
    navigate("/packages", { state: { selectedPackage: pkg } });
  };

  return (
    // Changed px-6 to px-4 for mobile
    <section className="px-4 md:px-12 py-10 md:py-20 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-lightHeading dark:text-heading">
        Handpicked Holiday Packages
      </h2>

      {loading ? (
        <p className="text-center text-lightMutedText dark:text-mutedText">
          Loading holiday packages...
        </p>
      ) : (
        // Changed gap-8 to gap-6 for mobile
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* FEATURED PACKAGE */}
          {featuredPackage && (
            <div className="lg:col-span-2 relative rounded-3xl md:rounded-[2.5rem] overflow-hidden group">
              <img
                src={featuredPackage.img}
                alt={featuredPackage.title}
                // FIXED: h-72 for mobile, h-[420px] for desktop
                className="w-full h-72 md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

              {/* FIXED: Reduced padding p-6 for mobile */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                <span className="text-xs md:text-sm uppercase tracking-widest mb-2 text-lightCta">
                  Featured
                </span>

                {/* FIXED: Reduced text size for mobile */}
                <h3 className="text-2xl md:text-4xl font-bold mb-3">
                  {featuredPackage.title}
                </h3>

                {featuredPackage.duration && (
                  <p className="text-white/90 mb-4 text-sm md:text-base">
                    {featuredPackage.duration}
                  </p>
                )}

                <div className="flex items-center gap-6">
                  <span className="text-xl md:text-2xl font-semibold">
                    {formatPrice(featuredPackage.price)}
                  </span>

                  <button
                    onClick={() => handleOpenPackage(featuredPackage)}
                    className="px-5 py-2 md:px-6 md:py-3 rounded-full bg-lightCta dark:bg-cta text-white font-semibold hover:scale-105 transition-transform text-sm md:text-base"
                  >
                    Explore Package
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OTHER PACKAGES */}
          <div className="flex flex-col gap-4 md:gap-6">
            {otherPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="group relative flex items-center gap-4 p-3 md:p-4 rounded-2xl
                  bg-white/80 dark:bg-gray-800/90
                  border border-black/10 dark:border-white/10
                  transition-all duration-300
                  hover:shadow-neon"
              >
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lightHeading dark:text-heading truncate text-sm md:text-base">
                    {pkg.title}
                  </h4>
                  <p className="text-xs md:text-sm text-lightMutedText dark:text-mutedText mt-1">
                    Starting from {formatPrice(pkg.price)}
                  </p>
                </div>

                <span
                  onClick={() => handleOpenPackage(pkg)}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full
                    bg-lightCta/10 dark:bg-gray-700
                    text-lightCta dark:text-cta
                    font-bold text-xl md:text-2xl cursor-pointer
                    transition-transform duration-300
                    hover:scale-125"
                >
                  →
                </span>
              </div>
            ))}
          </div>

        </div>
      )}
    </section>
  );
};

export default HolidayPackages;