import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineTicket,
  HiOutlineClock,
  HiOutlineUsers,
} from "react-icons/hi";

const features = [
  {
    title: "Best Price Guarantee",
    desc: "Unbeatable prices across flights, hotels & holidays.",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Instant Booking",
    desc: "Real-time confirmation in just a few clicks.",
    icon: HiOutlineTicket,
  },
  {
    title: "24/7 Support",
    desc: "Help whenever you need it, wherever you are.",
    icon: HiOutlineClock,
  },
  {
    title: "Trusted Partners",
    desc: "Only verified airlines, hotels & travel brands.",
    icon: HiOutlineUsers,
  },
];

const stats = [
  { value: "10M+", label: "Happy Travelers" },
  { value: "5K+", label: "Destinations" },
  { value: "99%", label: "Success Bookings" },
];

const WhyChooseUs = () => {
  return (
    // Changed px-6 -> px-4 and py-20 -> py-12 md:py-20
    <section className="px-4 md:px-12 py-12 md:py-20 max-w-7xl mx-auto">
      
      {/* HEADING */}
      <div className="text-center mb-10 md:mb-14">
        {/* Responsive Text Size */}
        <h2 className="text-3xl md:text-4xl font-bold text-lightHeading dark:text-heading mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
          Trusted by millions of travelers for seamless bookings, unbeatable prices,
          and round-the-clock support.
        </p>
      </div>

      {/* STATS BAR */}
      <div
        // Reduced gap-12 -> gap-8 and px-10 -> px-6 for mobile
        className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 md:mb-16
        rounded-3xl px-6 py-8 md:px-10
        bg-lightCta/10 dark:bg-cta/10"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            {/* Responsive Number Size */}
            <p className="text-3xl md:text-4xl font-bold text-lightCta dark:text-cta">
              {stat.value}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* FEATURES ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map(({ title, desc, icon: Icon }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center
              p-6 rounded-2xl
              bg-white/80 dark:bg-gray-800/90
              border border-black/10 dark:border-white/10
              hover:shadow-neon transition-all duration-300"
          >
            {/* Responsive Icon Container */}
            <div
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl
                bg-lightCta/10 dark:bg-cta/10
                text-lightCta dark:text-cta mb-4 md:mb-5"
            >
              <Icon className="w-6 h-6 md:w-7 md:h-7" />
            </div>

            <h3 className="font-semibold text-lg md:text-xl text-lightHeading dark:text-heading mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;