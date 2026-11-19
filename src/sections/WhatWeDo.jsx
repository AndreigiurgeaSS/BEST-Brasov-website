import { motion } from "framer-motion";
import { BookOpen, Briefcase, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

const PushPin = () => (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center drop-shadow-md pointer-events-none">
    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-[#4F0028] border-b-2 border-[#320606] relative z-10 shadow-sm">
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full" />
    </div>
    <div className="w-1 h-2.5 bg-black/25 -mt-0.5 rounded-full" />
  </div>
);

const pillarIcons = [BookOpen, Briefcase, Lightbulb];
const pillarTilts = [-1.2, 1.2, -1];

const WhatWeDo = () => {
  const { t } = useTranslation();

  const translatedPillars = t("whatWeDo.pillars", { returnObjects: true });
  const pillars = (Array.isArray(translatedPillars) ? translatedPillars : []).map(
    (item, idx) => {
      const IconComponent = pillarIcons[idx % pillarIcons.length];
      return {
        ...item,
        icon: <IconComponent className="w-7 h-7 text-[#4F0028] dark:text-rose-400" />,
        tilt: pillarTilts[idx % pillarTilts.length],
      };
    }
  );

  return (
    <section
      id="what-we-do"
      className="scroll-mt-24 py-20 sm:py-28 bg-transparent relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            {t("whatWeDo.title")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="w-16 h-1 bg-[#4F0028] dark:bg-rose-400 mx-auto mt-5 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300"
          >
            {t("whatWeDo.subtitle")}
          </motion.p>
        </div>

        {/* Grid 3 Carduri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{
                opacity: 1,
                y: index === 1 ? 12 : 0,
                rotate: pillar.tilt,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                rotate: 0,
                scale: 1.02,
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              style={{ willChange: "transform, opacity" }}
              className="relative h-full bg-white dark:bg-[#1e0404] rounded-2xl p-7 sm:p-9 border border-gray-200/90 dark:border-rose-950/60 shadow-lg hover:shadow-2xl dark:shadow-black/40 flex flex-col justify-start transform-gpu"
            >
              <PushPin />

              <div className="bg-rose-50 dark:bg-[#2d0707] w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 border border-rose-100 dark:border-rose-900/40 shrink-0">
                {pillar.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                {pillar.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;  