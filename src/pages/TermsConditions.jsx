import Layout from "../components/Layout";
import { HiOutlineDocumentText } from "react-icons/hi";

const TermsConditions = () => {
  const sections = [
    {
      id: 1,
      title: "Booking Policy",
      text: "All bookings are subject to availability. Prices and offers may change without prior notice. Customers must provide accurate details during booking."
    },
    {
      id: 2,
      title: "Payment Terms",
      text: "Payments must be completed at the time of booking. Accepted payment methods include UPI, credit/debit cards, and net banking. All transactions are secure and encrypted."
    },
    {
      id: 3,
      title: "Cancellation & Refund",
      text: "Cancellations must be made at least 48 hours before the scheduled service. Refunds will be processed according to the cancellation policy and may take 5-7 business days to reflect."
    },
    {
      id: 4,
      title: "Liability",
      text: "MakeMyTrip is not liable for personal injuries, property damage, or losses during travel. Customers are advised to check travel advisories and follow safety guidelines."
    },
    {
      id: 5,
      title: "Contact & Support",
      text: "For queries related to bookings or payments, contact our support team via the Contact page."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background text-lightHeading dark:text-heading px-6 md:px-12 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">Terms & Conditions</h1>

        <div className="relative border-l-2 border-lightBorder dark:border-gray-700 ml-4 md:ml-8 space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="pl-6 md:pl-8 relative">
              <span className="absolute -left-4 md:-left-6 top-0 w-8 h-8 flex items-center justify-center rounded-full bg-lightCta dark:bg-cta text-white font-bold">
                {section.id}
              </span>
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-sm text-lightMutedText dark:text-mutedText leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
