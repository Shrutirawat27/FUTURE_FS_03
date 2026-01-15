import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    location: "New York, USA",
    review:
      "Amazing experience! Booking was super smooth and customer support was excellent.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    location: "Delhi, India",
    review:
      "Found the best deals for my holiday. Everything went perfectly as planned.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    name: "Michael Smith",
    location: "London, UK",
    review:
      "Highly recommend! Easy booking, great customer support, and amazing prices.",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    // Changed py-24 to py-12 md:py-24
    <section className="py-12 md:py-24 bg-lightCta/10 dark:bg-gray-800/70">
      {/* Changed gap-16 to gap-10 lg:gap-16 */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          {/* Responsive Text Size */}
          <h2 className="text-3xl md:text-4xl font-bold text-lightHeading dark:text-heading mb-6 md:mb-8">
            Loved by travelers worldwide
          </h2>

          {/* Responsive Review Text */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6 md:mb-8 min-h-[80px]">
            “{t.review}”
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
            {[...Array(t.rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 w-5 h-5" />
            ))}
          </div>

          <p className="font-semibold text-lightHeading dark:text-heading">
            {t.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.location}
          </p>

          {/* DOT INDICATORS */}
          <div className="flex justify-center lg:justify-start gap-3 mt-8 md:mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  active === i
                    ? "bg-lightCta dark:bg-cta scale-125"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT IMAGES */}
        {/* Changed gap-6 to gap-4 md:gap-6 for mobile fit */}
        <div className="flex gap-4 md:gap-6 items-center justify-center mt-4 lg:mt-0">
          {testimonials.map((item, i) => (
            <img
              key={item.name}
              src={item.img}
              alt={item.name}
              onClick={() => setActive(i)}
              // Changed w-28 h-28 to w-20 h-20 for mobile
              className={`w-20 h-20 md:w-28 md:h-28 rounded-full object-cover cursor-pointer
                transition-all duration-300 ease-out
                ${
                  active === i
                    ? "scale-110 md:scale-125 -translate-y-2 ring-2 ring-lightCta dark:ring-cta shadow-neon"
                    : "opacity-50 hover:opacity-100 hover:scale-105"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;