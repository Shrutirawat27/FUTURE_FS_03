import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-lightPrimary dark:bg-background border-t border-lightBorder dark:border-border transition-colors duration-300">
      
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold text-lightHeading dark:text-heading mb-4">
            TRIPKART
          </h3>
          <p className="text-sm text-lightMutedText dark:text-mutedText leading-relaxed">
            Your trusted travel partner for flights, hotels, holiday packages,
            and unforgettable journeys across the globe.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold text-lightHeading dark:text-heading mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-lightMutedText dark:text-mutedText">
            <li>
              <Link to="/about" className="hover:text-lightCta dark:hover:text-cta transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/destinations" className="hover:text-lightCta dark:hover:text-cta transition">
                Destinations
              </Link>
            </li>
            <li>
              <Link to="/packages" className="hover:text-lightCta dark:hover:text-cta transition">
                Packages
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-lightCta dark:hover:text-cta transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="font-semibold text-lightHeading dark:text-heading mb-4">
            Support
          </h4>
          <ul className="space-y-2 text-sm text-lightMutedText dark:text-mutedText">
            <li>
              <Link to="/faq" className="hover:text-lightCta dark:hover:text-cta transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-lightCta dark:hover:text-cta transition">
                Customer Support
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-lightCta dark:hover:text-cta transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-lightCta dark:hover:text-cta transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="font-semibold text-lightHeading dark:text-heading mb-4">
            Follow Us
          </h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/shrutirawat0208"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-full bg-lightCta/10 dark:bg-cta/10 text-lightCta dark:text-cta hover:scale-110 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://github.com/Shrutirawat27"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-lightCta/10 dark:bg-cta/10 text-lightCta dark:text-cta hover:scale-110 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/shruti-rawat-6b7969314/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-lightCta/10 dark:bg-cta/10 text-lightCta dark:text-cta hover:scale-110 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="text-center py-6 text-sm text-lightMutedText dark:text-mutedText border-t border-lightBorder dark:border-border">
        © {new Date().getFullYear()} TRIPKART. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
