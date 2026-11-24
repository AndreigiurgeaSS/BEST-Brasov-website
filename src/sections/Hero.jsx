import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronsDown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

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
    <section
      id="home"
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between bg-transparent pt-[5.25rem] sm:pt-24 lg:pt-28 pb-5 sm:pb-7 lg:pb-8 overflow-hidden"
    >
      {/* Architectural Grid cu Radial Mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#4F002810_1px,transparent_1px),linear-gradient(to_bottom,#4F002810_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none"
      />

      {/* Orbital Rings pur CSS (GPU-only, se opresc automat pe Eco Mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute w-[340px] h-[340px] sm:w-[640px] sm:h-[640px] rounded-full opacity-80 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(79, 0, 40, 0.28) 0%, rgba(139, 24, 50, 0.1) 42%, transparent 70%)",
          }}
        />

        <div className="animate-spin-70s absolute w-[440px] h-[440px] sm:w-[760px] sm:h-[760px] rounded-full border border-[#4F0028]/10 dark:border-white/[0.06] will-change-transform">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#4F0028]/45 dark:bg-rose-400/55" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#4F0028]/25 dark:bg-white/30" />
        </div>

        <div className="animate-spin-50s-rev absolute w-[320px] h-[320px] sm:w-[560px] sm:h-[560px] rounded-full border border-dashed border-[#4F0028]/15 dark:border-rose-300/10 will-change-transform" />

        <div className="animate-spin-35s absolute w-[220px] h-[220px] sm:w-[390px] sm:h-[390px] rounded-full border border-[#4F0028]/10 dark:border-white/[0.04] will-change-transform" />
      </div>

      {/* Main Content — vine de sus, ca restul paginilor */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10 w-full my-auto py-3 sm:py-6">
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="text-[clamp(2.55rem,11.5vw,5.75rem)] font-black text-gray-900 dark:text-white tracking-tight leading-[1.08] pb-1 transition-colors duration-300"
        >
          {t("hero.titleStart")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F0028] via-[#7a0b3b] to-[#a11d3a] dark:from-rose-200 dark:via-rose-400 dark:to-[#c83e5b]">
            {t("hero.titleHighlight")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="text-base sm:text-2xl text-[#4F0028] dark:text-rose-200/90 font-bold mt-3 sm:mt-5 tracking-wide transition-colors duration-300"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-3 sm:mt-5 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-[13.5px] sm:text-lg leading-relaxed transition-colors duration-300"
        >
          {t("hero.description")}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.26 }}
          className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 justify-center items-center max-w-md sm:max-w-none mx-auto"
        >
          <Link
            to="/events"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#4F0028] hover:bg-[#3a001d] text-white font-bold text-sm sm:text-base px-8 py-3 sm:py-3.5 rounded-full transition-all shadow-lg shadow-[#4F0028]/25 hover:shadow-[#4F0028]/40 hover:-translate-y-0.5 text-center"
          >
            <span>{t("hero.exploreBtn")}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/join#contact"
            className="w-full sm:w-auto bg-white/95 dark:bg-[#1a0303]/90 lg:backdrop-blur-md border border-gray-200 dark:border-white/15 text-gray-800 dark:text-gray-100 font-bold text-sm sm:text-base px-8 py-3 sm:py-3.5 rounded-full hover:border-[#4F0028]/40 dark:hover:bg-[#2a0606] transition-all text-center shadow-sm hover:-translate-y-0.5"
          >
            {t("hero.contactBtn")}
          </Link>
        </motion.div>

        {/* Key Figures Bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.34 }}
          className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200/80 dark:border-white/10 max-w-lg mx-auto grid grid-cols-3 gap-2 sm:gap-4"
        >
          <div>
            <p className="text-lg sm:text-2xl font-black text-[#4F0028] dark:text-white">1997</p>
            <p className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
              {t("hero.stats.founded")}
            </p>
          </div>
          <div className="border-x border-gray-200/80 dark:border-white/10 px-1.5 sm:px-2">
            <p className="text-lg sm:text-2xl font-black text-[#4F0028] dark:text-white">85+</p>
            <p className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
              {t("hero.stats.universities")}
            </p>
          </div>
          <div>
            <p className="text-lg sm:text-2xl font-black text-[#4F0028] dark:text-white">30</p>
            <p className="text-[9.5px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
              {t("hero.stats.countries")}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator în flux normal */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={handleScrollDown}
        className="relative z-20 mt-3 sm:mt-4 shrink-0 flex flex-col items-center cursor-pointer group"
      >
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase text-gray-500 dark:text-gray-300 mb-0.5 group-hover:text-[#4F0028] dark:group-hover:text-rose-300 transition-colors">
          {t("hero.scrollDown")}
        </span>
        <span className="animate-float-y inline-block">
          <ChevronsDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F0028] dark:text-rose-300 transition-colors" />
        </span>
      </motion.button>
    </section>
  );
};

export default Hero;