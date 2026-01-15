import React from "react";
import Layout from "../components/Layout";
import {
  GlobeAltIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors">

        {/* ================= HERO ================= */}
        {/* Mobile: py-12 px-4 | Desktop: py-24 px-12 */}
        <section className="px-4 md:px-12 py-12 md:py-24 max-w-5xl mx-auto text-center">
          {/* Mobile: text-3xl | Desktop: text-5xl */}
          <h1 className="text-3xl md:text-5xl font-bold text-lightHeading dark:text-heading mb-4 md:mb-6">
            About MakeMyTrip
          </h1>
          {/* Mobile: text-base | Desktop: text-lg */}
          <p className="text-base md:text-lg text-lightMutedText dark:text-mutedText leading-relaxed">
            We are redefining the way the world travels by combining
            technology, design, and human experiences to create journeys
            that matter.
          </p>
        </section>

        {/* ================= STORY + STATS ================= */}
        {/* Mobile: py-12 gap-10 | Desktop: py-20 gap-16 */}
        <section className="px-4 md:px-12 py-12 md:py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* STORY */}
          <div>
            {/* Mobile: text-2xl | Desktop: text-3xl */}
            <h2 className="text-2xl md:text-3xl font-bold text-lightHeading dark:text-heading mb-4 md:mb-6">
              Our Story
            </h2>
            <p className="text-lightMutedText dark:text-mutedText leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              Founded with a vision to make travel effortless, MakeMyTrip
              has grown into a trusted travel companion for millions.
              From flights and hotels to curated holiday experiences,
              we simplify travel planning at every step.
            </p>
            <p className="text-lightMutedText dark:text-mutedText leading-relaxed text-sm md:text-base">
              Our focus is simple — deliver reliability, transparency,
              and unforgettable experiences to every traveler.
            </p>

            {/* VALUES */}
            {/* Mobile: grid-cols-1 (stack) | Desktop: grid-cols-2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10">
              <ValueItem icon={<GlobeAltIcon />} title="Global Reach" />
              <ValueItem icon={<RocketLaunchIcon />} title="Fast Booking" />
              <ValueItem icon={<UserGroupIcon />} title="Trusted Experts" />
              <ValueItem icon={<HeartIcon />} title="Customer First" />
            </div>
          </div>

          {/* STATS CARD */}
          <div className="relative">
            <div className="absolute inset-0 bg-lightCta/20 dark:bg-cta/20 blur-3xl rounded-full"></div>

            {/* Mobile: p-6 rounded-[2rem] | Desktop: p-10 rounded-[2.5rem] */}
            <div className="relative bg-white/80 dark:bg-gray-800/90
              border border-lightBorder dark:border-white/10
              rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 backdrop-blur-xl shadow-lg"
            >
              <div className="text-center">
                {/* Mobile: text-4xl | Desktop: text-6xl */}
                <p className="text-4xl md:text-6xl font-bold text-lightCta dark:text-cta">
                  15+
                </p>
                <p className="text-lightMutedText dark:text-mutedText mt-2 text-sm md:text-base">
                  Years of Excellence
                </p>
              </div>

              {/* Mobile: mt-6 pt-6 | Desktop: mt-10 pt-10 */}
              <div className="mt-6 pt-6 md:mt-10 md:pt-10 border-t border-lightBorder dark:border-white/10 grid grid-cols-2 gap-4 md:gap-8 text-center">
                <div>
                  {/* Mobile: text-2xl | Desktop: text-3xl */}
                  <p className="text-2xl md:text-3xl font-bold text-lightHeading dark:text-heading">
                    5M+
                  </p>
                  <p className="text-[10px] md:text-xs uppercase text-lightMutedText dark:text-mutedText tracking-widest">
                    Happy Travelers
                  </p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-lightHeading dark:text-heading">
                    120+
                  </p>
                  <p className="text-[10px] md:text-xs uppercase text-lightMutedText dark:text-mutedText tracking-widest">
                    Countries Covered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        {/* Mobile: py-12 | Desktop: py-24 */}
        <section className="px-4 md:px-12 py-12 md:py-24 max-w-7xl mx-auto">
          {/* Mobile: text-3xl mb-8 | Desktop: text-4xl mb-14 */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-lightHeading dark:text-heading mb-8 md:mb-14">
            Meet Our Leadership
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <TeamCard
              name="John Doe"
              role="CEO & Founder"
              img="https://images.unsplash.com/photo-1560250097-0b93528c311a"
            />
            <TeamCard
              name="Jane Smith"
              role="Head of Design"
              img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
            />
            <TeamCard
              name="Alex Rivera"
              role="Technology Lead"
              img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            />
          </div>
        </section>

      </div>
    </Layout>
  );
};

/* ================= COMPONENTS ================= */

const ValueItem = ({ icon, title }) => (
  // Mobile: p-4 gap-3 | Desktop: p-5 gap-4
  <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl
    bg-white/80 dark:bg-gray-800/90
    border border-lightBorder dark:border-white/10
    hover:scale-105 transition"
  >
    <div className="w-8 h-8 md:w-9 md:h-9 text-lightCta dark:text-cta">{icon}</div>
    <span className="font-semibold text-lightHeading dark:text-heading text-sm md:text-base">
      {title}
    </span>
  </div>
);

const TeamCard = ({ name, role, img }) => (
  // Mobile: p-6 | Desktop: p-8
  <div className="text-center p-6 md:p-8 rounded-[2rem]
    bg-white/80 dark:bg-gray-800/90
    border border-lightBorder dark:border-white/10
    hover:shadow-neon transition"
  >
    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden border-2 border-lightCta dark:border-cta">
      <img src={img} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg md:text-xl font-bold text-lightHeading dark:text-heading">
      {name}
    </h3>
    <p className="text-xs md:text-sm text-lightCta dark:text-cta uppercase tracking-widest mt-1">
      {role}
    </p>
  </div>
);

export default About;