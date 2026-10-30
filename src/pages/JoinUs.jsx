import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Copy,
  Check,
  Mail,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  FileText,
  X,
  Globe,
  Zap,
  Users,
  Briefcase,
} from "lucide-react";
import { testimonialsRow1, testimonialsRow2 } from "../data/testimonialsData";

const RECRUITMENT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true";

const benefitIcons = [
  <Globe size={22} className="text-white" />,
  <Zap size={22} className="text-white" />,
  <Users size={22} className="text-white" />,
  <Briefcase size={22} className="text-white" />,
];

function mod(n, m) {
  return ((n % m) + m) % m;
}

// ─── iPhone Text-Selection Recruitment Badge (Stânga-Sus / Dreapta-Jos) ──────
const IPhoneSelectionBadge = ({ prefixText, highlightText, onClick }) => {
  const prefix = `${prefixText} `;
  const word = highlightText;

  const [phase, setPhase] = useState("initial");
  const [prefixCount, setPrefixCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isDeletingWord, setIsDeletingWord] = useState(false);

  // Resetăm animația dacă utilizatorul schimbă limba (RO <-> EN)
  useEffect(() => {
    setPhase("initial");
    setPrefixCount(0);
    setWordCount(0);
    setIsDeletingWord(false);
  }, [prefixText, highlightText]);

  useEffect(() => {
    let timer;

    if (phase === "initial") {
      if (prefixCount < prefix.length) {
        timer = setTimeout(() => setPrefixCount((c) => c + 1), 48);
      } else if (wordCount < word.length) {
        timer = setTimeout(() => setWordCount((c) => c + 1), 85);
      } else {
        timer = setTimeout(() => {
          setPhase("loop");
          setIsDeletingWord(true);
        }, 1800);
      }
    } else if (phase === "loop") {
      if (isDeletingWord) {
        if (wordCount > 0) {
          timer = setTimeout(() => setWordCount((c) => c - 1), 65);
        } else {
          timer = setTimeout(() => setIsDeletingWord(false), 320);
        }
      } else {
        if (wordCount < word.length) {
          timer = setTimeout(() => setWordCount((c) => c + 1), 115);
        } else {
          timer = setTimeout(() => setIsDeletingWord(true), 2000);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [phase, prefixCount, wordCount, isDeletingWord, prefix.length, word.length]);

  const visiblePrefix = prefix.slice(0, prefixCount);
  const visibleWord = word.slice(0, wordCount);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center justify-center py-4 px-5 cursor-pointer select-none focus:outline-none"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#4F0028]/15 dark:bg-rose-500/20 blur-2xl rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="relative inline-flex items-center bg-[#4F0028]/12 dark:bg-rose-500/20 border-y border-[#4F0028]/35 dark:border-rose-500/35 px-3 sm:px-4 py-1.5 sm:py-2 min-h-[38px] sm:min-h-[42px] transition-colors">
        {/* MÂNER STÂNGA (Bulină SUS) */}
        <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#4F0028] dark:bg-rose-500 shadow-[0_0_10px_rgba(79,0,40,0.85)]">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#4F0028] dark:bg-rose-500 ring-2 ring-white dark:ring-[#320606] shadow-[0_0_12px_rgba(79,0,40,0.9)]" />
        </div>

        {/* TEXT */}
        <div className="flex items-center whitespace-pre text-sm sm:text-base md:text-lg tracking-wide font-semibold text-gray-800 dark:text-rose-100">
          <span>{visiblePrefix}</span>
          <strong className="font-black text-[#4F0028] dark:text-white tracking-wider uppercase drop-shadow-[0_0_10px_rgba(79,0,40,0.35)]">
            {visibleWord}
          </strong>
        </div>

        {/* MÂNER DREAPTA (Bulină JOS) */}
        <div className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-[#4F0028] dark:bg-rose-500 shadow-[0_0_10px_rgba(79,0,40,0.85)]">
          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#4F0028] dark:bg-rose-500 ring-2 ring-white dark:ring-[#320606] shadow-[0_0_12px_rgba(79,0,40,0.9)]" />
        </div>
      </div>
    </motion.button>
  );
};

// ─── Variantele 3D pentru Benefits Carousel ──────────────────────────────────
const cardVariants = {
  center: { x: "0%", z: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 10, filter: "blur(0px)" },
  left: { x: "-56%", z: -140, rotateY: 22, scale: 0.84, opacity: 0.75, zIndex: 5, filter: "blur(0.5px)" },
  right: { x: "56%", z: -140, rotateY: -22, scale: 0.84, opacity: 0.75, zIndex: 5, filter: "blur(0.5px)" },
  "far-left": { x: "-95%", z: -260, rotateY: 32, scale: 0.68, opacity: 0.25, zIndex: 2, filter: "blur(2px)" },
  "far-right": { x: "95%", z: -260, rotateY: -32, scale: 0.68, opacity: 0.25, zIndex: 2, filter: "blur(2px)" },
};

// ─── Benefits 3D Carousel ────────────────────────────────────────────────────
const BenefitsCarousel = () => {
  const { t } = useTranslation();
  const [virtualCurrent, setVirtualCurrent] = useState(0);
  const [timerKey, setTimerKey]             = useState(0);
  const [isPaused, setIsPaused]             = useState(false);
  const [touchStartX, setTouchStartX]       = useState(null);
  const [touchEndX, setTouchEndX]           = useState(null);

  const translatedItems = t("joinUs.benefitsSection.items", { returnObjects: true });
  const benefits = (Array.isArray(translatedItems) ? translatedItems : []).map((item, idx) => ({
    ...item,
    icon: benefitIcons[idx % benefitIcons.length],
  }));

  const virtualBenefits = [...benefits, ...benefits];
  const totalVirtual = virtualBenefits.length;
  const activeRealIndex = mod(virtualCurrent, benefits.length || 1);

  useEffect(() => {
    if (isPaused || totalVirtual === 0) return;
    const timer = setInterval(() => {
      setVirtualCurrent((c) => mod(c + 1, totalVirtual));
    }, 7000);
    return () => clearInterval(timer);
  }, [virtualCurrent, timerKey, isPaused, totalVirtual]);

  if (benefits.length === 0) return null;

  const next = () => {
    setVirtualCurrent((c) => mod(c + 1, totalVirtual));
    setTimerKey((k) => k + 1);
  };
  const prev = () => {
    setVirtualCurrent((c) => mod(c - 1, totalVirtual));
    setTimerKey((k) => k + 1);
  };
  const goToRealIndex = (targetIdx) => {
    const diff = targetIdx - activeRealIndex;
    if (diff === 0) return;
    setVirtualCurrent((c) => mod(c + diff, totalVirtual));
    setTimerKey((k) => k + 1);
  };

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => setTouchEndX(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const dist = touchStartX - touchEndX;
    if (dist > 50) next();
    if (dist < -50) prev();
  };

  const slots = [
    { pos: "far-left",  vIdx: mod(virtualCurrent - 2, totalVirtual) },
    { pos: "left",      vIdx: mod(virtualCurrent - 1, totalVirtual) },
    { pos: "center",    vIdx: virtualCurrent },
    { pos: "right",     vIdx: mod(virtualCurrent + 1, totalVirtual) },
    { pos: "far-right", vIdx: mod(virtualCurrent + 2, totalVirtual) },
  ];

  return (
    <div
      className="w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative mx-auto w-full flex items-center justify-center h-[310px] sm:h-[360px]"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%", transformStyle: "preserve-3d" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slots.map(({ pos, vIdx }) => {
          const b = virtualBenefits[vIdx];
          const isCenter = pos === "center";
          return (
            <motion.div
              key={vIdx}
              variants={cardVariants}
              initial={false}
              animate={pos}
              whileHover={isCenter ? { scale: 1.02, y: -4 } : { scale: pos.includes("far") ? 0.7 : 0.87 }}
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 1 }}
              onClick={() => {
                if (pos === "left" || pos === "far-left") prev();
                else if (pos === "right" || pos === "far-right") next();
                else setIsPaused((p) => !p);
              }}
              className="w-[275px] sm:w-[440px] md:w-[500px] h-[265px] sm:h-[320px] rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-9 flex flex-col justify-between overflow-hidden"
              style={{
                position: "absolute",
                cursor: "pointer",
                willChange: "transform, opacity, filter",
                background: isCenter
                  ? "linear-gradient(145deg, #4F0028 0%, #320606 60%, #1c0202 100%)"
                  : "linear-gradient(145deg, #241418 0%, #12090b 100%)",
                boxShadow: isCenter
                  ? "0 30px 70px -10px rgba(79,0,40,0.55), 0 0 0 1px rgba(255,255,255,0.15) inset"
                  : "0 20px 40px -10px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
            >
              {isCenter && (
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-rose-400/15 rounded-full blur-3xl pointer-events-none" />
              )}
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="flex flex-col gap-2">
                  <span
                    className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em]"
                    style={{ color: isCenter ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }}
                  >
                    {b.tag}
                  </span>
                  <div
                    className="h-[2px] rounded-full transition-all duration-500"
                    style={{
                      width: isCenter ? "42px" : "24px",
                      background: isCenter ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                    }}
                  />
                </div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isCenter
                      ? "bg-white/15 shadow-inner scale-100 opacity-100"
                      : "bg-white/5 scale-90 opacity-40"
                  }`}
                >
                  {b.icon}
                </div>
              </div>
              <div className="relative z-10 my-auto pt-1 sm:pt-2">
                <h3
                  className={`font-black text-white tracking-tight transition-all duration-500 mb-2 sm:mb-3 ${
                    isCenter ? "text-xl sm:text-3xl" : "text-lg sm:text-2xl text-white/70"
                  }`}
                >
                  {b.title}
                </h3>
                <p
                  className={`text-xs sm:text-base leading-relaxed transition-opacity duration-500 ${
                    pos.includes("far") ? "opacity-0" : isCenter ? "text-white/90" : "text-white/40"
                  }`}
                >
                  {b.desc}
                </p>
              </div>
              <div className="relative z-10 flex items-center justify-end">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-white/30">
                  0{mod(vIdx, benefits.length) + 1} / 0{benefits.length}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="hidden md:flex justify-center items-center gap-5 mt-10">
        <button
          onClick={prev}
          className="p-3.5 rounded-full border border-gray-200 dark:border-rose-950/60 text-gray-600 dark:text-gray-300 hover:bg-[#4F0028] hover:border-[#4F0028] hover:text-white transition-all shadow-sm bg-white/80 dark:bg-[#1e0404]/80 backdrop-blur-sm active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-2.5">
          {benefits.map((_, i) => (
            <button
              key={i}
              onClick={() => goToRealIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                i === activeRealIndex
                  ? "w-10 bg-[#4F0028] dark:bg-rose-400 shadow-sm"
                  : "w-2.5 bg-gray-300 dark:bg-rose-950 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-3.5 rounded-full border border-gray-200 dark:border-rose-950/60 text-gray-600 dark:text-gray-300 hover:bg-[#4F0028] hover:border-[#4F0028] hover:text-white transition-all shadow-sm bg-white/80 dark:bg-[#1e0404]/80 backdrop-blur-sm active:scale-95"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

// ─── ContactBox ──────────────────────────────────────────────────────────────
const ContactBox = ({ label, value, displayValue, Icon }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCopy}
      className="w-full text-left p-4 bg-gray-50 dark:bg-[#180202] border border-gray-200 dark:border-rose-950/60 rounded-[1.5rem] hover:border-[#4F0028]/50 dark:hover:border-rose-500/50 hover:shadow-md transition-all duration-300 group flex items-center gap-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-transparent dark:from-[#4F0028]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 w-10 h-10 rounded-xl bg-white dark:bg-[#2a0505] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4F0028] transition-colors duration-300 border border-gray-100 dark:border-rose-900/40">
        <Icon
          size={18}
          className="text-[#4F0028] dark:text-rose-400 group-hover:text-white transition-colors duration-300"
        />
      </div>
      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-black text-gray-900 dark:text-white truncate">
          {displayValue || value}
        </p>
      </div>
      <div className="relative z-10 flex-shrink-0 bg-white dark:bg-[#2a0505] p-2 rounded-lg group-hover:bg-[#4F0028] transition-colors duration-300 shadow-sm border border-gray-100 dark:border-rose-900/40">
        {copied ? (
          <Check size={16} className="text-emerald-500" />
        ) : (
          <Copy size={16} className="text-gray-400 group-hover:text-white transition-colors" />
        )}
      </div>
    </motion.button>
  );
};

// ─── Flat CSS Marquee ────────────────────────────────────────────────────────
const TestimonialCard = ({ t }) => (
  <div
    className={`relative w-[245px] sm:w-[380px] ${t.bgColor} p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] shadow-md flex flex-col flex-shrink-0 md:hover:-translate-y-1 transition-transform duration-300`}
  >
    <div className="relative z-10 flex-1">
      {t.stars && (
        <div className="flex gap-1 mb-2 sm:mb-3">
          {[...Array(t.stars)].map((_, si) => (
            <Star key={si} size={13} className="fill-black text-black" />
          ))}
        </div>
      )}
      <p className="text-white/95 font-medium mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
        "{t.text}"
      </p>
    </div>
    <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 mt-auto">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[10px] sm:text-xs font-bold">
          {t.author
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-white font-bold text-xs sm:text-sm truncate">{t.author}</p>
        <p className="text-white/80 text-[11px] sm:text-xs font-medium tracking-wide truncate">
          {t.local}
        </p>
      </div>
    </div>
  </div>
);

const HorizontalMarquee = ({ testimonials, direction = -1, pausedText }) => {
  const [isPaused, setIsPaused] = useState(false);
  const animationName = direction === -1 ? "marqueeLeft" : "marqueeRight";
  const expandedList = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <div
      className="relative overflow-hidden w-full py-2 select-none cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => setIsPaused(!isPaused)}
    >
      <style>{`
        @keyframes marqueeLeft { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
      `}</style>

      {isPaused && (
        <div className="md:hidden absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm pointer-events-none">
          {pausedText}
        </div>
      )}

      <div
        className="flex w-max"
        style={{
          animation: `${animationName} 60s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6">
          {expandedList.map((item, i) => (
            <TestimonialCard key={`a-${i}`} t={item} />
          ))}
        </div>
        <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6">
          {expandedList.map((item, i) => (
            <TestimonialCard key={`b-${i}`} t={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const JoinUs = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "I want to join BEST",
    message: "",
  });
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.title = t("joinUs.pageTitle");
  }, [t, i18n.language]);

  useEffect(() => {
    if (isApplyModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isApplyModalOpen]);

  useEffect(() => {
    if (location.hash === "#contact") {
      const el = document.getElementById("contact");
      if (el)
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
    }
  }, [location]);

  const scrollToApplyButton = () => {
    const el = document.getElementById("apply-action");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${formData.firstName} ${formData.lastName}\nContact Email: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=bv-board@BEST-eu.org&su=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <>
      <div className="pt-28 sm:pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#4F0028]/10 dark:bg-[#4F0028]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-[#4F0028]/5 dark:bg-[#4F0028]/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HERO */}
          <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-24">
            {/* ── OPEN ── */}
            <div className="mb-8 flex justify-center">
              <IPhoneSelectionBadge
                prefixText="Recruitments are"
                highlightText="OPEN"
                onClick={scrollToApplyButton}
              />
            </div>

            {/* ── CLOSED (Decomentează când recrutările sunt ÎNCHISE) ──
              <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 flex justify-center">
                <div className="inline-flex items-center justify-center gap-3 w-full max-w-sm sm:max-w-md px-7 py-3 rounded-full bg-gray-200/80 dark:bg-[#1e0404]/80 backdrop-blur-md text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-bold border border-gray-300/80 dark:border-rose-950/60 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0" />
                  <span className="truncate">{t("joinUs.hero.badgeClosed")}</span>
                </div>
              </motion.div>
            */}

            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-6 sm:mb-8 transition-colors"
            >
              {t("joinUs.hero.title1")} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F0028] to-rose-500 dark:from-rose-300 dark:to-rose-500">
                {t("joinUs.hero.title2")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {t("joinUs.hero.subtitle")}
            </motion.p>

            <motion.div
              id="apply-action"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative inline-block group scroll-mt-40"
            >
              {/* ── APPLY BUTTON ACTIVE (Decomentează când recrutările sunt OPEN) ──
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="inline-flex items-center gap-3 bg-[#4F0028] hover:bg-[#320606] text-white px-10 py-4 rounded-full font-black text-lg transition-all shadow-lg shadow-[#4F0028]/25 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  {t("joinUs.hero.applyBtn")}
                </button>
              */}

              {/* ── APPLY BUTTON DISABLED ── */}
              <button
                disabled
                className="inline-flex items-center gap-3 bg-gray-300 dark:bg-[#2a0606] text-gray-500 dark:text-gray-400 px-10 py-4 rounded-full font-black text-lg cursor-not-allowed transition-all"
              >
                {t("joinUs.hero.applyBtn")}
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[260px] sm:w-[280px] px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs sm:text-sm font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                {t("joinUs.hero.closedTooltip1")} <br /> {t("joinUs.hero.closedTooltip2")}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-gray-900 dark:border-b-white" />
              </div>
            </motion.div>
          </div>

          {/* BENEFITS 3D CAROUSEL */}
          <div className="mb-24 sm:mb-32">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                {t("joinUs.benefitsSection.heading")}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#4F0028] to-rose-500 mx-auto rounded-full" />
            </div>
            <BenefitsCarousel />
          </div>
        </div>

        {/* TESTIMONIALS (MARQUEE) */}
        <div className="mb-24 sm:mb-32 w-full relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t("joinUs.testimonials.heading")}
            </h2>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              {t("joinUs.testimonials.pauseHint")}
            </p>
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-[#1e0303] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-[#1e0303] to-transparent z-10 pointer-events-none" />

          <div className="flex flex-col gap-4 sm:gap-6 overflow-hidden">
            <HorizontalMarquee
              testimonials={testimonialsRow1}
              direction={-1}
              pausedText={t("joinUs.testimonials.pausedBadge")}
            />
            <HorizontalMarquee
              testimonials={testimonialsRow2}
              direction={1}
              pausedText={t("joinUs.testimonials.pausedBadge")}
            />
          </div>
        </div>

        {/* CONTACT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div id="contact" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#1e0404] rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-rose-950/60 p-6 sm:p-8 md:p-12 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-rose-50/50 to-transparent dark:from-[#4F0028]/15 pointer-events-none rounded-tr-[2.5rem] rounded-br-[2.5rem]" />

              <div className="text-center mb-10 sm:mb-12 relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                  {t("joinUs.contact.heading1")}{" "}
                  <span className="text-[#4F0028] dark:text-rose-400">
                    {t("joinUs.contact.heading2")}
                  </span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                  {t("joinUs.contact.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <ContactBox
                    label={t("joinUs.contact.emailLabel")}
                    value="bv-board@BEST-eu.org"
                    Icon={Mail}
                  />

              {/* NUMAR DE TELEFON (cand trebuie schimbat) */}

                  <ContactBox
                    label={t("joinUs.contact.phoneLabel")}
                    value="+40 730 827 778"
                    displayValue="+40 730 827 778"
                    Icon={Phone}
                  />
                  <div className="flex items-start gap-3 px-4 py-2">
                    <MapPin
                      size={20}
                      className="text-[#4F0028] dark:text-rose-400 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {t("joinUs.contact.addressLine1")}
                      <br />
                      {t("joinUs.contact.addressLine2")}
                    </p>
                  </div>
                  <div className="w-full flex-1 min-h-[240px] rounded-2xl overflow-hidden border border-gray-100 dark:border-rose-950/60 shadow-sm">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.658607316982!2d25.58661657666245!3d45.6388000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b719be0e2e9%3A0xc4ebbcdd067bf7c9!2sC%C4%83minul%2015!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="BEST Brașov Location"
                      className="md:grayscale md:hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 lg:pl-8 flex flex-col">
                  <form className="space-y-5 flex-1 flex flex-col" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                          {t("joinUs.contact.form.firstName")}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder={t("joinUs.contact.form.firstNamePlaceholder")}
                          required
                          className="w-full px-5 py-3.5 bg-gray-50 dark:bg-[#140202] border border-gray-200 dark:border-rose-950/60 rounded-2xl focus:outline-none focus:border-[#4F0028] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                          {t("joinUs.contact.form.lastName")}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder={t("joinUs.contact.form.lastNamePlaceholder")}
                          required
                          className="w-full px-5 py-3.5 bg-gray-50 dark:bg-[#140202] border border-gray-200 dark:border-rose-950/60 rounded-2xl focus:outline-none focus:border-[#4F0028] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        {t("joinUs.contact.form.email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("joinUs.contact.form.emailPlaceholder")}
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 dark:bg-[#140202] border border-gray-200 dark:border-rose-950/60 rounded-2xl focus:outline-none focus:border-[#4F0028] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm"
                      />
                    </div>

                    <div className="space-y-1.5 relative">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        {t("joinUs.contact.form.subject")}
                      </label>
                      <div className="relative">
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 pr-10 bg-gray-50 dark:bg-[#140202] border border-gray-200 dark:border-rose-950/60 rounded-2xl focus:outline-none focus:border-[#4F0028] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm appearance-none cursor-pointer"
                        >
                          <option value="I want to join BEST">
                            {t("joinUs.contact.form.subjectOptions.join")}
                          </option>
                          <option value="Company Partnership Inquiry">
                            {t("joinUs.contact.form.subjectOptions.partnership")}
                          </option>
                          <option value="Other Questions">
                            {t("joinUs.contact.form.subjectOptions.other")}
                          </option>
                        </select>
                        <ChevronDown
                          size={18}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1 flex flex-col">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        {t("joinUs.contact.form.message")}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("joinUs.contact.form.messagePlaceholder")}
                        required
                        className="w-full flex-1 min-h-[120px] px-5 py-3.5 bg-gray-50 dark:bg-[#140202] border border-gray-200 dark:border-rose-950/60 rounded-2xl focus:outline-none focus:border-[#4F0028] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 bg-[#4F0028] hover:bg-[#320606] text-white rounded-2xl font-bold text-base transition-colors shadow-md mt-2 cursor-pointer"
                    >
                      {t("joinUs.contact.form.submitBtn")}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* POP-UP MODAL */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsApplyModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl h-[85vh] bg-white dark:bg-[#1a0303] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 dark:border-rose-950/60"
            >
              <div className="flex items-center justify-between p-4 sm:px-6 border-b border-gray-100 dark:border-rose-950/60 bg-gray-50/90 dark:bg-[#140202]/90 backdrop-blur-md">
                <div className="flex items-center gap-2.5 text-[#4F0028] dark:text-rose-400">
                  <FileText size={18} />
                  <h3 className="font-black text-gray-900 dark:text-white text-sm sm:text-base">
                    {t("joinUs.hero.applyBtn")} — BEST Brașov
                  </h3>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="p-2 bg-gray-200/70 dark:bg-[#2d0707] rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 text-gray-600 dark:text-gray-300 hover:text-[#4F0028] dark:hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
              <div className="flex-grow w-full relative bg-gray-50 dark:bg-[#140202]">
                <iframe
                  src={RECRUITMENT_FORM_URL}
                  className="w-full h-full border-0"
                  title="BEST Brașov Recruitment Form"
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

export default JoinUs;