// src/pages/Payment.jsx

import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { MapPinIcon, CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/UserContext";

// Price Formatter
const formatPrice = (price, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-lightHeading dark:text-heading">Checking login...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-lightHeading dark:text-heading">
          <p className="text-red-500">You are not logged in. Please login to continue booking.</p>
        </div>
      </Layout>
    );
  }

  if (!state || !state.data) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-lightHeading dark:text-heading">
          <p>No booking found.</p>
        </div>
      </Layout>
    );
  }

  const { data, adults, children = 0, rooms = 0, date, totalPrice } = state;
  const name = data.title || data.name || "Booking";
  const img = data.img || "";
  const country = data.country || "";
  const category = data.category || data.type || data.bookingType || "hotel";
  const requiresRooms = ["hotel", "package"].includes(category);

  const handlePayment = () => {
    if (!userName || !userEmail || !userPhone) {
      alert("Please fill in your details before proceeding to payment.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: totalPrice * 100,
      currency: "INR",
      name,
      description: "Travel Booking Payment",
      image: img,
      handler: async (response) => {
        try {
          const bookingRef = await addDoc(collection(db, "bookings"), {
            userId: user.uid,
            userName,
            userEmail,
            userPhone,
            bookingType: category,
            destinationId: data?.id || null,
            destinationName: name,
            date,
            adults,
            children,
            rooms: requiresRooms ? rooms : null,
            totalPrice,
            paymentId: response.razorpay_payment_id,
            paymentMethod,
            status: "confirmed",
            createdAt: serverTimestamp(),
          });

          navigate("/success", {
            state: { bookingId: bookingRef.id, data, adults, children, rooms: requiresRooms ? rooms : null, date, totalPrice },
          });
        } catch (error) {
          console.error("Booking save failed:", error);
          alert("Payment succeeded but booking failed. Please contact support.");
        }
      },
      prefill: { name: userName, email: userEmail, contact: userPhone },
      theme: { color: "#1d4ed8" },
      method:
        paymentMethod === "upi"
          ? { upi: true }
          : paymentMethod === "card"
          ? { card: true }
          : paymentMethod === "netbanking"
          ? { netbanking: true }
          : {},
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors">
        {/* Mobile: Reduced padding (py-8 px-4) | Desktop: Original (py-16 px-6) */}
        <div className="max-w-5xl mx-auto py-8 px-4 md:py-16 md:px-6 flex flex-col gap-6 md:gap-10">

          {/* Booking Summary */}
          <div className="bg-white/90 dark:bg-gray-800/90 border border-lightBorder dark:border-white/10 rounded-2xl p-5 md:p-6 shadow-lg flex flex-col md:flex-row gap-6">
            {img && (
              <img 
                src={img} 
                alt={name} 
                // Mobile: h-48 for better aspect ratio | Desktop: h-32 fixed width
                className="w-full h-48 md:w-40 md:h-32 object-cover rounded-xl" 
              />
            )}
            <div className="flex-1">
              {/* Mobile: Smaller font | Desktop: Original */}
              <h2 className="text-xl md:text-2xl font-bold text-lightHeading dark:text-heading">{name}</h2>
              <div className="flex flex-wrap gap-3 md:gap-4 text-sm mt-2 text-lightMutedText dark:text-mutedText">
                {country && (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4 text-lightCta dark:text-cta" /> {country}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <CalendarDaysIcon className="w-4 h-4 text-lightCta dark:text-cta" /> {new Date(date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4 text-lightCta dark:text-cta" /> 
                  {adults} Adults{children > 0 && ` · ${children} Children`}
                  {requiresRooms && rooms > 0 && ` · ${rooms} Rooms`}
                </span>
              </div>
            </div>

            {/* Price Section - Mobile: Flex Row with Border Top | Desktop: Right Aligned No Border */}
            <div className="flex flex-row justify-between items-center pt-4 border-t border-gray-200 dark:border-white/10 mt-2 md:mt-0 md:border-0 md:pt-0 md:block md:text-right">
              <p className="text-sm text-lightMutedText dark:text-mutedText">Amount Payable</p>
              <p className="text-xl md:text-2xl font-bold text-lightCta dark:text-cta">{formatPrice(totalPrice)}</p>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white/90 dark:bg-gray-800/90 border border-lightBorder dark:border-white/10 rounded-2xl p-5 md:p-6 shadow-lg flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-lightHeading dark:text-heading">Your Details</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 rounded-xl border border-lightBorder/40 dark:border-white/20 bg-lightBackground dark:bg-background text-lightHeading dark:text-heading focus:outline-none focus:ring-2 focus:ring-lightCta dark:focus:ring-cta"
              />
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-lightBorder/40 dark:border-white/20 bg-lightBackground dark:bg-background text-lightHeading dark:text-heading focus:outline-none focus:ring-2 focus:ring-lightCta dark:focus:ring-cta"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full p-3 rounded-xl border border-lightBorder/40 dark:border-white/20 bg-lightBackground dark:bg-background text-lightHeading dark:text-heading focus:outline-none focus:ring-2 focus:ring-lightCta dark:focus:ring-cta"
              />
            </div>
          </div>

          {/* Payment Method - CUSTOM RADIO STYLING ADDED HERE */}
          <div className="bg-white/90 dark:bg-gray-800/90 border border-lightBorder dark:border-white/10 rounded-2xl p-5 md:p-6 shadow-lg flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-lightHeading dark:text-heading">Select Payment Method</h3>
            <div className="flex flex-col gap-2">
              {["upi", "card", "netbanking"].map((method) => (
                <label key={method} className="flex items-center gap-3 cursor-pointer text-lightHeading dark:text-heading p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <input
                    type="radio"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    // FIX: Replaced default styling with custom CSS logic for clean borders
                    className="w-5 h-5 appearance-none rounded-full border-2 border-gray-300 checked:border-[6px] checked:border-lightCta dark:checked:border-cta bg-white dark:bg-transparent transition-all cursor-pointer focus:outline-none focus:ring-0"
                  />
                  {method.toUpperCase()}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full py-4 bg-lightCta dark:bg-cta text-white font-bold rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Pay {formatPrice(totalPrice)}
          </button>

        </div>
      </div>
    </Layout>
  );
};

export default Payment;