import Layout from "../components/Layout";
import { HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineDocumentText, HiOutlineLockClosed, HiOutlineRefresh, HiOutlineMail } from "react-icons/hi";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      icon: <HiOutlineUserGroup className="w-6 h-6 text-gray-500 dark:text-gray-400" />,
      title: "Information We Collect",
      text: "We may collect personal information such as your name, email, phone number, and booking details when you use our services.",
    },
    {
      id: 2,
      icon: <HiOutlineDocumentText className="w-6 h-6 text-gray-500 dark:text-gray-400" />,
      title: "How We Use Your Information",
      text: "Your data is used to process bookings, provide customer support, improve our services, and send you updates and offers (only if you opt-in).",
    },
    {
      id: 3,
      icon: <HiOutlineShieldCheck className="w-6 h-6 text-gray-500 dark:text-gray-400" />,
      title: "Sharing of Information",
      text: "We do not sell or rent your personal information. Your data may be shared with trusted service providers for booking and payment processing only.",
    },
    {
      id: 4,
      icon: <HiOutlineLockClosed className="w-6 h-6 text-gray-500 dark:text-gray-400" />,
      title: "Security",
      text: "We use industry-standard measures to protect your personal information. However, no method of transmission over the internet is 100% secure.",
    },
    {
      id: 5,
      icon: <HiOutlineRefresh className="w-6 h-6 text-gray-500 dark:text-gray-400" />,
      title: "Changes to Privacy Policy",
      text: "We may update this Privacy Policy from time to time. The latest version will always be available on our website.",
    },
    {
      id: 6,
      icon: <HiOutlineMail className="w-6 h-6 text-gray-500 dark:text-gray-400" />,
      title: "Contact Us",
      text: "If you have any questions or concerns about this Privacy Policy, please contact us.",
      link: "/contact",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-lightBackground dark:bg-background text-lightHeading dark:text-heading px-6 md:px-12 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">Privacy Policy</h1>

        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white dark:bg-gray-800/90 rounded-2xl p-6 shadow-sm border border-lightBorder dark:border-gray-700 transition-colors"
            >
              {/* Icon */}
              <div className="flex-shrink-0">{section.icon}</div>

              {/* Text */}
              <div>
                <h2 className="text-xl font-semibold mb-2 text-lightHeading dark:text-heading">
                  {section.title}
                </h2>
                <p className="text-sm text-lightMutedText dark:text-mutedText leading-relaxed">
                  {section.text}{" "}
                  {section.link && (
                    <a href={section.link} className="text-lightCta dark:text-cta underline">
                      Click here
                    </a>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
