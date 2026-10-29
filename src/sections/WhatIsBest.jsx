import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhatIsBest = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:to-[#180202] transition-colors duration-300 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#4F0028]/10 dark:bg-[#4F0028]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-[#4F0028]/10 dark:bg-[#4F0028]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-20 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl transition-colors"
          >
            {t("whatIsBest.titleStart")}{" "}
            <span className="text-[#4F0028] dark:text-rose-400">
              {t("whatIsBest.titleHighlight")}
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-1 bg-[#4F0028] dark:bg-rose-400 mx-auto mt-5 rounded-full"
          />
        </div>

        {/* ── Block 1: BEST Brașov ── */}
        <div className="relative flex flex-col lg:flex-row items-center mb-20 lg:mb-24 justify-center">
          {/* Imagine (Spate - Alb) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative z-10 flex justify-end"
          >
            <div className="bg-white rounded-[2rem] p-10 sm:p-14 lg:pr-20 shadow-xl border border-gray-100 flex items-center justify-center min-h-[300px] w-full max-w-lg hover:shadow-2xl transition-shadow duration-500 group">
              <img
                src="/images/logos/BESTBV-Colorat-1.png"
                alt="BEST Brașov Logo"
                className="w-full max-w-[240px] object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

          {/* Text Panel Overlapping (Burgundy pe Light Mode, Burgundy-Negru pe Dark Mode) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative z-20 -mt-8 lg:mt-0 lg:-ml-12 flex justify-start"
          >
            <div className="bg-gradient-to-br from-[#4F0028] to-[#320606] dark:from-[#1f030c] dark:to-[#120101] rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(79,0,40,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-[#4F0028]/40 dark:border-rose-900/30 backdrop-blur-xl w-full max-w-lg">
              <h3 className="text-5xl sm:text-6xl font-black text-rose-300 dark:text-rose-400 mb-2 tracking-tighter">
                {t("whatIsBest.local.year")}
              </h3>
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {t("whatIsBest.local.heading")}
              </h4>
              <div className="space-y-4 text-rose-50/90 dark:text-gray-300 text-sm sm:text-[15px] leading-relaxed font-medium">
                <p>{t("whatIsBest.local.p1")}</p>
                <p>{t("whatIsBest.local.p2")}</p>
                <p>{t("whatIsBest.local.p3")}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Block 2: BEST International ── */}
        <div className="relative flex flex-col lg:flex-row-reverse items-center justify-center">
          {/* Imagine & Buton (Spate - Alb) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative z-10 flex justify-start"
          >
            <div className="bg-white rounded-[2rem] p-10 sm:p-14 lg:pl-20 shadow-xl border border-gray-100 flex flex-col items-center justify-center min-h-[300px] w-full max-w-lg hover:shadow-2xl transition-shadow duration-500 group">
              <img
                src="/images/logos/BEST_signature_long.png"
                alt="BEST International Logo"
                className="w-full max-w-[260px] object-contain mb-8 group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <a
                href="https://best.eu.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center justify-between w-full max-w-[240px] bg-[#4F0028] hover:bg-[#320606] transition-colors duration-300 rounded-full p-1.5 pl-5 shadow-md"
              >
                <span className="text-white font-bold uppercase tracking-wider text-[11px] sm:text-xs transition-transform duration-300 group-hover/btn:-translate-x-1">
                  {t("whatIsBest.international.visitBtn")}
                </span>
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-sm flex-shrink-0">
                  <ArrowRight size={16} className="text-[#4F0028]" />
                </div>
              </a>
            </div>
          </motion.div>

          {/* Text Panel Overlapping (Burgundy pe Light Mode, Burgundy-Negru pe Dark Mode) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative z-20 -mt-8 lg:mt-0 lg:-mr-12 flex justify-end"
          >
            <div className="bg-gradient-to-br from-[#4F0028] to-[#320606] dark:from-[#1f030c] dark:to-[#120101] rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(79,0,40,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-[#4F0028]/40 dark:border-rose-900/30 backdrop-blur-xl w-full max-w-lg">
              <h3 className="text-5xl sm:text-6xl font-black text-rose-300 dark:text-rose-400 mb-2 tracking-tighter">
                {t("whatIsBest.international.year")}
              </h3>
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {t("whatIsBest.international.heading")}
              </h4>
              <div className="space-y-4 text-rose-50/90 dark:text-gray-300 text-sm sm:text-[15px] leading-relaxed font-medium">
                <p>{t("whatIsBest.international.p1")}</p>
                <p>{t("whatIsBest.international.p2")}</p>
                <p>{t("whatIsBest.international.p3")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsBest;