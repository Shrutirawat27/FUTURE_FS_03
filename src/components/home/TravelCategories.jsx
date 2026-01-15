import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { 
  IoCarOutline, 
  IoBusOutline, 
  IoTrainOutline, 
  IoAirplaneOutline, 
  IoEarthOutline 
} from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const iconMapping = {
  flights: IoAirplaneOutline,
  hotels: HiOutlineBuildingOffice2,
  trains: IoTrainOutline,
  buses: IoBusOutline,
  cabs: IoCarOutline,
  holidays: IoEarthOutline,
};

const TravelCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Get unique category types to display
        const uniqueCategories = Array.from(new Set(data.map(item => item.type))).map(type => ({
          title: type,
        }));

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    // Changed px-6 -> px-4 and py-16 -> py-12 md:py-16
    <section className="px-4 md:px-12 py-12 md:py-16 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-lightHeading dark:text-heading">
        Explore Travel Categories
      </h2>

      {/* Changed gap-6 -> gap-4 md:gap-6 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map(({ title }) => {
          const Icon = iconMapping[title] || (() => <span>{title.charAt(0)}</span>);

          return (
            <div
              key={title}
              // Changed p-6 -> p-4 md:p-6 for compact mobile look
              className="group flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-6 rounded-2xl
                bg-white/90 dark:bg-gray-800/90
                border border-gray-200 dark:border-gray-700
                backdrop-blur-md
                cursor-pointer
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-neon
                hover:border-lightCta dark:hover:border-cta"
              onClick={() => navigate(`/category/${title.toLowerCase()}`)}
            >
              {/* Responsive Icon Container: w-12 h-12 for mobile */}
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full
                bg-lightCta/10 dark:bg-cta/10
                text-lightCta dark:text-cta"
              >
                {/* Responsive Icon Size */}
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              {/* Responsive Text Size */}
              <p className="font-semibold text-sm md:text-base text-lightHeading dark:text-heading capitalize">
                {title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TravelCategories;