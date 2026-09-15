import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Departments from "./pages/Departments";
import Management from "./pages/Management";
import Partners from "./pages/Partners";
import FAQ from "./pages/FAQ";
import JoinUs from "./pages/JoinUs";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; 
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased flex flex-col transition-colors duration-300">
      
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
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;