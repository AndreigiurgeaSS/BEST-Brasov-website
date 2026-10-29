import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Megaphone, UserPlus, RotateCw } from "lucide-react";
import { useTranslation } from "react-i18next";

const deptMeta = [
  { icon: <UserPlus size={32} />, image: "/images/departments/hr-photo.jpg" },
  { icon: <Briefcase size={32} />, image: "/images/departments/fr-photo.jpg" },
  { icon: <Megaphone size={32} />, image: "/images/departments/pr-photo.jpg" },
  { icon: <Code size={32} />, image: "/images/departments/it-photo.jpg" },
];

const DepartmentCard = ({ dept, index, t }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full h-[600px] sm:h-[650px] lg:h-[600px] cursor-pointer group perspective-1000"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* --- FAȚA CARDULUI (FRONT) --- */}
        <div
          className="absolute inset-0 w-full h-full bg-white/90 dark:bg-[#1e0404]/90 backdrop-blur-md rounded-[2.5rem] border border-gray-100 dark:border-rose-950/60 shadow-xl overflow-hidden flex flex-col group-hover:border-[#4F0028]/30 dark:group-hover:border-rose-500/40 group-hover:shadow-[#4F0028]/15 transition-colors duration-500"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#4F0028] to-rose-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-10" />

          <div className="p-8 flex-grow flex flex-col h-full">
            <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#140202] relative border border-gray-200 dark:border-rose-950/50 flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm font-medium">
                [ {t("departmentsPage.imagePlaceholder")} {dept.short} ]
              </div>
              <img
                src={dept.image}
                alt={`${dept.name} Department`}
                className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-[#2a0505] border border-rose-100 dark:border-rose-900/40 flex items-center justify-center text-[#4F0028] dark:text-rose-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm flex-shrink-0">
                {dept.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {dept.name}
                  </h3>
                  <span className="bg-gray-100 dark:bg-[#2d0707] text-gray-600 dark:text-rose-200 text-xs font-bold px-2 py-1 rounded-md">
                    {dept.short}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic overflow-hidden flex-grow relative line-clamp-[7]">
              "{dept.motto}"
            </p>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-rose-950/50 flex items-center justify-between text-[#4F0028] dark:text-rose-400 font-bold flex-shrink-0">
              <span className="text-sm tracking-wide uppercase">
                {t("departmentsPage.clickToFlip")}
              </span>
              <RotateCw
                size={20}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* --- SPATELE CARDULUI (BACK) --- */}
        <div
          className="absolute inset-0 w-full h-full bg-white dark:bg-[#1e0404] rounded-[2.5rem] border border-[#4F0028]/25 dark:border-rose-900/50 shadow-2xl overflow-hidden flex flex-col p-8 lg:p-12 text-center items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] scale-[5] text-[#4F0028] dark:text-rose-500 pointer-events-none z-0">
            {dept.icon}
          </div>

          <div className="relative z-10 flex flex-col items-center h-full justify-center">
            <div className="w-20 h-20 rounded-3xl bg-[#4F0028] text-white flex items-center justify-center mb-8 shadow-lg transform rotate-3">
              {dept.icon}
            </div>

            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6">
              {t("departmentsPage.whatWeDo")}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium max-w-sm">
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
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#4F0028]/10 dark:bg-[#4F0028]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4F0028]/10 dark:bg-[#4F0028]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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
            transition={{ delay: 0.2 }}
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