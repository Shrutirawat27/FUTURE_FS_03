import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Layout from "../components/Layout";
import { MapPinIcon, CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

// Price Formatter
const formatPrice = (price, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

const MyBookings = () => {
  const { user, loading } = useUser();
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      setFetching(true);
      try {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(results);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to fetch bookings. Please create the index in Firestore.");
      } finally {
        setFetching(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <p className="text-center py-20 text-lightMutedText dark:text-mutedText">
          Checking login...
        </p>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-lightBackground dark:bg-background text-lightHeading dark:text-heading text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="mb-6 text-lightMutedText dark:text-mutedText">
            Please login to view your bookings.
          </p>
          <Link
            to="/login"
            className="px-6 py-3 rounded-full bg-lightCta dark:bg-cta text-white font-semibold hover:scale-105 transition"
          >
            Login
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background text-lightHeading dark:text-heading px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

          {fetching && (
            <p className="text-center py-10 text-lightMutedText dark:text-mutedText">
              Loading bookings...
            </p>
          )}

          {!fetching && bookings.length === 0 && (
            <p className="text-center text-lightMutedText dark:text-mutedText">
              You have no bookings yet.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-gray-800/90 rounded-2xl p-6 shadow-md flex flex-col gap-4"
              >
                <h2 className="text-xl font-bold">{b.destinationName || "Trip"}</h2>

                <div className="flex flex-wrap gap-4 text-sm text-lightMutedText dark:text-mutedText">
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {b.destinationName}
                  </span>

                  {b.date ? (
                    <span className="flex items-center gap-1">
                      <CalendarDaysIcon className="w-4 h-4" />
                      {b.date.seconds
                        ? new Date(b.date.seconds * 1000).toLocaleDateString()
                        : b.date.toLocaleDateString()}
                    </span>
                  ) : null}

                  <span className="flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    {b.adults} Adults · {b.children} Children · {b.rooms} Rooms
                  </span>
                </div>

                <p className="text-sm text-lightMutedText dark:text-mutedText">
                  Total Paid: <strong>{formatPrice(b.totalPrice)}</strong>
                </p>

                <p className="text-sm text-lightMutedText dark:text-mutedText">
                  Booking ID: <strong>{b.id}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyBookings;
