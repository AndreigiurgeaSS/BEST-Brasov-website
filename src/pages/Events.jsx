import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Globe, Users } from "lucide-react";
import { externalEvents, internalEvents } from "../data/eventsData";

const SingleItemCarousel = ({ events, showButton = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    if (!events || events.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 11000); 
    
    return () => clearInterval(timer);
  }, [events, currentIndex]); 

  if (!events || events.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50; 
    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto group">
      <div 
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-2xl dark:shadow-rose-900/10 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row min-h-[450px] transition-colors duration-300"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Imagine */}
        <div className="w-full md:w-5/12 min-h-[250px] md:min-h-auto bg-gradient-to-br from-[#8b1832] to-[#5a0f20] dark:from-[#5a0f20] dark:to-[#2a0610] p-8 md:p-12 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full flex justify-center"
            >
              <img 
                src={events[currentIndex].image} 
                alt={events[currentIndex].title} 
                className="max-h-48 md:max-h-64 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Conținut & Controale */}
        <div className="w-full md:w-7/12 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-grow flex flex-col justify-center"
            >
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">
                {events[currentIndex].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8 transition-colors">
                {events[currentIndex].desc}
              </p>
              
              {showButton && events[currentIndex].link && (
                <div>
                  <a 
                    href={events[currentIndex].link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-[#8b1832] dark:bg-rose-600 hover:bg-rose-900 dark:hover:bg-rose-500 px-7 py-3.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg group/btn"
                  >
                    More Details 
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Butoanele de Next/Prev - Ascunse pe mobil */}
          <div className="hidden md:flex absolute bottom-8 right-8 items-center gap-3 z-20">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-gray-700 hover:text-[#8b1832] dark:hover:text-rose-400 transition-all focus:outline-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-gray-700 hover:text-[#8b1832] dark:hover:text-rose-400 transition-all focus:outline-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bulinele indicatoare - Rămân vizibile pe mobil */}
          <div className="absolute bottom-8 md:bottom-10 left-8 md:left-12 flex items-center gap-2 z-20">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 h-2 rounded-full ${
                  index === currentIndex 
                    ? "bg-[#8b1832] dark:bg-rose-500 w-8" 
                    : "bg-gray-200 dark:bg-gray-700 w-2 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

const Events = () => {
  
  useEffect(() => {
    document.title = "Events | BEST Brașov";
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl mb-6 tracking-tight transition-colors"
          >
            Explore Our <span className="text-[#8b1832] dark:text-rose-500">Events</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            We organize events to build bridges between students, universities, and companies. 
            Discover what's coming up next!
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-[#8b1832] dark:text-rose-500 transition-colors">
              <Globe size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Public Events</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Open to all students.</p>
            </div>
          </div>
          <SingleItemCarousel events={externalEvents} showButton={true} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-[#8b1832] dark:text-rose-500 transition-colors">
              <Users size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Internal Events</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Exclusive for active BEST members.</p>
            </div>
          </div>
          <SingleItemCarousel events={internalEvents} showButton={false} />
        </motion.div>

      </div>
    </div>
  );
};

export default Events;