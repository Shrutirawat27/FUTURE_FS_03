import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { dark } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors
        ${dark ? "bg-background text-heading" : "bg-lightBackground text-lightHeading"}`}
    >
      <Navbar />
      <main className="flex-1 p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
