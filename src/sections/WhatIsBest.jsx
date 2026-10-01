import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const WhatIsBest = () => {
  // Referința pentru a știi exact unde se află timeline-ul pe ecran
  const containerRef = useRef(null);
  
  // Urmărim progresul scroll-ului relativ la acest container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"] // Animația pornește când top-ul atinge 60% din ecran și se termină la final
  });

  // Transformăm progresul (de la 0 la 1) într-o înălțime (de la 0% la 100%)
  const heightProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#8b1832]/5 dark:bg-rose-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-[#8b1832]/5 dark:bg-rose-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl transition-colors"
          >
            What is <span className="text-[#8b1832] dark:text-rose-500">BEST?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-1 bg-[#8b1832] dark:bg-rose-500 mx-auto mt-5 rounded-full"
          />
        </div>

        {/* Timeline Container - Aici atașăm ref-ul pentru scroll */}
        <div className="relative" ref={containerRef}>

          {/* --- SCROLL-LINKED SPINE --- */}
          {/* Șina de fundal (inactivă) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800 -translate-x-1/2 hidden md:block" />
          
          {/* Șina activă care se umple la scroll */}
          <motion.div 
            style={{ height: heightProgress }}
            className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#8b1832] to-rose-500 -translate-x-1/2 hidden md:block z-20 origin-top"
          >
            {/* Punctul care se plimbă mereu la capătul de jos al liniei */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-[3px] border-[#8b1832] dark:border-rose-500 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.6)]" />
          </motion.div>
          {/* --------------------------- */}

          {/* ── Block 1: logo left, text right ── */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-0 pb-20 md:pb-28">

            {/* Am înlocuit punctul static vechi cu un div gol doar pentru a păstra grid-ul corect */}
            <div className="hidden md:block"></div>

            {/* Left: logo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:order-first order-last md:pr-10 flex flex-col items-end gap-4 w-full"
            >
              <div className="bg-white dark:bg-white rounded-2xl border border-gray-100 p-8 flex items-center justify-center w-full max-w-md shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <img
                  src="/images/logos/BESTBV-Colorat-1.png"
                  alt="BEST Brașov Logo"
                  className="max-h-36 w-auto"
                />
              </div>
              <p className="text-sm italic text-gray-400 dark:text-gray-500 text-right border-r-2 border-[#8b1832]/20 pr-4 leading-relaxed max-w-md">
                Developing students since 1997 — at Transilvania University and beyond.
              </p>
            </motion.div>

            {/* Right: text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:pl-10 flex flex-col gap-4 mb-10 md:mb-0"
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-[#8b1832] dark:text-rose-500 border border-[#8b1832]/30 dark:border-rose-500/30 rounded-full px-3 py-1 w-fit">
                Local · 1997
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-snug">
                We started here,<br />
                in <span className="text-[#8b1832] dark:text-rose-500">Brașov.</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                Established in 1997, BEST Brașov bridges the gap between students, academia, and the corporate world at Transilvania University. Our focus is the professional and personal development of every member.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                We organize tailored events—workshops, academic courses, and company presentations—designed to meet the real-world needs of students.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                Beyond academics, we build a tightly-knit community through dynamic social activities and teambuildings.
              </p>
            </motion.div>

          </div>

          {/* ── Block 2: text left, logo right ── */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-0">

            {/* Spațiu gol pentru track */}
            <div className="hidden md:block"></div>

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:order-first order-last md:pr-10 flex flex-col gap-4"
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-[#8b1832] dark:text-rose-500 border border-[#8b1832]/30 dark:border-rose-500/30 rounded-full px-3 py-1 w-fit">
                European · 1989
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-snug">
                But the story is<br />
                <span className="text-[#8b1832] dark:text-rose-500">much bigger.</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                BEST (Board of European Students of Technology) was founded in 1989 and operates across 85 universities in 30 countries. We connect tech-passionate students on an international scale.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                Through our vast network, we facilitate academic exchanges, seasonal courses, and unique networking opportunities with top professionals.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                We drive innovation by organizing technical competitions (like EBEC), trainings, and workshops spanning engineering, IT, robotics, and design.
              </p>
            </motion.div>

            {/* Right: logo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:pl-10 flex flex-col items-start gap-3 mb-10 md:mb-0 w-full"
            >
              <div className="bg-white dark:bg-white rounded-2xl border border-gray-100 p-8 flex items-center justify-center w-full max-w-md shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <img
                  src="/images/logos/BEST_signature_long.png"
                  alt="BEST International Logo"
                  className="max-h-36 w-auto"
                />
              </div>
              
              <a 
                href="https://best.eu.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full max-w-md bg-[#8b1832] hover:bg-rose-600 transition-colors duration-300 rounded-full p-2 pl-6 shadow-md"
              >
                <span className="text-white font-bold uppercase tracking-wider text-sm transition-transform duration-300 group-hover:-translate-x-1">
                  Visit best.eu.org
                </span>
                <div className="bg-white w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                  <ArrowRight size={18} className="text-[#8b1832]" />
                </div>
              </a>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsBest;