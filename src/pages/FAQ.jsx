import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Plus,
  FileText,
  ArrowUpRight,
  MessageCircle,
  ChevronsUpDown,
  X,
} from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true";

const FAQItem = ({ faq, index, isOpen, toggleOpen }) => {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={`group rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? "bg-white dark:bg-[#220404] border-[#4F0028]/35 dark:border-rose-500/40 shadow-lg shadow-[#4F0028]/5"
          : "bg-white/70 dark:bg-[#1a0303]/70 border-gray-200/70 dark:border-rose-950/60 hover:bg-white dark:hover:bg-[#220404] hover:border-gray-300 dark:hover:border-rose-900/60"
      }`}
    >
      <button
        onClick={toggleOpen}
        aria-expanded={isOpen}
        className="w-full text-left px-5 sm:px-7 py-5 flex items-center gap-4 justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black tracking-wider flex-shrink-0 transition-colors duration-300 ${
              isOpen
                ? "bg-[#4F0028] text-white shadow-sm"
                : "bg-gray-100 dark:bg-[#2d0707] text-gray-500 dark:text-gray-400 group-hover:text-[#4F0028] dark:group-hover:text-rose-400"
            }`}
          >
            {num}
          </span>
          <span
            className={`font-bold text-base sm:text-lg leading-snug transition-colors duration-200 ${
              isOpen
                ? "text-[#4F0028] dark:text-rose-300"
                : "text-gray-900 dark:text-gray-100 group-hover:text-[#4F0028] dark:group-hover:text-rose-300"
            }`}
          >
            {faq.question}
          </span>
        </div>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-rose-50 dark:bg-[#320606] text-[#4F0028] dark:text-rose-300 rotate-45"
              : "bg-gray-100 dark:bg-[#2d0707] text-gray-500 dark:text-gray-400 group-hover:bg-rose-50 dark:group-hover:bg-[#320606] group-hover:text-[#4F0028] dark:group-hover:text-rose-300 rotate-0"
          }`}
        >
          <Plus size={18} strokeWidth={2.5} />
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-7 pb-6 pt-1 pl-5 sm:pl-20 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            <div className="pt-3 border-t border-gray-100 dark:border-rose-950/60">
              {faq.answer}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const [openIndices, setOpenIndices] = useState([0]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const translatedFaqs = t("faqPage.items", { returnObjects: true });
  const faqs = Array.isArray(translatedFaqs) ? translatedFaqs : [];

  useEffect(() => {
    document.title = t("faqPage.pageTitle");
  }, [t, i18n.language]);

  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFormOpen]);

  const toggleItem = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const allOpen = faqs.length > 0 && openIndices.length === faqs.length;
  const toggleAll = () => {
    setOpenIndices(allOpen ? [] : faqs.map((_, i) => i));
  };

  return (
    <>
      <div className="pt-32 pb-24 min-h-screen relative transition-colors duration-300 overflow-hidden bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-[#4F0028]/10 dark:bg-[#4F0028]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-[#4F0028]/5 dark:bg-[#4F0028]/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <motion.h1
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4"
            >
              {t("faqPage.titleStart")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F0028] to-rose-500 dark:from-rose-300 dark:to-rose-500">
                {t("faqPage.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              {t("faqPage.subtitle")}
            </motion.p>
          </div>

          <div className="flex justify-end mb-3">
            <button
              onClick={toggleAll}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-[#4F0028] dark:hover:text-rose-300 transition-colors px-3 py-1.5 rounded-xl hover:bg-white/60 dark:hover:bg-[#220404] cursor-pointer"
            >
              <ChevronsUpDown size={14} />
              {allOpen ? t("faqPage.collapseAll") : t("faqPage.expandAll")}
            </button>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndices.includes(index)}
                toggleOpen={() => toggleItem(index)}
              />
            ))}
          </div>

          {/* STILL HAVE QUESTIONS CTA CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-12 rounded-3xl bg-gradient-to-br from-[#4F0028] to-[#320606] dark:from-[#240310] dark:to-[#120101] border border-white/10 p-7 sm:p-9 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl" />

            <div className="text-center sm:text-left relative z-10">
              <h3 className="text-xl sm:text-2xl font-black mb-1.5">
                {t("faqPage.cta.title")}
              </h3>
              <p className="text-rose-100/85 dark:text-gray-300 text-sm sm:text-base max-w-md">
                {t("faqPage.cta.subtitle")}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0 relative z-10">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#4F0028] hover:bg-rose-50 font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <FileText size={16} />
                {t("faqPage.cta.formBtn")}
                <ArrowUpRight size={15} />
              </button>
              <a
                href="https://www.instagram.com/bestbrasov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all hover:-translate-y-0.5"
              >
                <MessageCircle size={16} />
                {t("faqPage.cta.instaBtn")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODAL PENTRU GOOGLE FORM */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl h-[85vh] bg-white dark:bg-[#1a0303] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 dark:border-rose-950/60"
            >
              <div className="flex items-center justify-between p-4 sm:px-6 border-b border-gray-100 dark:border-rose-950/60 bg-gray-50/80 dark:bg-[#140202]/90 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#4F0028] dark:text-rose-400">
                  <FileText size={18} />
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {t("faqPage.modal.title")}
                  </h3>
                </div>

                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 bg-gray-200/70 dark:bg-[#2d0707] rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 text-gray-600 dark:text-gray-300 hover:text-[#4F0028] dark:hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex-grow w-full relative bg-gray-50 dark:bg-[#140202]">
                <iframe
                  src={GOOGLE_FORM_URL}
                  className="w-full h-full border-0"
                  title={t("faqPage.modal.title")}
                >
                  {t("faqPage.modal.loading")}
                </iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FAQ;