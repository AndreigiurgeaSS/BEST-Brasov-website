import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Plus,
  Sparkles,
  FileText,
  ArrowUpRight,
  MessageCircle,
  ChevronsUpDown,
  X,
} from "lucide-react";

// ── Schimbă aici cu link-ul tău de Google Form ──────────────────────────────
// Important: Adaugă ?embedded=true la finalul link-ului ca să arate bine în fereastră
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true";

const faqs = [
  {
    question: "What is BEST Brașov?",
    answer:
      "BEST (Board of European Students of Technology) is a non-profit, non-political organization. We help students develop their skills, travel, and connect with companies across Europe.",
  },
  {
    question: "Who can join the organization?",
    answer:
      "Any student currently enrolled at Transilvania University of Brașov can apply during our recruitment periods (usually in Autumn and Spring).",
  },
  {
    question: "Are the courses and travels really free?",
    answer:
      "Mostly, yes! For BEST courses, accommodation, food, and the academic program are covered by the host local group. You usually only pay a small fee and your travel expenses.",
  },
  {
    question: "Do I need to be an IT/Computer Science student?",
    answer:
      "Absolutely not! While we focus on technology, our members come from all faculties. We need people skilled in HR, PR, Design, Marketing, Logistics, and more.",
  },
  {
    question: "How much time does it take to be a member?",
    answer:
      "It's entirely up to you. You can dedicate a few hours a week or get heavily involved in organizing massive events. Flexibility is key, as we are all full-time students.",
  },
];

// ── Lag-Free FAQ Item (Hardware-Accelerated CSS Grid Transition) ─────────────
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
          ? "bg-white dark:bg-[#151c2c] border-[#8b1832]/30 dark:border-rose-500/40 shadow-lg shadow-rose-900/5"
          : "bg-white/70 dark:bg-gray-800/50 border-gray-200/70 dark:border-gray-700/60 hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
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
                ? "bg-[#8b1832] dark:bg-rose-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700/70 text-gray-400 dark:text-gray-400 group-hover:text-[#8b1832] dark:group-hover:text-rose-400"
            }`}
          >
            {num}
          </span>
          <span
            className={`font-bold text-base sm:text-lg leading-snug transition-colors duration-200 ${
              isOpen
                ? "text-[#8b1832] dark:text-rose-400"
                : "text-gray-900 dark:text-gray-100 group-hover:text-[#8b1832] dark:group-hover:text-rose-400"
            }`}
          >
            {faq.question}
          </span>
        </div>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-rose-50 dark:bg-rose-950/60 text-[#8b1832] dark:text-rose-400 rotate-45"
              : "bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 group-hover:bg-rose-50 dark:group-hover:bg-gray-700 group-hover:text-[#8b1832] dark:group-hover:text-rose-400 rotate-0"
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
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60">
              {faq.answer}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main FAQ Page ─────────────────────────────────────────────────────────────
const FAQ = () => {
  const [openIndices, setOpenIndices] = useState([0]);
  const [isFormOpen, setIsFormOpen] = useState(false); // Starea pentru Modal

  useEffect(() => {
    document.title = "FAQ | BEST Brașov";
  }, []);

  // Blochează scroll-ul paginii când modalul este deschis
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

  const allOpen = openIndices.length === faqs.length;
  const toggleAll = () => {
    setOpenIndices(allOpen ? [] : faqs.map((_, i) => i));
  };

  return (
    <>
      <div className="pt-32 pb-24 min-h-screen relative transition-colors duration-300 overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Subtle Engineering Grid + Ambient Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-[#8b1832]/10 dark:bg-rose-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-indigo-900/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HEADER */}
          <div className="text-center mb-10">
            
            <motion.h1
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4"
            >
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1832] to-rose-500">
                Questions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Everything you need to know about joining our local group, traveling
              across Europe, and developing yourself.
            </motion.p>
          </div>

          {/* Top Control Bar: Expand / Collapse All */}
          <div className="flex justify-end mb-3">
            <button
              onClick={toggleAll}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-[#8b1832] dark:hover:text-rose-400 transition-colors px-3 py-1.5 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 cursor-pointer"
            >
              <ChevronsUpDown size={14} />
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>

          {/* ACCORDION LIST */}
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
            className="mt-12 rounded-3xl bg-gradient-to-br from-[#8b1832] to-[#5a0f20] dark:from-[#181f32] dark:to-[#111625] border border-white/10 dark:border-gray-700/80 p-7 sm:p-9 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl" />

            <div className="text-center sm:text-left relative z-10">
              <h3 className="text-xl sm:text-2xl font-black mb-1.5">
                Still have questions?
              </h3>
              <p className="text-rose-100/85 dark:text-gray-300 text-sm sm:text-base max-w-md">
                Can't find the answer you're looking for? Submit your question via
                our form or drop us a DM!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0 relative z-10">
              {/* Butonul care deschide modalul */}
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#8b1832] hover:bg-rose-50 font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-md"
              >
                <FileText size={16} />
                Ask via Form
                <ArrowUpRight size={15} />
              </button>
              <a
                href="https://www.instagram.com/bestbrasov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all hover:-translate-y-0.5"
              >
                <MessageCircle size={16} />
                DM on Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MODALUL PENTRU GOOGLE FORM ── */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Click pe overlay (fundalul întunecat) închide modalul
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            {/* Fereastra propriu-zisă a modalului */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // Oprim propagarea click-ului ca să nu se închidă când apeși în interiorul form-ului
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl h-[85vh] bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 dark:border-gray-700/50"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between p-4 sm:px-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#8b1832] dark:text-rose-400">
                  <FileText size={18} />
                  <h3 className="font-bold text-gray-900 dark:text-white">Submit a Question</h3>
                </div>
                
                {/* Buton X pentru închidere */}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 bg-gray-200/70 dark:bg-gray-800 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 text-gray-600 dark:text-gray-300 hover:text-[#8b1832] dark:hover:text-rose-400 transition-colors"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Conținut Modal (iframe) */}
              <div className="flex-grow w-full relative bg-gray-50 dark:bg-gray-900">
                <iframe
                  src={GOOGLE_FORM_URL}
                  className="w-full h-full border-0"
                  title="Google Form - Ask a Question"
                >
                  Loading...
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