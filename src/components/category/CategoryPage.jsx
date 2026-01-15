import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../Layout";
import {
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

/* ------------------ Price Formatter ------------------ */
const formatPrice = (price, currency = "INR") => {
  if (typeof price !== "number") return price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};

/* =========================================================================
   MAIN COMPONENT: CategoryPage
   ========================================================================= */
const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Data State
  const [allItems, setAllItems] = useState([]); 
  const [items, setItems] = useState([]);       
  const [loading, setLoading] = useState(true);
  
  // Search Form State
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: null,
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  
  // UI State
  const [isButtonHover, setIsButtonHover] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ------------------ 1. Price Prediction Logic ------------------
  useEffect(() => {
    const basePrice = 2000;
    const isHotel = category?.toLowerCase() === "hotels";

    const adults = searchData.adults || 1;
    const children = searchData.children || 0;
    const rooms = searchData.rooms || 1;

    const hasInput = searchData.from || searchData.to;

    if (!hasInput) {
      setPredictedPrice(null);
      return;
    }

    let price =
      (adults * basePrice + children * basePrice * 0.5) *
      (isHotel ? rooms : 1);

    setPredictedPrice(price);
  }, [searchData, category]);

  // ------------------ 2. Fetch Data ------------------
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const typeQuery = category.toLowerCase();
        const q = query(
          collection(db, "category"),
          where("type", "==", typeQuery)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllItems(data);
        setItems(data); 
      } catch (err) {
        console.error("Error fetching category items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category]);

  // ------------------ 3. Search Handler ------------------
  const handleSearch = () => {
    setLoading(true);
    
    setTimeout(() => {
      const term = (searchData.to || searchData.from || "").toLowerCase().trim();

      if (!term) {
        setItems(allItems);
      } else {
        const filtered = allItems.filter((item) => {
          const title = (item.title || "").toLowerCase();
          const arrival = (item.arrival || "").toLowerCase(); 
          const departure = (item.departure || "").toLowerCase(); 
          const desc = (item.description || "").toLowerCase();
          
          return (
            title.includes(term) || 
            arrival.includes(term) || 
            departure.includes(term) ||
            desc.includes(term)
          );
        });
        setItems(filtered);
      }
      setLoading(false);
    }, 500);
  };

  const updateTravellers = (field, value) => {
    setSearchData((prev) => ({ ...prev, [field]: value }));
  };

  // Modal Handlers
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  /* ------------------ Render Inputs ------------------ */
  const renderSearchInputs = () => (
    <>
      <GlassInput
        label="From"
        placeholder="Delhi"
        name="from"
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <GlassInput
        label={category.toLowerCase() === 'hotels' ? "City" : "To"}
        placeholder={category.toLowerCase() === 'hotels' ? "Goa" : "Mumbai"}
        name="to"
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <GlassDatePicker
        label="Date"
        placeholder="Select Date"
        name="date"
        searchData={searchData}
        setSearchData={setSearchData}
      />
      
      <ControlledTravellerSelector
        label={category.toLowerCase() === "hotels" ? "Guests & Rooms" : "Travellers"}
        variant={category.toLowerCase() === "hotels" ? "hotels" : "flights"}
        adults={searchData.adults}
        childrenCount={searchData.children}
        rooms={searchData.rooms}
        onUpdate={updateTravellers}
      />
    </>
  );

 const handleBookNow = () => {
  closeModal();

  // Navigate to Booking page instead of Payment
  navigate(`/booking/${selectedItem.id}`, {
    state: { selectedPackage: selectedItem } // pass the selected package
  });
};

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background font-sans text-lightHeading dark:text-heading transition-colors duration-500">
        
        {/* ================= HERO SEARCH SECTION ================= */}
        <div className="relative flex flex-col items-center justify-center pt-10 px-4 pb-36">
          <div className="absolute top-0 w-full h-[450px] overflow-hidden rounded-b-[3rem] z-0">
            <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-blue-900/10 dark:bg-background/70 mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-lightBackground dark:from-background to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-6xl mt-24">
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[2.5rem] p-8 shadow-glass">
              
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white drop-shadow-lg capitalize">
                 Explore {category}
              </h1>

              {/* Inputs - Fixed for mobile: single column on small screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
                {renderSearchInputs()}
              </div>
              
              {/* Action Area - Stack vertically on mobile */}
              <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
                {predictedPrice && (
                  <div className="bg-lightCta dark:bg-primary text-white dark:text-heading text-lg font-bold py-4 px-8 md:px-12 rounded-full shadow-neon flex items-center gap-3 animate-fadeIn">
                    Estimated Price: ₹{predictedPrice.toLocaleString("en-IN")}
                  </div>
                )}

                <button 
                  type="button"
                  onClick={handleSearch}
                  className="bg-lightCta dark:bg-primary hover:bg-lightCtaHover dark:hover:bg-ctaHover text-white dark:text-heading text-lg font-bold py-4 px-12 md:px-20 rounded-full shadow-neon transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  <MagnifyingGlassIcon className="w-6 h-6 stroke-[2.5]" />
                  SEARCH
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ================= RESULTS GRID ================= */}
        <div className="px-4 md:px-12 pb-20 max-w-7xl mx-auto"> {/* Reduced px-6 to px-4 on mobile */}
          {loading ? (
            <div className="text-center py-20 text-xl animate-pulse">
              Searching for the best deals...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 mx-4"> {/* Added mx-4 for mobile */}
               <p className="text-xl opacity-70">No packages found for "{searchData.to}".</p>
               <button 
                onClick={() => { setItems(allItems); setSearchData(prev => ({...prev, to: ""})) }}
                className="mt-4 text-lightCta font-bold underline cursor-pointer"
               >
                 Show all packages
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"> {/* Reduced gap-8 to gap-4 on mobile */}
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openModal(item)}
                  className={`group relative rounded-[2rem] overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-lightCta dark:hover:border-primary transition-all duration-300 cursor-pointer mx-2 md:mx-0 ${
                    isButtonHover ? "" : "hover:shadow-neon"
                  }`} /* Added mx-2 for mobile spacing */
                >
                  {/* Image Area - Reduced height on mobile */}
                  <div className="h-56 md:h-64 overflow-hidden relative">
                    <img
                      src={
                        item.img ||
                        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                      }
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                      <div className="bg-lightCta dark:bg-gray-800/90 text-white dark:text-lightCta text-xs font-bold px-3 py-1 rounded-full">
                        {item.rating || "4.5"} ★
                      </div>
                    </div>
                  </div>

                  {/* Content Area - Reduced padding on mobile */}
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                      <div className="flex items-center gap-2 text-xs md:text-sm opacity-70">
                        <ClockIcon className="w-3.5 h-3.5 md:w-4 md:h-4" /> {item.duration || "3 Days"}
                      </div>
                      <p className="text-xl md:text-2xl font-bold text-lightCta dark:text-lightCta">
                        {formatPrice(item.price, item.currency)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onMouseEnter={() => setIsButtonHover(true)}
                      onMouseLeave={() => setIsButtonHover(false)}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(item);
                      }}
                      className="w-full py-3 rounded-full border border-lightCta dark:border-primary bg-lightCta/10 dark:bg-cta/10 text-lightCta dark:text-cta font-bold hover:bg-lightCta hover:text-white dark:hover:bg-lightCta/80 dark:hover:text-white transition-colors text-sm md:text-base"
                    >
                      View Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= MODAL - Fixed for mobile ================= */}
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4"> {/* Reduced p-4 to p-2 on mobile */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
              onClick={closeModal}
            ></div>
            
            {/* Modal container with mobile-specific adjustments */}
            <div className="relative w-full max-w-xl bg-white dark:bg-[#0B1121] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 flex flex-col animate-fade-in-up mx-2 md:mx-0 max-h-[90vh]">
              
              {/* Reduced Image Height further on mobile */}
              <div className="relative h-32 md:h-40 shrink-0">
                <img
                  src={
                    selectedItem.img ||
                    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                  }
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent opacity-90"></div>
                
                <button
                  type="button"
                  className="absolute top-3 md:top-4 right-3 md:right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-lightCta hover:rotate-90 transition-all duration-300 border border-white/20 backdrop-blur-sm z-50"
                  onClick={closeModal}
                >
                  <XMarkIcon className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <div className="absolute bottom-3 md:bottom-4 left-4 md:left-6 right-4 md:right-6 flex items-end justify-between">
                  <div className="max-w-[70%]">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 shadow-sm truncate">
                      {selectedItem.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 md:gap-3 text-white/90 text-xs">
                        <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3 md:w-3.5 md:h-3.5" /> {selectedItem.duration || "Flexible"}</span>
                        <span className="flex items-center gap-1"><UserGroupIcon className="w-3 h-3 md:w-3.5 md:h-3.5" /> {selectedItem.pax || "2 Adults"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Body - Tighter Padding on mobile */}
              <div className="p-3 md:p-5 flex flex-col overflow-y-auto">
                
                {/* Route - Compact on mobile */}
                <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-2 md:p-3 rounded-xl mb-3 md:mb-4 border border-gray-200 dark:border-white/10 shrink-0">
                  <div className="text-center">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-60">DEP</p>
                    <p className="text-sm md:text-base font-bold text-lightCta dark:text-lightCta truncate max-w-[80px] md:max-w-none">{selectedItem.departure || "Origin"}</p>
                  </div>
                  <div className="flex-1 px-2 md:px-4 flex flex-col items-center">
                    <div className="w-full h-[1.5px] bg-gray-300 dark:bg-white/20 relative">
                        <div className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40"></div>
                        <div className="absolute -top-[3px] right-0 w-1.5 h-1.5 rounded-full bg-lightCta dark:bg-lightCta shadow-neon"></div>
                    </div>
                    <p className="text-[8px] md:text-[9px] opacity-50 mt-0.5">Non-stop</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-60">ARR</p>
                    <p className="text-sm md:text-base font-bold text-lightCta dark:text-lightCta truncate max-w-[80px] md:max-w-none">{selectedItem.arrival || "Dest."}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-2">
                  
                  {/* Highlights - Adjusted for mobile */}
                  <div className="overflow-hidden">
                    <h3 className="text-xs md:text-sm font-bold mb-1 md:mb-2 flex items-center gap-1.5">
                      <CheckCircleIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400" /> Highlights
                    </h3>
                    <ul className="space-y-1 md:space-y-2">
                      {(selectedItem.highlights || []).slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-2 opacity-90 text-[10px] md:text-xs bg-gray-100 dark:bg-white/10 p-1.5 md:p-2 rounded-lg">
                          <span className="w-1.5 h-1.5 mt-0.5 md:mt-1 rounded-full bg-lightCta dark:bg-lightCta shrink-0"></span>
                          <span className="line-clamp-2">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Description with Line Clamp - Adjusted for mobile */}
                  <div className="overflow-hidden">
                    <h3 className="text-xs md:text-sm font-bold mb-1 md:mb-2">Description</h3>
                    <p className="opacity-70 text-[10px] md:text-xs leading-relaxed text-justify line-clamp-[5] md:line-clamp-[6]">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>

                {/* Footer Price - More compact on mobile */}
                <div className="pt-2 md:pt-3 border-t border-gray-200 dark:border-white/10 flex justify-between items-center shrink-0 mt-auto">
                  <div>
                    <p className="text-[9px] md:text-[10px] opacity-60 uppercase tracking-wider">Total Price</p>
                    <p className="text-lg md:text-xl font-bold text-lightCta dark:text-lightCta">
                      {formatPrice(selectedItem.price, selectedItem.currency)}
                    </p>
                  </div>
                  <button onClick={handleBookNow} className="bg-lightCta dark:bg-lightCta hover:bg-lightCtaHover dark:hover:bg-ctaHover text-white dark:text-background text-xs md:text-sm font-bold py-2 md:py-2.5 px-4 md:px-6 rounded-full shadow-neon hover:scale-105 transition-all whitespace-nowrap">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

/* ------------------ Reusable Inputs (FIXED TEXT COLOR) ------------------ */
const GlassInput = ({ label, placeholder, icon = <MapPinIcon className="w-5 h-5" />, name, searchData, setSearchData }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-lightHeading dark:text-heading uppercase tracking-wider ml-4">
      {label}
    </label>
    <div className="relative flex items-center bg-white/60 dark:bg-background/60 border border-white/50 dark:border-white/10 rounded-2xl transition-all duration-300 focus-within:border-lightCta/90 dark:focus-within:border-white/50">
      <span className="absolute left-5 text-lightHeading/50 dark:text-lightCta">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        value={searchData[name] || ""}
        onChange={(e) => setSearchData((prev) => ({ ...prev, [name]: e.target.value }))}
        className="w-full bg-transparent py-4 pl-14 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0"
      />
    </div>
  </div>
);

const GlassDatePicker = ({ label, placeholder, icon = <CalendarDaysIcon className="w-5 h-5" />, name, searchData, setSearchData }) => {
  const [date, setDate] = useState(null);
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="relative flex items-center w-full bg-white/60 dark:bg-background/60 border border-white/50 dark:border-white/10 rounded-2xl transition-all duration-300 focus-within:border-lightCta/90 dark:focus-within:border-white/50">
      <span className="absolute left-5 text-lightHeading/50 dark:text-lightCta">{icon}</span>
      <input ref={ref} value={value || ""} onClick={onClick} readOnly placeholder={placeholder} className="w-full bg-transparent py-4 pl-14 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-0" />
    </div>
  ));
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-lightHeading dark:text-heading uppercase tracking-wider ml-4">{label}</label>
      <DatePicker selected={date} onChange={(d) => { setDate(d); setSearchData((prev) => ({ ...prev, [name]: d })); }} customInput={<CustomInput />} />
    </div>
  );
};

