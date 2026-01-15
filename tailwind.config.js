/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- Dark Mode Palette (Improved) ---
        primary: '#0c1320',       // Navbar background
        background: '#081026',    // Main Page background (deeper navy)
        heading: '#F9FAFB',       // Main text color
        mutedText: '#94A3B8',     // Secondary text
        border: '#1E293B',        // Borders
        accent: '#00d1ff',        // Neon Cyan
        cta: '#00d1ff',            // Button background
        ctaHover: '#00b8e0',       // Button hover

        // --- Light Mode Palette (unchanged) ---
        lightPrimary: '#FFFFFF',
        lightBackground: '#F0F4F8',
        lightHeading: '#111827',
        lightMutedText: '#64748B',
        lightBorder: '#CBD5E1',
        lightAccent: '#0891b2',
        lightCta: '#06B6D4',
        lightCtaHover: '#0891b2',
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop')",
        'dark-hero-pattern': 'linear-gradient(to bottom, #081026, #0c1320)', // for dark hero
      },
      boxShadow: {
        neon: '0 0 25px rgba(0, 209, 255, 0.8)', // stronger glow
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        innerDark: 'inset 0 4px 10px rgba(0,0,0,0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
