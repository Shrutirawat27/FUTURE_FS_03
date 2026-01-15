import React, { useState, useEffect, useRef } from "react";
import { UserGroupIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const TravellerSelector = ({ label, variant = "hotels", onChange }) => {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const wrapperRef = useRef(null);

  // ------------------ Close dropdown on outside click ------------------
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ------------------ Send data upward ------------------
  useEffect(() => {
    onChange?.({
      adults,
      children,
      rooms: variant === "hotels" ? rooms : undefined,
    });
  }, [adults, children, rooms, variant, onChange]);

  // ------------------ Display text ------------------
  const getDisplayText = () => {
    const hasSelected =
      adults !== 0 || children !== 0 || (variant === "hotels" && rooms !== 0);
    if (!hasSelected) return "Members";

    if (variant === "hotels") {
      return `${adults} Adults${children > 0 ? ` · ${children} Children` : ""} · ${rooms} Room${rooms > 1 ? "s" : ""}`;
    } else {
      return `${adults} Adults${children > 0 ? ` · ${children} Children` : ""}`;
    }
  };

  return (
    <div className="relative flex flex-col gap-2" ref={wrapperRef}>
      <label className="text-xs font-bold uppercase tracking-wider ml-4 text-lightHeading dark:text-heading">
        {label}
      </label>

      <button
        type="button" // This was already correct in your main toggle
        onClick={() => setOpen(!open)}
        className="w-full bg-white/60 dark:bg-background/60 border border-white/50 dark:border-white/10 rounded-2xl py-4 pl-14 pr-4 text-base flex items-center justify-between cursor-pointer focus:outline-none focus:border-lightCta transition-all duration-300"
      >
        <UserGroupIcon className="absolute left-5 w-5 h-5 text-lightHeading/50 dark:text-lightCta" />
        <span
          className={`font-medium ${
            adults === 0 && children === 0 ? "text-gray-500 dark:text-mutedText" : "text-lightHeading dark:text-heading"
          }`}
        >
          {getDisplayText()}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${open ? "rotate-180 text-lightCta" : "opacity-60"}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-full z-50 bg-white dark:bg-[#0f1629] border border-lightBorder dark:border-white/10 rounded-2xl shadow-2xl p-6">
          <Counter label="Adults" sub="Age 12+" value={adults} setValue={setAdults} min={1} />
          <Counter label="Children" sub="Age 2–11" value={children} setValue={setChildren} min={0} />
          {variant === "hotels" && (
            <Counter label="Rooms" sub="Max 4 adults" value={rooms} setValue={setRooms} min={1} />
          )}
        </div>
      )}
    </div>
  );
};

// ------------------ Counter Component (FIXED) ------------------
const Counter = ({ label, sub, value, setValue, min }) => (
  <div className="flex justify-between items-center pt-3 py-5 border-b last:border-b-0 border-lightBorder/60 dark:border-white/10">
    <div>
      <p className="font-semibold text-lightHeading dark:text-heading">{label}</p>
      <p className="text-xs text-mutedText">{sub}</p>
    </div>
    <div className="flex items-center gap-2">
      <button
        type="button" // ✅ ADDED THIS
        onClick={() => setValue(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-full border border-lightBorder dark:border-white/20 hover:bg-lightCta/10 flex items-center justify-center transition-colors"
      >
        −
      </button>
      <span className="text-center font-semibold w-6">{value}</span>
      <button
        type="button" // ✅ ADDED THIS
        onClick={() => setValue(value + 1)}
        className="w-7 h-7 rounded-full border border-lightBorder dark:border-white/20 hover:bg-lightCta/10 flex items-center justify-center transition-colors"
      >
        +
      </button>
    </div>
  </div>
);

export default TravellerSelector;