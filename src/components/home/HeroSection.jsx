import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TravellerSelector from "../../components/common/TravellerSelector";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("Flights");
  const navigate = useNavigate();

  // ------------------ Form State ------------------
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    city: "",
    destination: "",
    checkIn: null,
    checkOut: null,
    travelDate: null,
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  // ------------------ Price Prediction ------------------
  useEffect(() => {
    const basePrice = 2000;
    const adults = formData.adults || 1;
    const children = formData.children || 0;
    const rooms = formData.rooms || 1;

    const shouldCalculate =
      (activeTab === "Flights" && formData.from && formData.to) ||
      (activeTab === "Hotels" && formData.city) ||
      (activeTab === "Holidays" && formData.destination);

    if (!shouldCalculate) {
      setPredictedPrice(null);
      return;
    }

    let price =
      (adults * basePrice + children * basePrice * 0.5) *
      (activeTab === "Hotels" ? rooms : 1);

    setPredictedPrice(price);
  }, [formData, activeTab]);

  // ------------------ Stable onChange ------------------
  const handleTravellerChange = useCallback(
    (data) => setFormData((prev) => ({ ...prev, ...data })),
    []
  );

  // ------------------ Render Tab Inputs ------------------
  const renderFlights = () => (
    <>
      <GlassInput
        label="From"
        placeholder="Delhi"
        icon={<MapPinIcon className="w-5 h-5" />}
        value={formData.from}
        onChange={(value) => setFormData((prev) => ({ ...prev, from: value }))}
      />
      <GlassInput
        label="To"
        placeholder="Mumbai"
        icon={<MapPinIcon className="w-5 h-5" />}
        value={formData.to}
        onChange={(value) => setFormData((prev) => ({ ...prev, to: value }))}
      />
      <GlassDatePicker
        label="Date"
        placeholder="Select date"
        icon={<CalendarDaysIcon className="w-5 h-5" />}
        value={formData.travelDate}
        onChange={(date) => setFormData((prev) => ({ ...prev, travelDate: date }))}
      />
      <TravellerSelector
        label="Travellers"
        variant="flights"
        onChange={handleTravellerChange}
      />
    </>
  );

  const renderHotels = () => (
    <>
      <GlassInput
        label="City"
        placeholder="Goa"
        icon={<MapPinIcon className="w-5 h-5" />}
        value={formData.city}
        onChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
      />
      <GlassDatePicker
        label="Check-in"
        placeholder="Check-in"
        icon={<CalendarDaysIcon className="w-5 h-5" />}
        value={formData.checkIn}
        onChange={(date) => setFormData((prev) => ({ ...prev, checkIn: date }))}
      />
      <GlassDatePicker
        label="Check-out"
        placeholder="Check-out"
        icon={<CalendarDaysIcon className="w-5 h-5" />}
        value={formData.checkOut}
        onChange={(date) => setFormData((prev) => ({ ...prev, checkOut: date }))}
      />
      <TravellerSelector
        label="Guests & Rooms"
        variant="hotels"
        onChange={handleTravellerChange}
      />
    </>
  );

  const renderHolidays = () => (
    <>
      <GlassInput
        label="From City"
        placeholder="Delhi"
        icon={<MapPinIcon className="w-5 h-5" />}
        value={formData.from}
        onChange={(value) => setFormData((prev) => ({ ...prev, from: value }))}
      />
      <GlassInput
        label="Destination"
        placeholder="Manali"
        icon={<MapPinIcon className="w-5 h-5" />}
        value={formData.destination}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, destination: value }))
        }
      />
      <GlassDatePicker
        label="Travel Date"
        placeholder="Select date"
        icon={<CalendarDaysIcon className="w-5 h-5" />}
        value={formData.travelDate}
        onChange={(date) =>
          setFormData((prev) => ({ ...prev, travelDate: date }))
        }
      />
      <TravellerSelector
        label="People"
        variant="holidays"
        onChange={handleTravellerChange}
      />
    </>
  );

  return (
    <div className="relative flex flex-col items-center justify-center pt-10 px-4 pb-20">
      {/* Background */}
      <div className="absolute top-0 w-full h-[600px] md:h-[700px] overflow-hidden rounded-b-[3rem] z-0">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-blue-200/20 dark:bg-background/60 mix-blend-multiply transition-colors duration-500"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-lightBackground dark:from-background to-transparent transition-colors duration-500"></div>
      </div>

      {/* Glass Card */}
      {/* Adjusted margin top to mt-24 for mobile to avoid clash with Navbar */}
      <div className="relative z-10 w-full max-w-5xl mt-24 md:mt-32 pb-16">
        <div className="bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-glass relative transition-colors duration-500">
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/40 dark:border-primary/20 pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_30px_rgba(0,209,255,0.1)]"></div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-10">
            {["Flights", "Hotels", "Holidays"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-8 py-2 md:py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-lightCta dark:bg-primary text-white dark:text-heading shadow-neon scale-105"
                    : "text-lightHeading dark:text-mutedText hover:bg-white/40 dark:hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Inputs - Reduced gap on mobile */}
          <div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 animate-fadeIn"
          >
            {activeTab === "Flights" && renderFlights()}
            {activeTab === "Hotels" && renderHotels()}
            {activeTab === "Holidays" && renderHolidays()}
          </div>

          {/* Price + Search Section */}
          {/* Adjusted gap-14 to gap-6 for mobile so they don't look detached */}
          <div className="mt-10 md:mt-14 mb-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14">
            {/* Predicted Price */}
            {predictedPrice && (
              <div className="bg-lightCta dark:bg-primary text-white dark:text-heading text-lg font-bold py-3 md:py-4 px-8 md:px-12 rounded-full shadow-neon flex items-center gap-3 w-full md:w-auto justify-center">
                Est. Price: ₹{predictedPrice.toLocaleString("en-IN")}
              </div>
            )}

            {/* Search Button */}
            <button
              onClick={() => {
                navigate(`/category/${activeTab.toLowerCase()}`, {
                  state: formData,
                });
              }}
              className="bg-lightCta dark:bg-primary hover:bg-lightCtaHover dark:hover:bg-ctaHover text-white dark:text-heading text-lg font-bold py-3 md:py-4 px-8 md:px-20 rounded-full shadow-neon transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full md:w-auto"
            >
              <MagnifyingGlassIcon className="w-6 h-6 stroke-[2.5]" />
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------ Sub Components ------------------ */
const GlassInput = ({ label, placeholder, icon, value, onChange }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-xs font-bold text-lightHeading dark:text-heading uppercase tracking-wider ml-4">
      {label}
    </label>
    <div className="relative flex items-center">
      <span className="absolute left-5 text-lightHeading/50 dark:text-lightCta">
        {icon}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-white/60 dark:bg-background/60 border border-white/50 dark:border-white/10 rounded-2xl py-4 pl-14 pr-4 text-lightHeading dark:text-heading placeholder-gray-500 dark:placeholder-mutedText focus:outline-none focus:border-lightCta transition-all duration-300"
      />
    </div>
  </div>
);

// ------------------ Fixed GlassDatePicker ------------------
const CustomDateInput = forwardRef(({ value, onClick, icon, placeholder }, ref) => (
  <div className="relative flex items-center w-full">
    <span className="absolute left-5 text-lightHeading/50 dark:text-lightCta">
      {icon}
    </span>
    <input
      ref={ref}
      value={value || ""}
      onClick={onClick}
      readOnly
      placeholder={value ? "" : placeholder}
      className="w-full bg-white/60 dark:bg-background/60 border border-white/50 dark:border-white/10 rounded-2xl py-4 pl-14 pr-4 text-lightHeading dark:text-heading placeholder-gray-500 dark:placeholder-mutedText focus:outline-none focus:border-lightCta transition-all duration-300 cursor-pointer"
    />
  </div>
));

const GlassDatePicker = ({ label, placeholder, icon, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2 group">
      <label className="text-xs font-bold text-lightHeading dark:text-heading uppercase tracking-wider ml-4">
        {label}
      </label>
      <DatePicker
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        customInput={<CustomDateInput icon={icon} placeholder={placeholder} />}
        withPortal // ✅ Added this! Centers the calendar on mobile screens
      />
    </div>
  );
};

export default HeroSection;