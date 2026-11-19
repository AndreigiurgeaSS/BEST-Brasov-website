import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

const VisionMission = () => {
  const { t, i18n } = useTranslation();
  const isRO = !!i18n.language && i18n.language.toLowerCase().startsWith("ro");

  const items = [
    {
      icon: Eye,
      label: t("visionMission.vision.label", {
        defaultValue: isRO ? "Viziunea Noastră" : "Our Vision",
      }),
      title: t("visionMission.vision.title", {
        defaultValue: "Empowered Diversity",
      }),
      desc: t("visionMission.vision.desc", {
        defaultValue: isRO
          ? "Oamenii înțeleg și respectă culturi și societăți diferite. Mediul diversității asumate îi susține pe oameni să își pună în valoare întregul potențial și să acționeze responsabil."
          : "People understand and respect different cultures and societies. The environment of empowered diversity supports people in applying their full potential and acting responsibly.",
      }),
    },
    {
      icon: Target,
      label: t("visionMission.mission.label", {
        defaultValue: isRO ? "Misiunea Noastră" : "Our Mission",
      }),
      title: t("visionMission.mission.title", {
        defaultValue: "Developing Students",
      }),
      desc: t("visionMission.mission.desc", {
        defaultValue: isRO
          ? "BEST ajută studenții să dezvolte o mentalitate internațională, să înțeleagă mai bine diverse culturi și societăți și să lucreze eficient în medii multiculturale. BEST creează oportunități de dezvoltare personală și îi sprijină pe studenți să își atingă potențialul maxim."
          : "BEST helps students to achieve an international mindset, to reach a better understanding of cultures and societies and to develop the capacity to work in culturally diverse environments. BEST creates opportunities for personal development of students and supports them in reaching their full potential.",
      }),
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Stânga: Titlu + Introducere (fără badge) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.08]">
              {t("visionMission.titleStart", {
                defaultValue: isRO ? "De ce suntem" : "Why are we",
              })}{" "}
              <span className="text-[#4F0028] dark:text-rose-400">
                {t("visionMission.titleHighlight", {
                  defaultValue: isRO ? "aici?" : "here?",
                })}
              </span>
            </h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="w-16 h-1 bg-[#4F0028] dark:bg-rose-400 mx-auto lg:mx-0 mt-5 rounded-full origin-center lg:origin-left"
            />

            <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
              {t("visionMission.subtitle", {
                defaultValue: isRO
                  ? "Două principii esențiale ne ghidează în tot ceea ce facem: construirea unei comunități diverse și incluzive și sprijinirea studenților pentru a-și atinge potențialul maxim."
                  : "Two guiding principles shape everything we do: building a diverse, inclusive community and helping students grow into their fullest potential.",
              })}
            </p>
          </motion.div>

          {/* Dreapta: 2 Carduri Orizontale Stivuite cu bară de accent laterală */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: idx * 0.12, ease: "easeOut" }}
                  className="group relative bg-white dark:bg-[#1e0406] rounded-3xl p-6 sm:p-8 border border-gray-200/90 dark:border-rose-950/70 hover:border-[#4F0028]/35 dark:hover:border-rose-500/40 shadow-lg hover:shadow-xl dark:shadow-black/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Bara verticală de accent pe stânga cardului */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-gradient-to-b from-[#4F0028] to-rose-500 dark:from-rose-400 dark:to-[#4F0028] opacity-85 group-hover:opacity-100 transition-opacity"
                  />

                  <div className="flex flex-col sm:flex-row items-start gap-5 pl-2">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-rose-50 dark:bg-[#2d0710] border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-[#4F0028] dark:text-rose-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.9} />
                    </div>

                    <div className="flex-1">
                      <span className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#4F0028] dark:text-rose-400 mb-1">
                        {item.label}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2.5">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;