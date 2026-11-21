import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Megaphone, UserPlus, RotateCw } from "lucide-react";
import { useTranslation } from "react-i18next";

const deptMeta = [
  { icon: <UserPlus size={28} />, image: "/images/departments/hr-photo.jpg" },
  { icon: <Briefcase size={28} />, image: "/images/departments/fr-photo.jpg" },
  { icon: <Megaphone size={28} />, image: "/images/departments/pr-photo.jpg" },
  { icon: <Code size={28} />, image: "/images/departments/it-photo.jpg" },
];

const DepartmentCard = ({ dept, index, t }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative w-full h-[520px] sm:h-[550px] cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 210, damping: 22 }}
      >
        {/* FAȚA CARDULUI */}
        <div
          className="absolute inset-0 w-full h-full bg-white dark:bg-[#1e0404] rounded-[2.5rem] border border-gray-100 dark:border-rose-950/60 shadow-xl overflow-hidden flex flex-col group-hover:border-[#4F0028]/30 dark:group-hover:border-rose-500/40 transition-colors duration-300"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="w-full h-64 sm:h-72 relative overflow-hidden bg-gray-100 dark:bg-[#140202] flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm font-medium pb-6">
              [ {t("departmentsPage.imagePlaceholder")} {dept.short} ]
            </div>

            <img
              src={dept.image}
              alt={`${dept.name} Department`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center relative z-0 group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/55 to-transparent dark:from-[#1e0404] dark:via-[#1e0404]/60 dark:to-transparent z-10" />
          </div>

          <div className="px-6 pb-6 pt-3 sm:px-8 sm:pb-7 sm:pt-3 flex-grow flex flex-col justify-between relative z-20">
            <div>
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-[#2a0505] border border-rose-100 dark:border-rose-900/40 flex items-center justify-center text-[#4F0028] dark:text-rose-400 group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0">
                  {dept.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                  {dept.name}
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-medium italic line-clamp-4">
                "{dept.motto}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-rose-950/50 flex items-center justify-between text-[#4F0028] dark:text-rose-400 font-bold">
              <span className="text-xs uppercase tracking-wider">
                {t("departmentsPage.clickToFlip")}
              </span>
              <RotateCw
                size={18}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* SPATELE CARDULUI */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-rose-50/40 dark:from-[#1e0404] dark:to-[#120101] rounded-[2.5rem] border border-[#4F0028]/25 dark:border-rose-900/50 shadow-2xl overflow-hidden flex flex-col p-8 sm:p-10 text-center items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] scale-[5] text-[#4F0028] dark:text-rose-500 pointer-events-none z-0">
            {dept.icon}
          </div>

          <div className="relative z-10 flex flex-col items-center h-full justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#4F0028] text-white flex items-center justify-center mb-6 shadow-lg transform rotate-3">
              {dept.icon}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4">
              {t("departmentsPage.whatWeDo")}
            </h3>

            <div className="w-12 h-1 bg-[#4F0028] dark:bg-rose-400 mb-6 rounded-full" />

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base font-medium max-w-sm">
              {dept.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Departments = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("departmentsPage.pageTitle");
  }, [t, i18n.language]);

  const translatedDepts = t("departmentsPage.items", { returnObjects: true });
  const departments = (Array.isArray(translatedDepts) ? translatedDepts : []).map(
    (item, idx) => ({
      ...item,
      icon: deptMeta[idx % deptMeta.length].icon,
      image: deptMeta[idx % deptMeta.length].image,
    })
  );

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300 relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] left-[-10%] w-[440px] h-[440px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(79,0,40,0.16) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[440px] h-[440px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(79,0,40,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6 transition-colors"
          >
            {t("departmentsPage.titleStart")}{" "}
            <span className="text-[#4F0028] dark:text-rose-400">
              {t("departmentsPage.titleHighlight")}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="text-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            {t("departmentsPage.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          {departments.map((dept, index) => (
            <DepartmentCard key={index} dept={dept} index={index} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;