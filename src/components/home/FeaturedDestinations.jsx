import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import DestinationCard from "./DestinationCard";

const FeaturedDestinations = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(
          collection(db, "destinations"),
          where("isFeatured", "==", true),
          limit(4)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeatured(data);
      } catch (error) {
        console.error("Error fetching featured destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    // Changed px-6 to px-4 for better mobile width usage
    <div className="px-4 md:px-12 py-10 max-w-7xl mx-auto relative z-10 mt-[50px] md:mt-[120px]">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 transition-colors">
        Featured Destinations
      </h2>

      {loading ? (
        // Added Skeleton Loader for better UX
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-2xl w-full"></div>
          ))}
        </div>
      ) : featured.length === 0 ? (
        <p className="text-center text-lightMutedText dark:text-mutedText">
          No featured destinations available.
        </p>
      ) : (
        // Changed gap-8 to gap-6 for tighter mobile stacking
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((dest) => (
            <Link key={dest.id} to={`/destinations/${dest.id}`}>
              <DestinationCard
                title={dest.name}
                location={dest.country}
                price={dest.price}
                img={dest.img}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedDestinations;