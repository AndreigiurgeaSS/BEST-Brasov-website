import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Copy, Check, Mail, Phone, Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { testimonialsRow1, testimonialsRow2 } from "../data/testimonialsData";

// Iconițele rămân constante indiferent de limbă
const benefitIcons = ["🌍", "⚡", "👥", "💼"];

function mod(n, m) { return ((n % m) + m) % m; }

// Variantele 3D controlate de Framer Motion pentru tranziție ultra-smooth
const cardVariants = {
  center: {
    x: "0%",
    z: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    zIndex: 10,
    filter: "blur(0px)",
  },
  left: {
    x: "-56%",
    z: -140,
    rotateY: 22,
    scale: 0.84,
    opacity: 0.75,
    zIndex: 5,
    filter: "blur(0.5px)",
  },
  right: {
    x: "56%",
    z: -140,
    rotateY: -22,
    scale: 0.84,
    opacity: 0.75,
    zIndex: 5,
    filter: "blur(0.5px)",
  },
  "far-left": {
    x: "-95%",
    z: -260,
    rotateY: 32,
    scale: 0.68,
    opacity: 0.25,
    zIndex: 2,
    filter: "blur(2px)",
  },
  "far-right": {
    x: "95%",
    z: -260,
    rotateY: -32,
    scale: 0.68,
    opacity: 0.25,
    zIndex: 2,
    filter: "blur(2px)",
  },
};

