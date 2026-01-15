import React from "react";
import Layout from "../components/Layout";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!firstName || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    await addDoc(collection(db, "contacts"), {
      firstName,
      email,
      message,
      createdAt: serverTimestamp(),
    });

    alert("Message sent successfully!");

    setFirstName("");
    setEmail("");
    setMessage("");
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      {/* Mobile: py-12 px-4 | Desktop: py-24 px-6 (Unchanged) */}
      <div className="min-h-screen bg-lightBackground dark:bg-background
        flex items-center justify-center px-4 py-12 md:px-6 md:py-24 relative overflow-hidden transition-colors">

        {/* CENTER WRAPPER */}
        <div className="relative flex items-center justify-center">

          {/* LEFT GLOW */}
          <div className="absolute -left-10 md:-left-32 top-1/2 -translate-y-1/2
            w-40 h-40 md:w-72 md:h-72 bg-lightCta/30 dark:bg-cta/30 blur-[80px] md:blur-[120px] rounded-full" />

          {/* RIGHT GLOW */}
          <div className="absolute -right-10 md:-right-32 top-1/2 -translate-y-1/2
            w-40 h-40 md:w-72 md:h-72 bg-lightCta/30 dark:bg-cta/30 blur-[80px] md:blur-[120px] rounded-full" />

          {/* LEFT SOCIAL - EXACTLY AS PROVIDED */}
          <div className="hidden lg:flex flex-col gap-4 absolute -left-20 top-1/2 -translate-y-1/2 z-20">
            <SocialIcon icon={<FaInstagram />} />
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaLinkedinIn />} />
          </div>

          {/* CONTACT CARD */}
          {/* Mobile: p-6 | Desktop: p-14 (Unchanged) */}
          <div className="relative z-10 w-full max-w-2xl
            bg-white/20 dark:bg-white/5
            backdrop-blur-2xl
            border border-white/30 dark:border-white/10
            rounded-[2rem] md:rounded-[2.75rem]
            p-6 md:p-14 shadow-glass"
          >
            {/* HEADER */}
            <div className="text-center mb-8 md:mb-10">
              {/* Mobile: text-3xl | Desktop: text-4xl (Unchanged) */}
              <h1 className="text-3xl md:text-4xl font-bold text-lightHeading dark:text-heading">
                Contact Us
              </h1>
              <p className="mt-2 text-sm md:text-base text-lightMutedText dark:text-mutedText">
                We’d love to hear from you
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Input
  label="First Name"
  placeholder="John"
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
/>

                <Input
  label="Email Address"
  placeholder="john@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

              </div>

              <Textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>


              <div className="flex justify-center pt-4 md:pt-6">
                <button
                  type="submit" disabled={loading}
                  // Mobile: w-full px-8 | Desktop: w-auto px-16 (Unchanged)
                  className="w-full md:w-auto px-8 md:px-16 py-3 md:py-4 rounded-full
                    bg-lightCta dark:bg-cta
                    text-white font-bold tracking-wide
                    shadow-neon hover:scale-105 transition-transform"
                >
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </div>
            </form>

            {/* DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 md:mt-12 pt-8 md:pt-10
              border-t border-white/20 dark:border-white/10"
            >
              <Detail icon={<PhoneIcon />} text="+1 (555) 000-000" />
              <Detail icon={<EnvelopeIcon />} text="hello@makemytrip.ai" />
              <Detail icon={<MapPinIcon />} text="San Francisco, CA" />
            </div>

            {/* MOBILE ONLY SOCIALS (Hidden on Desktop) */}
            <div className="flex lg:hidden justify-center gap-6 mt-8 pt-8 border-t border-white/10">
                <SocialIcon icon={<FaInstagram />} />
                <SocialIcon icon={<FaTwitter />} />
                <SocialIcon icon={<FaLinkedinIn />} />
            </div>

          </div>

          {/* RIGHT SOCIAL - EXACTLY AS PROVIDED */}
          <div className="hidden lg:flex flex-col gap-4 absolute -right-20 top-1/2 -translate-y-1/2 z-20">
            <SocialIcon icon={<FaLinkedinIn />} />
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaInstagram />} />
          </div>

        </div>
      </div>
    </Layout>
  );
};

/* ---------------- COMPONENTS ---------------- */

const Input = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold uppercase tracking-widest
      text-lightMutedText dark:text-mutedText ml-3"
    >
      {label}
    </label>
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      // Mobile: py-3 px-5 | Desktop: py-4 px-6 (Unchanged)
      className="w-full rounded-2xl px-5 py-3 md:px-6 md:py-4
        bg-white/30 dark:bg-background/30
        border border-white/30 dark:border-white/10
        text-lightHeading dark:text-heading
        placeholder-lightMutedText dark:placeholder-mutedText
        focus:outline-none focus:border-lightCta dark:focus:border-cta
        transition"
    />
  </div>
);

const Textarea = ({ value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold uppercase tracking-widest
      text-lightMutedText dark:text-mutedText ml-3"
    >
      Your Message
    </label>
    <textarea
      rows="4"
      placeholder="How can we help you?"
      value={value}
      onChange={onChange}
      // Mobile: py-3 px-5 | Desktop: py-4 px-6 (Unchanged)
      className="w-full rounded-2xl px-5 py-3 md:px-6 md:py-4
        bg-white/30 dark:bg-background/30
        border border-white/30 dark:border-white/10
        text-lightHeading dark:text-heading
        placeholder-lightMutedText dark:placeholder-mutedText
        focus:outline-none focus:border-lightCta dark:focus:border-cta
        transition"
    />
  </div>
);

const Detail = ({ icon, text }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="w-5 h-5 md:w-6 md:h-6 text-lightCta dark:text-cta">
      {icon}
    </div>
    <span className="text-xs font-medium text-lightMutedText dark:text-mutedText">
      {text}
    </span>
  </div>
);

const SocialIcon = ({ icon }) => (
  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full
    border border-white/30 dark:border-white/20
    flex items-center justify-center
    text-lightCta dark:text-cta
    hover:bg-lightCta hover:text-white dark:hover:bg-cta dark:hover:text-white
    hover:shadow-neon transition-all cursor-pointer"
  >
    {icon}
  </div>
);

export default Contact;