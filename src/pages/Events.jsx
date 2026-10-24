import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Globe, Users, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { externalEvents, internalEvents } from "../data/eventsData";

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ── Calendar Strip cu Preview Panel ───────────────────────────────────────────
const CalendarStrip = ({ events }) => {
  const { t } = useTranslation();
  const today      = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const stripRef   = useRef(null);

  const eventMap = new Map();
  events.forEach((e) => {
    if (!e.date) return;
    const d = new Date(e.date);
    if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
      eventMap.set(d.getDate(), e);
    }
  });

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const activeEvent = activeDay ? eventMap.get(activeDay) : null;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
    setActiveDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
    setActiveDay(null);
  };

  useEffect(() => {
    if (!stripRef.current) return;
    const activeEl = stripRef.current.querySelector("[data-active='true']");
    if (activeEl) activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeDay, viewMonth]);

  useEffect(() => {
    if (!stripRef.current) return;
    const todayEl = stripRef.current.querySelector("[data-today='true']");
    if (todayEl) todayEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-20 max-w-4xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl rounded-b-none shadow-sm border border-gray-100 dark:border-gray-700 p-5 transition-colors duration-300 z-10 relative">
        <div className="flex items-center justify-between mb-4 px-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
              {t("eventsPage.calendar.title")}
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white transition-colors">
              {MONTHS[viewMonth]} {viewYear}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-[#8b1832] hover:text-white hover:border-[#8b1832] transition-all duration-200">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextMonth} className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-[#8b1832] hover:text-white hover:border-[#8b1832] transition-all duration-200">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={stripRef} className="flex gap-2.5 overflow-x-auto pb-2 px-2 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const date     = new Date(viewYear, viewMonth, day);
            const dayName  = DAYS_SHORT[date.getDay()];
            const isToday  = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
            const hasEvent = eventMap.has(day);
            const isActive = day === activeDay;

            return (
              <button
                key={day}
                data-active={isActive}
                data-today={isToday}
                onClick={() => setActiveDay(isActive ? null : day)}
                className={`flex flex-col items-center gap-1.5 min-w-[54px] px-1 py-3 rounded-[1.25rem] border flex-shrink-0 transition-all duration-300
                  ${isActive
                    ? hasEvent 
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-transparent shadow-lg shadow-blue-500/40 scale-105" 
                      : "bg-[#8b1832] border-[#8b1832] shadow-lg shadow-rose-900/30 scale-105"
                    : isToday
                      ? "border-[#8b1832]/40 bg-rose-50 dark:bg-rose-900/10"
                      : hasEvent
                        ? "border-blue-400/50 dark:border-blue-400/30 bg-blue-50/60 dark:bg-blue-900/20 hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/40 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                        : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600"
                  }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isActive ? "text-white/90" : hasEvent ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
                  {dayName}
                </span>
                <span className={`text-base font-black leading-none transition-colors ${isActive ? "text-white" : isToday ? "text-[#8b1832] dark:text-rose-400" : hasEvent ? "text-blue-700 dark:text-blue-300" : "text-gray-800 dark:text-gray-200"}`}>
                  {String(day).padStart(2, "0")}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${hasEvent ? (isActive ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.7)]") : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/80 dark:to-gray-800 border border-t-0 border-blue-100 dark:border-gray-700 rounded-b-3xl -mt-2 relative z-0"
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
              <div className="absolute top-0 right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-black text-blue-900 dark:text-white">{t(activeEvent.titleKey)}</h3>
                </div>
                <p className="text-sm text-blue-900/70 dark:text-gray-300 line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed font-medium">
                  {t(activeEvent.descKey)}
                </p>
              </div>
              {activeEvent.link && (
                <a href={activeEvent.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 group/link relative z-10">
                  {t("eventsPage.calendar.moreInfo")}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Redesigned Sleek Carousel ────────────────────────────────────────────────
const SingleItemCarousel = ({ events, showButton = true }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX]   = useState(null);
  const [touchEndX, setTouchEndX]       = useState(null);

  useEffect(() => {
    if (!events || events.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    }, 11000);
    return () => clearInterval(timer);
  }, [events, currentIndex]);

  if (!events || events.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));

  const handleTouchStart = (e) => { setTouchEndX(null); setTouchStartX(e.targetTouches[0].clientX); };
  const handleTouchMove  = (e) => setTouchEndX(e.targetTouches[0].clientX);
  const handleTouchEnd   = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50)  nextSlide();
    if (distance < -50) prevSlide();
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto group">
      <div
        className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden flex flex-col md:flex-row min-h-[400px] transition-colors duration-300 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Content Side (Left) */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative order-2 md:order-1 bg-white dark:bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex-grow flex flex-col justify-center mb-8 md:mb-4"
            >
              <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                {t(events[currentIndex].titleKey)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                {t(events[currentIndex].descKey)}
              </p>

              {showButton && events[currentIndex].link && (
                <div className="flex flex-wrap items-center gap-4">
                  <a href={events[currentIndex].link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white bg-[#8b1832] dark:bg-rose-600 hover:bg-rose-900 dark:hover:bg-rose-500 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-rose-900/20 hover:shadow-rose-900/40 hover:-translate-y-0.5 group/btn">
                    {t("eventsPage.carousel.viewDetails")}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator & Desktop Arrows Container */}
          <div className="absolute bottom-6 md:bottom-10 left-8 md:left-14 right-8 md:right-14 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-500 h-1.5 rounded-full ${index === currentIndex ? "bg-[#8b1832] dark:bg-rose-500 w-8" : "bg-gray-200 dark:bg-gray-700 w-2 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
                />
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#8b1832] hover:text-white dark:hover:bg-rose-600 transition-all shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#8b1832] hover:text-white dark:hover:bg-rose-600 transition-all shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Side (Right) - Gradient roșu */}
        <div className="w-full md:w-1/2 h-[280px] md:h-auto md:min-h-full bg-gradient-to-br from-[#8b1832] to-[#5a0f20] dark:from-[#5a0f20] dark:to-[#2a0610] p-8 flex items-center justify-center relative overflow-hidden order-1 md:order-2 border-b md:border-b-0 md:border-l border-[#8b1832]/20 dark:border-rose-900/50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/10 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 w-full h-full flex justify-center items-center"
            >
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={events[currentIndex].image}
                alt={t(events[currentIndex].titleKey)} // Adăugat și aici traducerea pentru accessibilitate
                className="max-h-[180px] md:max-h-[260px] object-contain drop-shadow-2xl"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const Events = () => {
  const { t } = useTranslation();

  useEffect(() => { document.title = t("eventsPage.pageTitle"); }, [t]);

  const allEvents = [...externalEvents, ...internalEvents];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="absolute top-0 right-10 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-6 tracking-tight"
          >
            {t("eventsPage.header.titleStart")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1832] to-rose-500">
              {t("eventsPage.header.titleHighlight")}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            {t("eventsPage.header.subtitle")}
          </motion.p>
        </div>

        <CalendarStrip events={allEvents} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-[#8b1832] dark:text-rose-400 mb-4">
              <Globe size={28} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{t("eventsPage.publicEvents.title")}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t("eventsPage.publicEvents.subtitle")}</p>
          </div>
          <SingleItemCarousel events={externalEvents} showButton={true} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-[#8b1832] dark:text-rose-400 mb-4">
              <Users size={28} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{t("eventsPage.internalEvents.title")}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t("eventsPage.internalEvents.subtitle")}</p>
          </div>
          <SingleItemCarousel events={internalEvents} showButton={false} />
        </motion.div>

      </div>
    </div>
  );
};

export default Events;