// ─── Benefits 3D Carousel ────────────────────────────────────────────────────
const BenefitsCarousel = () => {
  const { t } = useTranslation();
  const [virtualCurrent, setVirtualCurrent] = useState(0);
  const [timerKey, setTimerKey]             = useState(0);
  const [isHovered, setIsHovered]           = useState(false);
  const [touchStartX, setTouchStartX]       = useState(null);
  const [touchEndX, setTouchEndX]           = useState(null);

  // Preluăm cardurile traduse din JSON (cu fallback de siguranță)
  const translatedItems = t("joinUs.benefitsSection.items", { returnObjects: true });
  const benefits = (Array.isArray(translatedItems) ? translatedItems : []).map((item, idx) => ({
    ...item,
    icon: benefitIcons[idx % benefitIcons.length],
  }));

  const virtualBenefits = [...benefits, ...benefits];
  const totalVirtual = virtualBenefits.length; // 8
  const activeRealIndex = mod(virtualCurrent, benefits.length || 1);

  useEffect(() => {
    if (isHovered || totalVirtual === 0) return;
    const timer = setInterval(() => {
      setVirtualCurrent((c) => mod(c + 1, totalVirtual));
    }, 7000);
    return () => clearInterval(timer);
  }, [virtualCurrent, timerKey, isHovered, totalVirtual]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D stage */}
      <div
        className="relative mx-auto w-full flex items-center justify-center"
        style={{
          height: "360px",
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
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
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
                mass: 1,
              }}
              onClick={() => {
                if (pos === "left"  || pos === "far-left")  prev();
                if (pos === "right" || pos === "far-right") next();
              }}
              className="w-[320px] sm:w-[440px] md:w-[500px] h-[300px] sm:h-[320px] rounded-[2rem] p-7 sm:p-9 flex flex-col justify-between overflow-hidden"
              style={{
                position: "absolute",
                cursor: isCenter ? "default" : "pointer",
                willChange: "transform, opacity, filter",
                background: isCenter
                  ? "linear-gradient(145deg, #a11d3a 0%, #6e1125 55%, #3a0812 100%)"
                  : "linear-gradient(145deg, #262629 0%, #121214 100%)",
                boxShadow: isCenter
                  ? "0 30px 70px -10px rgba(139,24,50,0.55), 0 0 0 1px rgba(255,255,255,0.15) inset"
                  : "0 20px 40px -10px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
            >
              {isCenter && (
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
              )}

              {/* Top row: Tag + Icon */}
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="flex flex-col gap-2.5">
                  <span
                    className="text-xs font-extrabold uppercase tracking-[0.2em]"
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
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${
                    isCenter
                      ? "bg-white/15 shadow-inner scale-100 opacity-100"
                      : "bg-white/5 scale-90 opacity-40"
                  }`}
                >
                  {b.icon}
                </div>
              </div>

              {/* Content: Title + Description */}
              <div className="relative z-10 my-auto pt-2">
                <h3
                  className={`font-black text-white tracking-tight transition-all duration-500 mb-3 ${
                    isCenter ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl text-white/70"
                  }`}
                >
                  {b.title}
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed transition-opacity duration-500 ${
                    pos.includes("far") ? "opacity-0" : isCenter ? "text-white/90" : "text-white/40"
                  }`}
                >
                  {b.desc}
                </p>
              </div>

              {/* Bottom subtle index indicator */}
              <div className="relative z-10 flex items-center justify-end">
                <span className="text-[11px] font-bold tracking-widest text-white/30">
                  0{mod(vIdx, benefits.length) + 1} / 0{benefits.length}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nav arrows — desktop only */}
      <div className="hidden md:flex justify-center items-center gap-5 mt-10">
        <button
          onClick={prev}
          className="p-3.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#8b1832] hover:border-[#8b1832] hover:text-white dark:hover:bg-rose-600 dark:hover:border-rose-600 transition-all shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm active:scale-95"
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
                  ? "w-10 bg-[#8b1832] dark:bg-rose-500 shadow-sm"
                  : "w-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-3.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#8b1832] hover:border-[#8b1832] hover:text-white dark:hover:bg-rose-600 dark:hover:border-rose-600 transition-all shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm active:scale-95"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Dots — mobile only */}
      <div className="flex md:hidden justify-center items-center gap-2.5 mt-8">
        {benefits.map((_, i) => (
          <button
            key={i}
            onClick={() => goToRealIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === activeRealIndex ? "w-9 bg-[#8b1832] dark:bg-rose-500" : "w-2.5 bg-gray-300 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── ContactBox ──────────────────────────────────────────────────
const ContactBox = ({ label, value, displayValue, Icon }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={handleCopy}
      className="w-full text-left p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] hover:border-[#8b1832]/50 dark:hover:border-rose-500/50 hover:shadow-md transition-all duration-300 group flex items-center gap-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-transparent dark:from-rose-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 w-10 h-10 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8b1832] transition-colors duration-300 border border-gray-100 dark:border-gray-600">
        <Icon size={18} className="text-[#8b1832] dark:text-rose-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-black text-gray-900 dark:text-white truncate">{displayValue || value}</p>
      </div>
      <div className="relative z-10 flex-shrink-0 bg-white dark:bg-gray-700 p-2 rounded-lg group-hover:bg-[#8b1832] transition-colors duration-300 shadow-sm border border-gray-100 dark:border-gray-600">
        <motion.div initial={false} animate={{ scale: copied ? 1.2 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-400 group-hover:text-white transition-colors" />}
        </motion.div>
      </div>
    </motion.button>
  );
};

// ─── Marquee (comments) ───────────────────────────────────────────
const HorizontalMarquee = ({ testimonials, direction = -1 }) => {
  const trackRef  = useRef(null);
  const animRef   = useRef(null);
  const posRef    = useRef(0);
  const pausedRef = useRef(false);
  const SPEED = 0.5;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += direction * SPEED;
        if (posRef.current <= -half) posRef.current += half;
        if (posRef.current >= 0)     posRef.current -= half;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [direction]);

  return (
    <div className="relative overflow-hidden w-full py-2"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className={`relative w-[320px] sm:w-[380px] ${t.bgColor} p-6 rounded-[1.5rem] shadow-md flex flex-col flex-shrink-0 cursor-default hover:-translate-y-1 transition-transform duration-300`}>
            <div className="relative z-10 flex-1">
              {t.stars && (
                <div className="flex gap-1 mb-3">
                  {[...Array(t.stars)].map((_, si) => <Star key={si} size={14} className="fill-black text-black" />)}
                </div>
              )}
              <p className="text-white/95 font-medium mb-6 text-sm leading-relaxed">"{t.text}"</p>
            </div>
            <div className="relative z-10 flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{t.author.split(" ").map((n) => n[0]).join("")}</span>
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">{t.author}</p>
                <p className="text-white/80 text-xs font-medium tracking-wide truncate">{t.local}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const JoinUs = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", subject: "I want to join BEST", message: "" });
  const location = useLocation();

  useEffect(() => {
    document.title = t("joinUs.pageTitle");
  }, [t, i18n.language]);

  useEffect(() => {
    if (location.hash === "#contact") {
      const el = document.getElementById("contact");
      if (el) setTimeout(() => { const y = el.getBoundingClientRect().top + window.scrollY - 96; window.scrollTo({ top: y, behavior: "smooth" }); }, 100);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${formData.firstName} ${formData.lastName}\nContact Email: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=bv-board@BEST-eu.org&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData((p) => ({ ...p, [name]: value })); };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#8b1832]/10 dark:bg-rose-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── HERO ── */}
        <div className="text-center max-w-4xl mx-auto mb-24">

          {/*
            ── RECRUITMENT BADGE ──
            Toggle between OPEN and CLOSED by switching which block is commented.
          */}

          {/* ── OPEN ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-flex items-center gap-3 mb-10"
          >
            {/* Blended gradient pill */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #8b1832dd, #c0392bcc)",
                color: "#fff",
                boxShadow: "0 4px 24px rgba(139,24,50,0.35), 0 1px 0 rgba(255,255,255,0.1) inset",
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              {t("joinUs.hero.badgeOpen")} <strong>{t("joinUs.hero.badgeOpenStrong")}</strong>
            </div>
          </motion.div>

          {/*
            ── CLOSED (uncomment when needed) ──
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-full text-sm font-bold mb-8 border border-gray-300 dark:border-gray-700"
            >
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500 dark:bg-gray-400" />
              </span>
              {t("joinUs.hero.badgeClosed")}
            </motion.div>
          */}

          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-8 transition-colors"
          >
            {t("joinUs.hero.title1")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1832] to-rose-500">{t("joinUs.hero.title2")}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t("joinUs.hero.subtitle")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative inline-block group">
            {/*
              ── APPLY BUTTON ACTIVE (uncomment when open) ──
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-3 bg-[#8b1832] text-white px-10 py-4 rounded-full font-black text-lg hover:bg-rose-900 transition-all shadow-lg hover:-translate-y-1"
              >{t("joinUs.hero.applyBtn")}</a>
            */}
            <button disabled className="inline-flex items-center gap-3 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-10 py-4 rounded-full font-black text-lg cursor-not-allowed transition-all">
              {t("joinUs.hero.applyBtn")}
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[280px] px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              {t("joinUs.hero.closedTooltip1")} <br /> {t("joinUs.hero.closedTooltip2")}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-gray-900 dark:border-b-white" />
            </div>
          </motion.div>
        </div>

        {/* ── BENEFITS 3D CAROUSEL ── */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">{t("joinUs.benefitsSection.heading")}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#8b1832] to-rose-500 mx-auto rounded-full" />
          </div>
          <BenefitsCarousel />
        </div>

      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="mb-32 w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{t("joinUs.testimonials.heading")}</h2>
          <p className="text-gray-400 dark:text-gray-500 text-xs">{t("joinUs.testimonials.pauseHint")}</p>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="flex flex-col gap-6 overflow-hidden">
          <HorizontalMarquee testimonials={testimonialsRow1} direction={-1} />
          <HorizontalMarquee testimonials={testimonialsRow2} direction={1} />
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div id="contact" className="scroll-mt-32">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-rose-50/50 to-transparent dark:from-rose-900/10 pointer-events-none rounded-tr-[2.5rem] rounded-br-[2.5rem]" />

            {/* Centered header */}
            <div className="text-center mb-12 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                {t("joinUs.contact.heading1")} <span className="text-[#8b1832] dark:text-rose-500">{t("joinUs.contact.heading2")}</span>
              </h2>
              <p className="mt-4 text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                {t("joinUs.contact.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">

              {/* LEFT: contact + map */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <ContactBox label={t("joinUs.contact.emailLabel")} value="bv-board@BEST-eu.org" Icon={Mail} />
                <ContactBox label={t("joinUs.contact.phoneLabel")} value="+40764468602" displayValue="+40 764 468 602" Icon={Phone} />
                <div className="flex items-start gap-3 px-4 py-2">
                  <MapPin size={20} className="text-[#8b1832] dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t("joinUs.contact.addressLine1")}<br />{t("joinUs.contact.addressLine2")}
                  </p>
                </div>
                <div className="w-full flex-1 min-h-[240px] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.658607316982!2d25.58661657666245!3d45.6388000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b719be0e2e9%3A0xc4ebbcdd067bf7c9!2sC%C4%83minul%2015!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro"
                    width="100%" height="100%"
                    style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* RIGHT: form */}
              <div className="lg:col-span-7 lg:pl-8 flex flex-col">
                <form className="space-y-5 flex-1 flex flex-col" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{t("joinUs.contact.form.firstName")}</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder={t("joinUs.contact.form.firstNamePlaceholder")} required className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{t("joinUs.contact.form.lastName")}</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder={t("joinUs.contact.form.lastNamePlaceholder")} required className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{t("joinUs.contact.form.email")}</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t("joinUs.contact.form.emailPlaceholder")} required className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{t("joinUs.contact.form.subject")}</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm appearance-none cursor-pointer">
                      <option value="I want to join BEST">{t("joinUs.contact.form.subjectOptions.join")}</option>
                      <option value="Company Partnership Inquiry">{t("joinUs.contact.form.subjectOptions.partnership")}</option>
                      <option value="Other Questions">{t("joinUs.contact.form.subjectOptions.other")}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 flex-1 flex flex-col">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{t("joinUs.contact.form.message")}</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t("joinUs.contact.form.messagePlaceholder")} required className="w-full flex-1 min-h-[120px] px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm resize-none" />
                  </div>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit"
                    className="w-full py-4 bg-[#8b1832] dark:bg-rose-600 text-white rounded-2xl font-bold text-base hover:bg-rose-900 dark:hover:bg-rose-500 transition-colors shadow-md mt-2"
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
  );
};

export default JoinUs;