/* ------------------ Controlled Traveller Selector (FIXED) ------------------ */
const ControlledTravellerSelector = ({ label, variant, adults, childrenCount, rooms, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const getDisplayText = () => {
    let text = `${adults} Adult${adults !== 1 ? 's' : ''}`;
    if (childrenCount > 0) text += ` · ${childrenCount} Child${childrenCount !== 1 ? 'ren' : ''}`;
    if (variant === "hotels") text += ` · ${rooms} Room${rooms !== 1 ? 's' : ''}`;
    return text;
  };
  return (
    <div className="relative flex flex-col gap-2" ref={wrapperRef}>
      <label className="text-xs font-bold uppercase tracking-wider ml-4 text-lightHeading dark:text-heading">{label}</label>
      <button type="button" onClick={() => setOpen(!open)} className="w-full bg-white/60 dark:bg-background/60 border border-white/50 dark:border-white/10 rounded-2xl py-4 pl-14 pr-4 text-base flex items-center justify-between cursor-pointer transition-all duration-300 focus-within:border-lightCta/90 dark:focus-within:border-white/50 focus:outline-none focus:ring-0">
        <UserGroupIcon className="absolute left-5 w-5 h-5 text-lightHeading/50 dark:text-lightCta" />
        <span className="font-medium text-gray-900 dark:text-white whitespace-normal text-left text-sm leading-tight">{getDisplayText()}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${open ? "rotate-180 text-lightCta" : "opacity-60"} shrink-0 ml-2`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-full z-50 bg-white dark:bg-[#0f1629] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6">
          <Counter label="Adults" sub="Age 12+" value={adults} onIncrement={() => onUpdate('adults', adults + 1)} onDecrement={() => onUpdate('adults', Math.max(1, adults - 1))} />
          <Counter label="Children" sub="Age 2–11" value={childrenCount} onIncrement={() => onUpdate('children', childrenCount + 1)} onDecrement={() => onUpdate('children', Math.max(0, childrenCount - 1))} />
          {variant === "hotels" && <Counter label="Rooms" sub="Max 4 adults" value={rooms} onIncrement={() => onUpdate('rooms', rooms + 1)} onDecrement={() => onUpdate('rooms', Math.max(1, rooms - 1))} />}
        </div>
      )}
    </div>
  );
};

const Counter = ({ label, sub, value, onIncrement, onDecrement }) => (
  <div className="flex justify-between items-center pt-3 py-5 border-b last:border-b-0 border-gray-200 dark:border-white/10">
    <div><p className="font-semibold text-lightHeading dark:text-heading">{label}</p><p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p></div>
    <div className="flex items-center gap-3">
      <button type="button" onClick={(e) => { e.stopPropagation(); onDecrement(); }} className="w-8 h-8 rounded-full border border-gray-300 dark:border-white/20 hover:bg-lightCta hover:text-white dark:hover:bg-white/10 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-300">−</button>
      <span className="text-center font-semibold w-6 text-lightHeading dark:text-heading">{value}</span>
      <button type="button" onClick={(e) => { e.stopPropagation(); onIncrement(); }} className="w-8 h-8 rounded-full border border-gray-300 dark:border-white/20 hover:bg-lightCta hover:text-white dark:hover:bg-white/10 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-300">+</button>
    </div>
  </div>
);

export default CategoryPage;