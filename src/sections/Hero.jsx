import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronsDown } from "lucide-react";

const Hero = () => {
  const handleScrollDown = () => {
    const targetSection = document.getElementById("what-we-do");
    if (targetSection) {
      window.isAutoScrolling = true;

      targetSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        window.isAutoScrolling = false;
      }, 1000);
    }
  };


  return (
    <section id="home" className="relative w-full min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-32 pb-32 overflow-hidden transition-colors duration-300">
      
      {/* Subtle Background Decorative Circles */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-rose-200 dark:bg-rose-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-blob transition-colors duration-300" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-56 h-56 sm:w-80 sm:h-80 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-30 animate-blob animation-delay-2000 transition-colors duration-300" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-none transition-colors duration-300"
        >
          BEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600 dark:from-rose-500 dark:to-indigo-400">Brașov</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium mt-4 tracking-wide transition-colors duration-300"
        >
          Developing students since 1997.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed transition-colors duration-300"
        >
          BEST Brasov is a non-governmental organization, established in 1997, intended for Transilvania University students. It deals both with facilitating communication between the University, students and companies, but also with the professional and personal development of the organization’s members and students.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            to="/events"
            className="w-full sm:w-auto bg-rose-600 dark:bg-rose-700 text-white font-medium px-8 py-3.5 rounded-full hover:bg-rose-700 dark:hover:bg-rose-600 transition-all shadow-md hover:shadow-lg text-center"
          >
            Explore Events
          </Link>
          <Link 
            to="/join#contact" 
            className="w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium px-8 py-3.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-center shadow-sm"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* --- SCROLL DOWN INDICATOR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }} 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group z-20"
      >
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-500 transition-colors">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronsDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500 group-hover:text-rose-600 dark:group-hover:text-rose-500 transition-colors" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;