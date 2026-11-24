import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
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
import { siteConfig } from "../config/siteConfig";
import { useEcoMode } from "../context/EcoModeContext";

const benefitIcons = [
  <Globe size={22} className="text-white" />,
  <Zap size={22} className="text-white" />,
  <Users size={22} className="text-white" />,
  <Briefcase size={22} className="text-white" />,
];

function mod(n, m) {
  return ((n % m) + m) % m;
}

// ─── 1. Badge OPEN ───────────────────────────────────────────────────────────
const IPhoneSelectionBadge = ({ prefixText, highlightText, onClick }) => {
  const { isEcoMode } = useEcoMode();
  const prefix = `${prefixText} `;
  const word = highlightText;

  const [phase, setPhase] = useState("initial");
  const [prefixCount, setPrefixCount] = useState(isEcoMode ? prefix.length : 0);
  const [wordCount, setWordCount] = useState(isEcoMode ? word.length : 0);
  const [isDeletingWord, setIsDeletingWord] = useState(false);

  useEffect(() => {
    if (isEcoMode) {
      setPrefixCount(prefix.length);
      setWordCount(word.length);
      return;
    }
    setPhase("initial");
    setPrefixCount(0);
    setWordCount(0);
    setIsDeletingWord(false);
  }, [prefixText, highlightText, isEcoMode, prefix.length, word.length]);

  useEffect(() => {
    if (isEcoMode) return;
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
  }, [phase, prefixCount, wordCount, isDeletingWord, prefix.length, word.length, isEcoMode]);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative z-20 inline-flex items-center justify-center py-4 px-5 cursor-pointer select-none focus:outline-none"
    >
      <div className="relative inline-flex items-center bg-[#4F0028]/12 dark:bg-rose-500/20 border-y border-[#4F0028]/35 dark:border-rose-500/35 px-3 sm:px-4 py-1.5 sm:py-2 min-h-[38px] sm:min-h-[42px] transition-colors">
        <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#4F0028] dark:bg-rose-500">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#4F0028] dark:bg-rose-500 ring-2 ring-white dark:ring-[#320606]" />
        </div>

        <div className="flex items-center whitespace-pre text-sm sm:text-base md:text-lg tracking-wide font-semibold text-gray-800 dark:text-rose-100">
          <span>{prefix.slice(0, prefixCount)}</span>
          <strong className="font-black text-[#4F0028] dark:text-white tracking-wider uppercase">
            {word.slice(0, wordCount)}
          </strong>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-[#4F0028] dark:bg-rose-500">
          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#4F0028] dark:bg-rose-500 ring-2 ring-white dark:ring-[#320606]" />
        </div>
      </div>
    </motion.button>
  );
};

// ─── 2. Badge CLOSED ─────────────────────────────────────────────────────────
const IPhoneSelectionBadgeClosed = ({ prefixText, highlightText, onClick }) => {
  const { isEcoMode } = useEcoMode();
  const prefix = `${prefixText} `;
  const word = highlightText;

  const [prefixCount, setPrefixCount] = useState(isEcoMode ? prefix.length : 0);
  const [wordCount, setWordCount] = useState(isEcoMode ? word.length : 0);

  useEffect(() => {
    if (isEcoMode) {
      setPrefixCount(prefix.length);
      setWordCount(word.length);
      return;
    }
    setPrefixCount(0);
    setWordCount(0);
  }, [prefixText, highlightText, isEcoMode, prefix.length, word.length]);

  useEffect(() => {
    if (isEcoMode) return;
    let timer;
    if (prefixCount < prefix.length) {
      timer = setTimeout(() => setPrefixCount((c) => c + 1), 45);
    } else if (wordCount < word.length) {
      timer = setTimeout(() => setWordCount((c) => c + 1), 75);
    }
    return () => clearTimeout(timer);
  }, [prefixCount, wordCount, prefix.length, word.length, isEcoMode]);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative z-20 inline-flex items-center justify-center py-4 px-5 cursor-pointer select-none focus:outline-none"
    >
      <div className="relative inline-flex items-center bg-gray-200/75 dark:bg-white/[0.06] border-y border-gray-400/50 dark:border-gray-500/40 px-3.5 sm:px-4 py-1.5 sm:py-2 min-h-[38px] sm:min-h-[42px]">
        <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-gray-500 dark:bg-gray-400">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-400 ring-2 ring-white dark:ring-[#320606]" />
        </div>

        <div className="flex items-center whitespace-pre text-sm sm:text-base md:text-lg tracking-wide font-semibold text-gray-500 dark:text-gray-400">
          <span>{prefix.slice(0, prefixCount)}</span>
          <strong className="font-black text-gray-700 dark:text-gray-200 tracking-wider uppercase">
            {word.slice(0, wordCount)}
          </strong>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-gray-500 dark:bg-gray-400">
          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-400 ring-2 ring-white dark:ring-[#320606]" />
        </div>
      </div>
    </motion.button>
  );
};

