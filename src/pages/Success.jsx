import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <Layout>
        <p className="text-center py-20">No payment information found.</p>
      </Layout>
    );
  }

  const { bookingId, data, adults, children, rooms, date, totalPrice } = state;

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-lightBackground dark:bg-background text-lightHeading dark:text-heading px-6">
        <div className="bg-white dark:bg-gray-800/90 rounded-2xl p-8 shadow-md text-center max-w-md">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-lg mb-2">Thank you for booking with us.</p>
          <p className="text-sm text-lightMutedText dark:text-mutedText mb-4">
            Booking ID: <strong>{bookingId}</strong>
          </p>

          <div className="text-left mb-4">
            <h2 className="font-semibold mb-2">Booking Summary</h2>
            <p>
              Destination: <strong>{data.title || data.name}</strong>
            </p>
            <p>
              Date: <strong>{new Date(date).toLocaleDateString()}</strong>
            </p>
            <p>
              Guests: <strong>{adults} Adults, {children} Children</strong>
            </p>
            <p>
              Rooms: <strong>{rooms}</strong>
            </p>
            <p>
              Total Paid: <strong>₹{totalPrice}</strong>
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-3 bg-lightCta dark:bg-cta text-white font-bold rounded-full hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
