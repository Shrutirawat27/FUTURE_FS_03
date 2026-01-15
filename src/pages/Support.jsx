import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Support = () => {
    const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">

          {/* HEADER */}
          <h1 className="text-3xl md:text-4xl font-bold text-lightHeading dark:text-heading mb-4">
            Customer Support
          </h1>
          <p className="text-lightMutedText dark:text-mutedText mb-10">
            We’re here to help you with bookings, payments, refunds, and more.
          </p>

          {/* SUPPORT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* CONTACT DETAILS */}
            <div className="bg-white/90 dark:bg-gray-800/90 border border-lightBorder dark:border-white/10 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-lightHeading dark:text-heading mb-4">
                Contact Details
              </h2>
              <p className="text-sm text-lightMutedText dark:text-mutedText mb-2">
                📧 Email: support@tripkart.com
              </p>
              <p className="text-sm text-lightMutedText dark:text-mutedText mb-2">
                📞 Phone: +91 98765 43210
              </p>
              <p className="text-sm text-lightMutedText dark:text-mutedText">
                🕒 Support Hours: Mon – Sat (9:00 AM – 8:00 PM)
              </p>
            </div>

            {/* ISSUE CATEGORIES */}
            <div className="bg-white/90 dark:bg-gray-800/90 border border-lightBorder dark:border-white/10 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-lightHeading dark:text-heading mb-4">
                Issue Categories
              </h2>
              <ul className="space-y-2 text-sm text-lightMutedText dark:text-mutedText">
                <li>• Booking related issues</li>
                <li>• Payment & transaction failures</li>
                <li>• Refund & cancellation queries</li>
                <li>• Login / account issues</li>
                <li>• Other travel assistance</li>
              </ul>
            </div>
          </div>

          {/* RAISE TICKET */}
          <div className="mt-12 bg-white/90 dark:bg-gray-800/90 border border-lightBorder dark:border-white/10 rounded-2xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-lightHeading dark:text-heading mb-4">
              Need Further Assistance?
            </h2>
            <p className="text-lightMutedText dark:text-mutedText mb-6">
              Raise a support ticket and our team will get back to you shortly.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 rounded-full bg-lightCta dark:bg-cta
                text-white font-bold
                hover:scale-105 transition-transform"
            >
              Raise a Ticket
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
