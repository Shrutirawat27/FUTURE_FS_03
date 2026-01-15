import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const DealsOffers = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const q = query(collection(db, "deals"), where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        const dealsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDeals(dealsData);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  // CONFIGURATION: Fixed mobile view to show only one card
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: windowWidth < 768 ? 1 : 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: windowWidth >= 768,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: false,
        centerMode: false,
        variableWidth: false,
      },
    },
  ],
};

  if (loading) {
    return (
      <section className="px-4 md:px-12 py-10 md:py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-lightHeading dark:text-heading">
          Deals & Offers
        </h2>
        <div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
      </section>
    );
  }

  if (deals.length === 0) {
    return (
      <section className="px-4 md:px-12 py-10 md:py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-lightHeading dark:text-heading">
          Deals & Offers
        </h2>
        <p className="text-center text-lightMutedText dark:text-mutedText">
          No deals available at the moment.
        </p>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-12 py-10 md:py-16 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-lightHeading dark:text-heading">
        Deals & Offers
      </h2>

      {/* Added specific mobile padding and centering */}
      <div className="select-none">
        <Slider key={windowWidth} {...settings}>
          {deals.map((deal) => (
            <div key={deal.id} className="px-2 md:px-3 pb-2">
              {/* Mobile-specific adjustments */}
              <div className="w-full md:w-auto">
                <div
                  className="group relative rounded-2xl overflow-hidden cursor-pointer
                    bg-white/90 dark:bg-gray-800/90
                    border border-gray-200 dark:border-gray-700
                    backdrop-blur-md
                    shadow-md
                    hover:shadow-neon
                    transition-all duration-300
                    h-full
                    mx-auto" // Center on mobile
                  style={{
                    maxWidth: "100%", // Ensure it doesn't exceed container
                  }}
                >
                  {/* Fixed Image Height & Ratio */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={deal.img}
                      alt={deal.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Optional Overlay for better text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg md:text-xl font-bold text-lightHeading dark:text-heading mb-2 truncate">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {deal.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default DealsOffers;