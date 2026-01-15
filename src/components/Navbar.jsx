// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  SunIcon,
  MoonIcon,
  HomeIcon,
  MapPinIcon,
  BriefcaseIcon,
  InformationCircleIcon,
  PhoneIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useUser } from "../context/UserContext";
import { Logo } from './Logo';

const navLinks = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Destinations", path: "/destinations", icon: MapPinIcon },
  { name: "Packages", path: "/packages", icon: BriefcaseIcon },
  { name: "My Bookings", path: "/my-bookings", icon: ClipboardDocumentListIcon },
  { name: "About", path: "/about", icon: InformationCircleIcon },
  { name: "Contact", path: "/contact", icon: PhoneIcon },
];

const Navbar = () => {
  const { dark, toggleTheme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
      navigate("/login");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-lightPrimary/80 dark:bg-primary/80 border-b border-lightBorder dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <a href="/">
        <Logo className="w-10 h-10" /> 
      </a>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <Link
                to={path}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-lightCta/10 dark:hover:bg-cta/10 transition"
              >
                <Icon className="w-4 h-4 text-lightCta dark:text-accent" />
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-3">

          {/* THEME TOGGLE (always visible) */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-white/10 hover:scale-105 transition"
          >
            {dark ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* DESKTOP LOGIN / LOGOUT */}
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-lightCta dark:bg-cta text-white text-sm font-semibold hover:scale-105 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-lightCta dark:bg-cta text-white text-sm font-semibold hover:scale-105 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/10"
          >
            {open ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden px-6 pb-6">
          <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-lg p-4 flex flex-col gap-2">

            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-lightCta/10 dark:hover:bg-cta/10"
              >
                <Icon className="w-5 h-5 text-lightCta dark:text-accent" />
                {name}
              </Link>
            ))}

            <div className="border-t border-gray-200 dark:border-white/10 mt-2 pt-2">
              {user ? (
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 rounded-xl bg-lightCta dark:bg-cta text-white font-semibold"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl bg-lightCta dark:bg-cta text-white font-semibold"
                >
                  Login
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
