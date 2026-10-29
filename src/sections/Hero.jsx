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
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#200303] dark:to-[#110101] pt-24 pb-20 overflow-hidden transition-colors duration-300"
    >
      {/* Architectural Grid cu Radial Mask */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#4F002810_1px,transparent_1px),linear-gradient(to_bottom,#4F002810_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_60%,transparent_100%)] pointer-events-none"
      />

      {/* Animated Technical Orbital Rings in Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.22, 0.35, 0.22] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[340px] h-[340px] sm:w-[580px] sm:h-[580px] rounded-full bg-gradient-to-tr from-[#4F0028]/25 via-[#8b1832]/15 to-transparent dark:from-[#4F0028]/50 dark:via-[#6e0d25]/25 dark:to-transparent blur-3xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute w-[480px] h-[480px] sm:w-[760px] sm:h-[760px] rounded-full border border-[#4F0028]/10 dark:border-white/[0.06]"
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#4F0028]/40 dark:bg-rose-400/50 shadow-[0_0_12px_#4F0028]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#4F0028]/25 dark:bg-white/30" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[350px] h-[350px] sm:w-[560px] sm:h-[560px] rounded-full border border-dashed border-[#4F0028]/15 dark:border-rose-300/10"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute w-[240px] h-[240px] sm:w-[390px] sm:h-[390px] rounded-full border border-[#4F0028]/10 dark:border-white/[0.04]"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tight leading-none transition-colors duration-300"
        >
          {t("hero.titleStart")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F0028] via-[#7a0b3b] to-[#a11d3a] dark:from-rose-200 dark:via-rose-400 dark:to-[#c83e5b]">
            {t("hero.titleHighlight")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-2xl text-[#4F0028] dark:text-rose-200/90 font-bold mt-4 tracking-wide transition-colors duration-300"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 sm:mt-5 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed transition-colors duration-300"
        >
          {t("hero.description")}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center items-center"
        >
          <Link
            to="/events"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#4F0028] hover:bg-[#3a001d] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#4F0028]/25 hover:shadow-[#4F0028]/40 hover:-translate-y-0.5 text-center"
          >
            <span>{t("hero.exploreBtn")}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/join#contact"
            className="w-full sm:w-auto bg-white/90 dark:bg-[#1a0303]/80 backdrop-blur-md border border-gray-200 dark:border-white/15 text-gray-800 dark:text-gray-100 font-bold px-8 py-3.5 rounded-full hover:border-[#4F0028]/40 dark:hover:bg-[#2a0606] transition-all text-center shadow-sm hover:-translate-y-0.5"
          >
            {t("hero.contactBtn")}
          </Link>
        </motion.div>

        {/* Key Figures Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 pt-6 border-t border-gray-200/80 dark:border-white/10 max-w-lg mx-auto grid grid-cols-3 gap-4"
        >
          <div>
            <p className="text-xl sm:text-2xl font-black text-[#4F0028] dark:text-white">1997</p>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-0.5">
              {t("hero.stats.founded")}
            </p>
          </div>
          <div className="border-x border-gray-200/80 dark:border-white/10 px-2">
            <p className="text-xl sm:text-2xl font-black text-[#4F0028] dark:text-white">85+</p>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-0.5">
              {t("hero.stats.universities")}
            </p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-[#4F0028] dark:text-white">30</p>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-0.5">
              {t("hero.stats.countries")}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator — mereu vizibil în partea de jos a ecranului */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group z-20"
      >
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-300 mb-1 group-hover:text-[#4F0028] dark:group-hover:text-rose-300 transition-colors">
          {t("hero.scrollDown")}
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronsDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F0028] dark:text-rose-300 transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;