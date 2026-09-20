import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const WhatIsBest = () => {
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

        {/* Timeline */}
        <div className="relative">

          {/* Vertical spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8b1832] via-[#8b1832]/50 to-transparent -translate-x-1/2 hidden md:block" />

          {/* ── Block 1: logo left, text right ── */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-0 pb-20 md:pb-28">

            {/* Dot */}
            <div className="hidden md:flex justify-center pt-2 items-start">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-3.5 h-3.5 rounded-full bg-[#8b1832] ring-2 ring-[#8b1832]/30 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900"
              />
            </div>

            {/* Left: logo - Acum mai mare (max-w-md) */}
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

            {/* Right: text - Scurtat pentru impact */}
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

            {/* Dot */}
            <div className="hidden md:flex justify-center pt-2 items-start">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-3.5 h-3.5 rounded-full bg-[#8b1832] ring-2 ring-[#8b1832]/30 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900"
              />
            </div>

            {/* Left: text - Scurtat pentru impact */}
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

            {/* Right: logo & ALIGNED KINETIC ARROW BUTTON - Acum mai mare (max-w-md) */}
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