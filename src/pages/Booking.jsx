import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { MapPinIcon, CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Price Formatter
const formatPrice = (price, currency = "INR") =>
  typeof price === "number"
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(price)
    : price;

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null); // package or destination
  const [loading, setLoading] = useState(true);

  // Booking state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [date, setDate] = useState(null);
  const [predictedPrice, setPredictedPrice] = useState(null);

  // Fetch data or use state
  useEffect(() => {
    if (location.state?.selectedPackage) {
      setData(location.state.selectedPackage);
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "destinations", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) setData(docSnap.data());
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id, location.state]);

  // Calculate price
  useEffect(() => {
    if (!data) return;
    const basePrice = data.price || 2000;
    const price = (adults * basePrice + children * basePrice * 0.5) * rooms;
    setPredictedPrice(price);
  }, [adults, children, rooms, data]);

  if (loading) return <Layout><p className="text-center py-20">Loading...</p></Layout>;
  if (!data) return <Layout><p className="text-center py-20">Data not found.</p></Layout>;

  const name = data.title || data.name;
  const img = data.img;
  const category = data.category || data.type || "General";
  const country = data.country || "";
  const duration = data.duration || "";

  // Proceed to Payment handler
  const handleProceedPayment = () => {
    if (!date) {
      alert("Please select a date for your trip!");
      return;
    }
    navigate("/payment", {
      state: {
        data,
        destinationId: id,
        adults,
        children,
        rooms,
        date,
        totalPrice: predictedPrice,
      },
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background text-lightHeading dark:text-heading transition-colors">
        {/* Mobile: py-8 px-4 | Desktop: py-16 px-6 */}
        <div className="max-w-5xl mx-auto py-8 px-4 md:py-16 md:px-6">

          {/* ================= Summary Card ================= */}
          <div className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-gray-800/90 border border-white/20 dark:border-white/10 rounded-2xl p-5 md:p-6 shadow-md">
            
            {/* Image - Mobile: h-48 | Desktop: h-40 w-48 */}
            <img
              src={img}
              alt={name}
              className="w-full h-48 md:w-48 md:h-40 object-cover rounded-xl"
            />

            {/* Info Middle Column */}
            <div className="flex-1 flex flex-col justify-between w-full">
              <h2 className="text-xl md:text-2xl font-bold">{name}</h2>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-lightMutedText dark:text-mutedText mt-2">
                {country && (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4 text-lightCta dark:text-cta" /> {country}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <CalendarDaysIcon className="w-4 h-4 text-lightCta dark:text-cta" /> {date ? date.toLocaleDateString() : "Select Date"}
                </span>
                <span className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4 text-lightCta dark:text-cta" /> {adults} Adults · {children} Children · {rooms} Rooms
                </span>
              </div>
            </div>

            {/* Price Right Column */}
            {/* Mobile: Full Width Row at Bottom | Desktop: Right Aligned Block at Top */}
            <div className="w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-200 dark:border-white/10 md:border-0 flex flex-row md:block justify-between items-center md:text-right">
              <p className="text-sm text-lightMutedText dark:text-mutedText">Total Price</p>
              <p className="text-xl font-bold text-lightCta dark:text-cta">{formatPrice(predictedPrice)}</p>
            </div>
          </div>

          {/* ================= Booking Controls ================= */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold ml-1 md:ml-0">Select Date</label>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                placeholderText="Pick a date"
                className="w-full py-3 md:py-3 px-4 rounded-xl border border-white/20 dark:border-white/10 bg-white dark:bg-gray-800/90 text-lightHeading dark:text-heading focus:outline-none"
              />
            </div>

            {/* Adults */}
            <Counter label="Adults" value={adults} onIncrement={() => setAdults(adults + 1)} onDecrement={() => setAdults(Math.max(1, adults - 1))} />

            {/* Children */}
            <Counter label="Children" value={children} onIncrement={() => setChildren(children + 1)} onDecrement={() => setChildren(Math.max(0, children - 1))} />

            {/* Rooms */}
            <Counter label="Rooms" value={rooms} onIncrement={() => setRooms(rooms + 1)} onDecrement={() => setRooms(Math.max(1, rooms - 1))} />

          </div>

          {/* ================= Proceed Button ================= */}
          <button
            onClick={handleProceedPayment}
            className="mt-8 md:mt-10 w-full py-4 bg-lightCta dark:bg-cta text-white font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-lg"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </Layout>
  );
};

/* ---------------- Counter Component (Responsive Layout) ---------------- */
const Counter = ({ label, value, onIncrement, onDecrement }) => (
  // Mobile: Flex Row (Label Left, Buttons Right) | Desktop: Flex Col (Label Top, Buttons Left)
  <div className="flex flex-row justify-between items-center md:flex-col md:justify-start md:items-start gap-2 bg-white/50 dark:bg-white/5 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border border-white/20 md:border-0">
    <label className="text-sm font-semibold">{label}</label>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrement}
        className="w-8 h-8 rounded-full border border-gray-300 dark:border-white/20 hover:bg-lightCta hover:text-white flex items-center justify-center transition-colors bg-white dark:bg-transparent"
      >
        −
      </button>
      <span className="w-6 text-center font-medium">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-8 h-8 rounded-full border border-gray-300 dark:border-white/20 hover:bg-lightCta hover:text-white flex items-center justify-center transition-colors bg-white dark:bg-transparent"
      >
        +
      </button>
    </div>
  </div>
);

export default Booking;