import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { EcoModeProvider } from "./context/EcoModeContext";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Departments from "./pages/Departments";
import Management from "./pages/Management";
import Partners from "./pages/Partners";
import FAQ from "./pages/FAQ";
import JoinUs from "./pages/JoinUs";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <EcoModeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-[#140202] text-gray-900 dark:text-gray-100 antialiased flex flex-col transition-colors duration-300">
        <ScrollToTop />

        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/management" element={<Management />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/join" element={<JoinUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </EcoModeProvider>
  );
}

export default App;