import React from "react";

const DestinationCard = ({ title, location, price, img }) => {
  // Format price as Indian Rupees
  const formattedPrice =
    price !== undefined && price !== null
      ? `₹${Number(price).toLocaleString("en-IN")}`
      : "";

  return (
    <div className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer border border-black/30 dark:border-lightBorder hover:border-accent dark:hover:border-lightAccent transition-all duration-500 hover:shadow-neon">
      <img
        src={img}
        alt={title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {formattedPrice && (
        <div className="absolute top-4 right-4 bg-background/60 dark:bg-lightBackground/100 backdrop-blur-md border border-accent/50 dark:border-lightAccent/50 text-accent dark:text-lightAccent font-bold px-4 py-1.5 rounded-full shadow-lg">
          {formattedPrice}
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-6 w-full">
        <p className="text-white/90 text-xs uppercase tracking-widest mb-1 drop-shadow">
          {location}
        </p>

        <h3 className="text-2xl font-bold text-heading dark:text-heading group-hover:text-cta dark:group-hover:text-lightCta transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default DestinationCard;
