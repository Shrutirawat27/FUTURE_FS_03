import Layout from "../components/Layout";
import { useState } from "react";

const faqs = [
  {
    q: "How do I book a trip?",
    a: "You can book a trip by selecting your destination, choosing a package or hotel, filling in traveler details, and completing the payment securely."
  },
  {
    q: "What payment methods are supported?",
    a: "We support UPI, debit/credit cards, and net banking for all bookings."
  },
  {
    q: "Can I cancel or modify my booking?",
    a: "Yes, cancellation and modification depend on the package or hotel policy. Please check details before booking."
  },
  {
    q: "How long do refunds take?",
    a: "Refunds are typically processed within 5–7 business days after successful cancellation."
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. All payments are processed via secure and trusted payment gateways."
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background transition-colors">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">

          {/* HEADER */}
          <h1 className="text-3xl md:text-4xl font-bold text-lightHeading dark:text-heading mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lightMutedText dark:text-mutedText mb-10">
            Find quick answers to the most common questions about bookings, payments, and policies.
          </p>

          {/* FAQ LIST */}
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90
                  border border-lightBorder dark:border-white/10
                  rounded-2xl p-5 shadow-md"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="font-semibold text-lightHeading dark:text-heading">
                    {item.q}
                  </span>
                  <span className="text-lightCta dark:text-cta text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <p className="mt-4 text-sm text-lightMutedText dark:text-mutedText leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Faq;