const cardVariants = {
  center: { x: "0%", z: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 10 },
  left: { x: "-56%", z: -140, rotateY: 22, scale: 0.84, opacity: 0.75, zIndex: 5 },
  right: { x: "56%", z: -140, rotateY: -22, scale: 0.84, opacity: 0.75, zIndex: 5 },
  "far-left": { x: "-95%", z: -260, rotateY: 32, scale: 0.68, opacity: 0.25, zIndex: 2 },
  "far-right": { x: "95%", z: -260, rotateY: -32, scale: 0.68, opacity: 0.25, zIndex: 2 },
};

const BenefitsCarousel = () => {
  const { t } = useTranslation();
  const { isEcoMode } = useEcoMode();
  const [virtualCurrent, setVirtualCurrent] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const translatedItems = t("joinUs.benefitsSection.items", { returnObjects: true });
  const benefits = (Array.isArray(translatedItems) ? translatedItems : []).map((item, idx) => ({
    ...item,
    icon: benefitIcons[idx % benefitIcons.length],
  }));

  const virtualBenefits = [...benefits, ...benefits];
  const totalVirtual = virtualBenefits.length;
  const activeRealIndex = mod(virtualCurrent, benefits.length || 1);

  useEffect(() => {
    if (isPaused || isEcoMode || totalVirtual === 0) return;
    const timer = setInterval(() => {
      setVirtualCurrent((c) => mod(c + 1, totalVirtual));
    }, 7000);
    return () => clearInterval(timer);
  }, [virtualCurrent, timerKey, isPaused, isEcoMode, totalVirtual]);

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
    if (dist > 45) next();
    if (dist < -45) prev();
  };

  const slots = [
    { pos: "far-left", vIdx: mod(virtualCurrent - 2, totalVirtual) },
    { pos: "left", vIdx: mod(virtualCurrent - 1, totalVirtual) },
    { pos: "center", vIdx: virtualCurrent },
    { pos: "right", vIdx: mod(virtualCurrent + 1, totalVirtual) },
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
              transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.85, restDelta: 0.5 }}
              onClick={() => {
                if (pos === "left" || pos === "far-left") prev();
                else if (pos === "right" || pos === "far-right") next();
                else setIsPaused((p) => !p);
              }}
              className="w-[275px] sm:w-[440px] md:w-[500px] h-[265px] sm:h-[320px] rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-9 flex flex-col justify-between overflow-hidden transform-gpu"
              style={{
                position: "absolute",
                cursor: "pointer",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: isCenter
                  ? "linear-gradient(145deg, #4F0028 0%, #320606 60%, #1c0202 100%)"
                  : "linear-gradient(145deg, #241418 0%, #12090b 100%)",
                boxShadow: isCenter
                  ? "0 24px 50px -12px rgba(79,0,40,0.5), 0 0 0 1px rgba(255,255,255,0.15) inset"
                  : "0 16px 32px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
            >
              {isCenter && (
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(251,113,133,0.22) 0%, rgba(251,113,133,0) 70%)",
                  }}
                />
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
                    className="h-[2px] rounded-full transition-all duration-300"
                    style={{
                      width: isCenter ? "42px" : "24px",
                      background: isCenter ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                    }}
                  />
                </div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
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
                  className={`font-black text-white tracking-tight transition-colors duration-300 mb-2 sm:mb-3 ${
                    isCenter ? "text-xl sm:text-3xl" : "text-lg sm:text-2xl text-white/70"
                  }`}
                >
                  {b.title}
                </h3>
                <p
                  className={`text-xs sm:text-base leading-relaxed transition-opacity duration-300 ${
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
          className="p-3.5 rounded-full border border-gray-200 dark:border-rose-950/60 text-gray-600 dark:text-gray-300 hover:bg-[#4F0028] hover:border-[#4F0028] hover:text-white transition-all shadow-sm bg-white/90 dark:bg-[#1e0404]/90 active:scale-95 cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-2.5">
          {benefits.map((_, i) => (
            <button
              key={i}
              onClick={() => goToRealIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeRealIndex
                  ? "w-10 bg-[#4F0028] dark:bg-rose-400 shadow-sm"
                  : "w-2.5 bg-gray-300 dark:bg-rose-950 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-3.5 rounded-full border border-gray-200 dark:border-rose-950/60 text-gray-600 dark:text-gray-300 hover:bg-[#4F0028] hover:border-[#4F0028] hover:text-white transition-all shadow-sm bg-white/90 dark:bg-[#1e0404]/90 active:scale-95 cursor-pointer"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

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
      className="w-full text-left p-4 bg-gray-50 dark:bg-[#180202] border border-gray-200 dark:border-rose-950/60 rounded-[1.5rem] hover:border-[#4F0028]/50 dark:hover:border-rose-500/50 hover:shadow-md transition-all duration-300 group flex items-center gap-4 relative overflow-hidden cursor-pointer"
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

const TestimonialCard = ({ t }) => (
  <div
    className={`relative w-[260px] sm:w-[380px] ${t.bgColor} p-5 sm:p-6 rounded-2xl sm:rounded-[1.5rem] shadow-md flex flex-col flex-shrink-0 md:hover:-translate-y-1 transition-transform duration-300 select-none`}
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

// ─── Carusel nativ CSS cu LOOP INFINIT continuu (60fps, fără hover) — STRICT MOBIL ──
const MobileTestimonialsCarousel = ({ testimonials }) => {
  const scrollRef = useRef(null);
  const settleTimerRef = useRef(null);
  const isTeleportingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const N = testimonials.length;
  // 3 copii identice => glisare infinită continuă spre stânga și dreapta fără capăt
  const loopedItems = [...testimonials, ...testimonials, ...testimonials];

  const getStride = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return 0;
    return el.firstElementChild.offsetWidth + 16; // card + gap-4
  }, []);

  // Pornește centrat exact pe primul card din setul din mijloc
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || N === 0) return;

    const initPosition = () => {
      const stride = getStride();
      if (stride > 0) {
        el.scrollLeft = N * stride;
      }
    };

    initPosition();
    window.addEventListener("resize", initPosition);
    return () => {
      window.removeEventListener("resize", initPosition);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, [N, getStride]);

  const recenterSilently = useCallback(() => {
    const el = scrollRef.current;
    const stride = getStride();
    if (!el || !stride || N === 0) return;

    const setWidth = N * stride;
    if (el.scrollLeft < setWidth * 0.5 || el.scrollLeft >= setWidth * 1.5) {
      isTeleportingRef.current = true;
      const offset = el.scrollLeft < setWidth * 0.5 ? setWidth : -setWidth;
      el.style.scrollSnapType = "none";
      el.scrollLeft += offset;
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.style.scrollSnapType = "";
        }
        isTeleportingRef.current = false;
      });
    }
  }, [N, getStride]);

  const handleScroll = () => {
    if (isTeleportingRef.current) return;
    const el = scrollRef.current;
    const stride = getStride();
    if (!el || !stride || N === 0) return;

    const rawIdx = Math.round(el.scrollLeft / stride);
    setActiveIndex(mod(rawIdx, N));

    // Guard instant la swipe foarte rapid spre margini
    const setWidth = N * stride;
    if (el.scrollLeft < stride * 0.6 || el.scrollLeft > setWidth * 2 + stride * (N - 1.6)) {
      recenterSilently();
      return;
    }

    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(recenterSilently, 140);
  };

  const scrollToRawIndex = (targetRawIdx, realIdx) => {
    const el = scrollRef.current;
    const stride = getStride();
    if (!el || !stride) return;

    setActiveIndex(realIdx);
    el.scrollTo({
      left: targetRawIdx * stride,
      behavior: "smooth",
    });
  };

  const scrollToRealIndex = (targetRealIdx) => {
    const el = scrollRef.current;
    const stride = getStride();
    if (!el || !stride || N === 0) return;

    const currentRawIdx = Math.round(el.scrollLeft / stride);
    const currentRealIdx = mod(currentRawIdx, N);
    let diff = targetRealIdx - currentRealIdx;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;

    scrollToRawIndex(currentRawIdx + diff, targetRealIdx);
  };

  return (
    <div className="lg:hidden w-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-[calc(50%-min(42vw,170px))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loopedItems.map((item, idx) => {
          const realIdx = mod(idx, N);
          const isActive = realIdx === activeIndex;
          return (
            <button
              key={`${item.id || realIdx}-${idx}`}
              type="button"
              onClick={() => scrollToRawIndex(idx, realIdx)}
              className={`snap-center flex-shrink-0 w-[84vw] max-w-[340px] ${item.bgColor} p-6 rounded-[1.75rem] shadow-lg text-left flex flex-col justify-between transition-transform duration-200 cursor-pointer ${
                isActive ? "scale-100 ring-2 ring-rose-400/50" : "scale-[0.96] opacity-85"
              }`}
            >
              <p className="text-white/95 font-medium text-sm leading-relaxed mb-6">
                "{item.text}"
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {item.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm truncate">{item.author}</p>
                  <p className="text-white/75 text-xs font-medium truncate">{item.local}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Puncte centrate pe mobil */}
      <div className="flex justify-center items-center gap-1.5 mt-3">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToRealIndex(idx)}
            aria-label={`Testimonial ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIndex
                ? "w-7 bg-[#4F0028] dark:bg-rose-400"
                : "w-1.5 bg-gray-300 dark:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Marquee Desktop (auto-oprit sub 1024px ca să nu consume CPU pe mobil) ───
const HorizontalMarquee = ({ testimonials, direction = -1, pausedText }) => {
  const { isEcoMode } = useEcoMode();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isInViewRef = useRef(true);

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  const posRef = useRef(0);
  const halfWidthRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const hasMovedRef = useRef(false);

  const expandedList = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const measure = useCallback(() => {
    if (!trackRef.current || window.innerWidth < 1024) return;
    const half = trackRef.current.scrollWidth / 2;
    halfWidthRef.current = half;
    if (direction === 1 && posRef.current === 0 && half > 0) {
      posRef.current = -half;
    }
  }, [direction]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const wrapPosition = useCallback((val) => {
    const half = halfWidthRef.current;
    if (!half) return val;
    let next = val % half;
    if (next > 0) next -= half;
    return next;
  }, []);

  useEffect(() => {
    if (isEcoMode || (typeof window !== "undefined" && window.innerWidth < 1024)) return;
    let rafId;
    const speed = 0.32;

    const step = () => {
      if (
        isInViewRef.current &&
        !isHovered &&
        !isDragging &&
        !isTouchPaused &&
        halfWidthRef.current > 0
      ) {
        posRef.current = wrapPosition(posRef.current + direction * speed);
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [direction, isHovered, isDragging, isTouchPaused, isEcoMode, wrapPosition]);

  const handlePointerDown = (clientX) => {
    measure();
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartXRef.current = clientX;
    dragStartPosRef.current = posRef.current;
  };

  const handlePointerMove = useCallback(
    (clientX) => {
      if (!isDragging) return;
      const delta = clientX - dragStartXRef.current;
      if (Math.abs(delta) > 5) hasMovedRef.current = true;
      posRef.current = wrapPosition(dragStartPosRef.current + delta);
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      }
    },
    [isDragging, wrapPosition]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e) => handlePointerMove(e.clientX);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) handlePointerMove(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full py-2 select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => {
        e.preventDefault();
        handlePointerDown(e.clientX);
      }}
      onTouchStart={(e) => {
        if (e.touches && e.touches[0]) handlePointerDown(e.touches[0].clientX);
      }}
      onClick={() => {
        if (!hasMovedRef.current) {
          setIsTouchPaused((p) => !p);
        }
      }}
    >
      {isTouchPaused && !isEcoMode && (
        <div className="md:hidden absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/75 text-white text-[10px] font-bold uppercase tracking-wider pointer-events-none">
          {pausedText}
        </div>
      )}

      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ transform: "translate3d(0px, 0, 0)" }}
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
  const [showMobileClosedTip, setShowMobileClosedTip] = useState(false);
  const location = useLocation();

  const isRO = !!i18n.language && i18n.language.toLowerCase().startsWith("ro");
  const { isRecruitmentOpen, contact, forms } = siteConfig;

  useEffect(() => {
    document.title = t("joinUs.pageTitle");
  }, [t, i18n.language]);

  useEffect(() => {
    document.body.style.overflow = isApplyModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isApplyModalOpen]);

  useEffect(() => {
    if (location.hash === "#contact") {
      const el = document.getElementById("contact");
      if (el)
        setTimeout(() => {
          window.isAutoScrolling = true;
          const y = el.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top: y, behavior: "smooth" });
          setTimeout(() => {
            window.isAutoScrolling = false;
          }, 900);
        }, 100);
    }
  }, [location]);

  const handleRecruitmentBadgeClick = () => {
    window.isAutoScrolling = true;
    if (window.scrollY > 30) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById("apply-action");
      if (el) {
        const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 180);
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setTimeout(() => {
      window.isAutoScrolling = false;
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${formData.firstName} ${formData.lastName}\nContact Email: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        contact.email
      )}&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <>
      <div className="pt-24 lg:pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300 overflow-x-clip relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-10%] right-[-5%] w-[520px] h-[520px] rounded-full z-0"
          style={{
            background: "radial-gradient(circle, rgba(79,0,40,0.16) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[20%] left-[-10%] w-[440px] h-[440px] rounded-full z-0"
          style={{
            background: "radial-gradient(circle, rgba(79,0,40,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* HERO (controlat automat din siteConfig.isRecruitmentOpen) */}
          <div id="join-hero-top" className="text-center max-w-4xl mx-auto mb-20 sm:mb-24 scroll-mt-24">
            <div className="mb-8 flex justify-center">
              {isRecruitmentOpen ? (
                <IPhoneSelectionBadge
                  prefixText={t("joinUs.hero.badgeOpen")}
                  highlightText={t("joinUs.hero.badgeOpenStrong")}
                  onClick={handleRecruitmentBadgeClick}
                />
              ) : (
                <IPhoneSelectionBadgeClosed
                  prefixText={isRO ? "Recrutările sunt" : "Recruitments are"}
                  highlightText={isRO ? "ÎNCHISE" : "CLOSED"}
                  onClick={handleRecruitmentBadgeClick}
                />
              )}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-6 sm:mb-8 transition-colors"
            >
              {t("joinUs.hero.title1")} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F0028] to-rose-500 dark:from-rose-300 dark:to-rose-500">
                {t("joinUs.hero.title2")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {t("joinUs.hero.subtitle")}
            </motion.p>

            <motion.div
              id="apply-action"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="relative inline-block group scroll-mt-36"
            >
              {isRecruitmentOpen ? (
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="inline-flex items-center gap-3 bg-[#4F0028] hover:bg-[#320606] text-white px-10 py-4 rounded-full font-black text-lg transition-all shadow-lg shadow-[#4F0028]/25 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  {t("joinUs.hero.applyBtn")}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    aria-disabled="true"
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setShowMobileClosedTip((v) => !v);
                      }
                    }}
                    onMouseLeave={() => setShowMobileClosedTip(false)}
                    className="inline-flex items-center gap-3 bg-gray-300 dark:bg-[#2a0606] text-gray-500 dark:text-gray-400 px-10 py-4 rounded-full font-black text-lg cursor-not-allowed transition-all select-none"
                  >
                    {t("joinUs.hero.applyBtn")}
                  </button>

                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[260px] sm:w-[280px] px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs sm:text-sm font-medium rounded-xl shadow-xl transition-opacity duration-300 pointer-events-none z-30 ${
                      showMobileClosedTip ? "opacity-100" : "opacity-0"
                    } md:opacity-0 md:group-hover:opacity-100`}
                  >
                    {t("joinUs.hero.closedTooltip1")} <br /> {t("joinUs.hero.closedTooltip2")}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-gray-900 dark:border-b-white" />
                  </div>
                </>
              )}
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

        {/* TESTIMONIALS */}
        <div className="mb-24 sm:mb-32 w-full relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t("joinUs.testimonials.heading")}
            </h2>
            <p className="hidden lg:block text-gray-400 dark:text-gray-500 text-xs">
              {t("joinUs.testimonials.pauseHint")}
            </p>
            <p className="lg:hidden text-gray-400 dark:text-gray-500 text-xs">
              {isRO ? "Glisează sau atinge un card" : "Swipe or tap a card"}
            </p>
          </div>

          {/* Mobil: Carusel nativ cu Loop Infinit + Tap (0 lag, fără hover) */}
          <MobileTestimonialsCarousel
            testimonials={[...testimonialsRow1, ...testimonialsRow2]}
          />

          {/* Desktop: Marquee-ul dublu original, neschimbat */}
          <div className="hidden lg:block relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 dark:from-[#1e0303] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 dark:from-[#1e0303] to-transparent z-10 pointer-events-none" />

            <div className="flex flex-col gap-6 overflow-hidden">
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
        </div>

        {/* CONTACT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div id="contact" className="scroll-mt-28">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
                    value={contact.email}
                    Icon={Mail}
                  />
                  <ContactBox
                    label={t("joinUs.contact.phoneLabel")}
                    value={contact.phone}
                    displayValue={contact.phoneDisplay}
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

      {/* POP-UP MODAL RECRUTARE */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsApplyModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl h-[85vh] bg-white dark:bg-[#1a0303] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 dark:border-rose-950/60"
            >
              <div className="flex items-center justify-between p-4 sm:px-6 border-b border-gray-100 dark:border-rose-950/60 bg-gray-50 dark:bg-[#140202]">
                <div className="flex items-center gap-2.5 text-[#4F0028] dark:text-rose-400">
                  <FileText size={18} />
                  <h3 className="font-black text-gray-900 dark:text-white text-sm sm:text-base">
                    {t("joinUs.hero.applyBtn")} · BEST Brașov
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
                  src={forms.recruitment}
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