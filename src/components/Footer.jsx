import { Mail, Phone, Check, Copy } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

// ── Interactive Glass Contact Pill ────────────────────────────────────────────
const CopyableContact = ({ label, value, displayValue, Icon, copiedText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title="Click to copy"
      className="group flex items-center gap-3 w-full px-3.5 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all duration-300 text-left cursor-pointer"
    >
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
          copied
            ? "bg-emerald-500/20 text-emerald-300"
            : "bg-white/10 text-rose-200 group-hover:bg-white group-hover:text-[#4F0028]"
        }`}
      >
        {copied ? <Check size={15} /> : <Icon size={15} />}
      </div>
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/45 leading-none mb-1">
          {copied ? copiedText : label}
        </p>
        <p className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white truncate">
          {displayValue}
        </p>
      </div>
      <Copy
        size={13}
        className="text-white/25 group-hover:text-white/70 transition-colors flex-shrink-0"
      />
    </button>
  );
};

// ── Design "E - Split-Track" + Preview dinamic în interiorul arcului ─────────
const ARC_CX    = 24;
const ARC_CY    = 125;
const ARC_R     = 146;
const SPREAD    = 26;
const DRAG_PX   = 48;
const SETTLE_MS = 1150;

function mod(n, m) {
  return ((n % m) + m) % m;
}

function describeArc(cx, cy, r, startAngleDeg, endAngleDeg) {
  if (startAngleDeg === endAngleDeg) return "";
  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad   = (endAngleDeg * Math.PI) / 180;

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = Math.abs(endAngleDeg - startAngleDeg) <= 180 ? "0" : "1";
  const sweepFlag = endAngleDeg >= startAngleDeg ? "1" : "0";

  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
}

const ArcWheel = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRO = !!i18n.language && i18n.language.toLowerCase().startsWith("ro");

  const pages = useMemo(
    () => [
      {
        label: t("nav.home"),
        path: "/",
        hint: t("footer.wheelHints.home", {
          defaultValue: isRO
            ? "Povestea, misiunea și valorile noastre."
            : "Our story, mission, and core values.",
        }),
      },
      {
        label: t("nav.events"),
        path: "/events",
        hint: t("footer.wheelHints.events", {
          defaultValue: isRO
            ? "Calendar, competiții și cursuri internaționale."
            : "Calendar, competitions & European courses.",
        }),
      },
      {
        label: t("nav.departments"),
        path: "/departments",
        hint: t("footer.wheelHints.departments", {
          defaultValue: isRO
            ? "HR, Fundraising, Marketing și IT."
            : "HR, Fundraising, Marketing & IT.",
        }),
      },
      {
        label: t("nav.management"),
        path: "/management",
        hint: t("footer.wheelHints.management", {
          defaultValue: isRO
            ? "Board-ul local și coordonatorii."
            : "Local Board & department coordinators.",
        }),
      },
      {
        label: t("nav.partners"),
        path: "/partners",
        hint: t("footer.wheelHints.partners", {
          defaultValue: isRO
            ? "Companiile și instituțiile care ne susțin."
            : "Companies & institutions supporting us.",
        }),
      },
      {
        label: t("nav.faq"),
        path: "/faq",
        hint: t("footer.wheelHints.faq", {
          defaultValue: isRO
            ? "Răspunsuri rapide despre BEST."
            : "Quick answers about joining BEST.",
        }),
      },
      {
        label: t("nav.join"),
        path: "/join",
        hint: t("footer.wheelHints.join", {
          defaultValue: isRO
            ? "Recrutări, beneficii și contact direct."
            : "Recruitment, benefits & direct contact.",
        }),
      },
    ],
    [t, isRO]
  );

  const N = pages.length;

  const getIndexFromPath = useCallback(
    (pathname) => {
      const found = pages.findIndex(
        (p) => p.path === pathname || (p.path !== "/" && pathname.startsWith(p.path))
      );
      return found !== -1 ? found : 0;
    },
    [pages]
  );

  const [activeIdx, setActiveIdx]     = useState(() => getIndexFromPath(location.pathname));
  const [wheelStep, setWheelStep]     = useState(0);
  const [hoveredIdx, setHoveredIdx]   = useState(null);

  const [isNavigating, setIsNavigating] = useState(false);
  const [countdown, setCountdown] = useState({
    active: false,
    remainingMs: 0,
    totalMs: SETTLE_MS,
  });

  const dragging       = useRef(false);
  const isInteracting  = useRef(false);
  const startY         = useRef(0);
  const startIdx       = useRef(0);
  const startWheelStep = useRef(0);
  const movedPx        = useRef(0);
  const commitTimer    = useRef(null);
  const countdownRaf   = useRef(null);
  const activeIdxRef   = useRef(activeIdx);
  const wheelStepRef   = useRef(0);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useEffect(() => {
    if (!isInteracting.current && !isNavigating) {
      setActiveIdx(getIndexFromPath(location.pathname));
    }
  }, [location.pathname, getIndexFromPath, isNavigating]);

  const stopCountdown = useCallback(() => {
    if (commitTimer.current) clearTimeout(commitTimer.current);
    if (countdownRaf.current) cancelAnimationFrame(countdownRaf.current);
    setCountdown((prev) =>
      prev.active ? { active: false, remainingMs: 0, totalMs: SETTLE_MS } : prev
    );
    setIsNavigating(false);
  }, []);

  const commitNavigation = useCallback(
    (targetIdx) => {
      setIsNavigating(false);
      isInteracting.current = false;
      const targetPath = pages[targetIdx].path;
      window.isAutoScrolling = true;

      if (location.pathname !== targetPath) {
        navigate(targetPath);
      }
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          window.isAutoScrolling = false;
        }, 900);
      }, 60);
    },
    [navigate, location.pathname, pages]
  );

  const scheduleCommit = useCallback(
    (targetIdx, delay = SETTLE_MS) => {
      stopCountdown();
      const startTime = performance.now();

      const updateTimer = (now) => {
        const elapsed = now - startTime;
        const remaining = Math.max(0, delay - elapsed);
        setCountdown({ active: true, remainingMs: remaining, totalMs: delay });

        if (remaining > 0) {
          countdownRaf.current = requestAnimationFrame(updateTimer);
        } else {
          setIsNavigating(true);
          commitTimer.current = setTimeout(() => {
            commitNavigation(targetIdx);
          }, 250);
        }
      };
      countdownRaf.current = requestAnimationFrame(updateTimer);
    },
    [commitNavigation, stopCountdown]
  );

  useEffect(() => {
    return () => stopCountdown();
  }, [stopCountdown]);

  function getPos(offsetSteps) {
    const angleDeg = offsetSteps * SPREAD;
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: ARC_CX + ARC_R * Math.cos(rad),
      y: ARC_CY + ARC_R * Math.sin(rad),
    };
  }

  const visibleOffsets = [-3, -2, -1, 0, 1, 2, 3];
  const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

  const onStart = useCallback(
    (e) => {
      stopCountdown();
      dragging.current       = true;
      isInteracting.current  = true;
      movedPx.current        = 0;
      startY.current         = getClientY(e);
      startIdx.current       = activeIdxRef.current;
      startWheelStep.current = wheelStepRef.current;
    },
    [stopCountdown]
  );

  const onMove = useCallback(
    (e) => {
      if (!dragging.current) return;
      if (e.cancelable) e.preventDefault();

      const delta = startY.current - getClientY(e);
      movedPx.current = Math.max(movedPx.current, Math.abs(delta));

      if (Math.abs(delta) < 10) return;

      const steps   = Math.round(delta / DRAG_PX);
      const nextIdx = mod(startIdx.current + steps, N);
      const nextWheelStep = startWheelStep.current + steps;

      if (nextIdx !== activeIdxRef.current || nextWheelStep !== wheelStepRef.current) {
        activeIdxRef.current = nextIdx;
        wheelStepRef.current = nextWheelStep;
        setActiveIdx(nextIdx);
        setWheelStep(nextWheelStep);
        setHoveredIdx(nextIdx);
      }
    },
    [N]
  );

  const onEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setHoveredIdx(null);

    if (movedPx.current >= 10) {
      scheduleCommit(activeIdxRef.current, SETTLE_MS);
    } else {
      isInteracting.current = false;
    }
  }, [scheduleCommit]);

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("mouseup",   onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend",  onEnd);
    window.addEventListener("touchcancel", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend",  onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [onMove, onEnd]);

  const wheelRotationDeg = -wheelStep * SPREAD;
  const arcApexX = ARC_CX + ARC_R;

  const trackAngles = useMemo(() => {
    const arr = [];
    for (let i = -7; i <= 7; i++) arr.push(i);
    return arr;
  }, []);

  const fillAmount = countdown.active
    ? Math.max(0, Math.min(1, 1 - countdown.remainingMs / countdown.totalMs))
    : 0;

  const displayFill = isNavigating ? 1 : fillAmount;
  const activePage = pages[activeIdx];

  return (
    <div
      className="relative select-none touch-none cursor-grab active:cursor-grabbing mx-auto lg:mx-0"
      style={{
        width: "300px",
        height: "250px",
        flexShrink: 0,
        touchAction: "none",
        overscrollBehavior: "contain",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        onStart(e);
      }}
      onTouchStart={(e) => {
        onStart(e);
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      <svg
        viewBox="0 0 300 250"
        width="300"
        height="250"
        style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="wheelFadeMaskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="black" />
            <stop offset="15%" stopColor="white" />
            <stop offset="85%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <mask id="wheelArcMask">
            <rect x="-40" y="0" width="300" height="250" fill="url(#wheelFadeMaskGrad)" />
          </mask>

          {/* Gradient pentru linia fină dintre descrierea din interior și arc */}
          <linearGradient id="innerConnectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop
              offset="100%"
              stopColor={
                countdown.active || isNavigating
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(253,164,175,0.55)"
              }
            />
          </linearGradient>
        </defs>

        <g mask="url(#wheelArcMask)">
          <motion.g
            initial={false}
            animate={{ rotate: wheelRotationDeg }}
            transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.85 }}
            style={{ transformOrigin: `${ARC_CX}px ${ARC_CY}px` }}
          >
            {trackAngles.map((i) => (
              <path
                key={i}
                d={describeArc(ARC_CX, ARC_CY, ARC_R, i * SPREAD - 10.5, i * SPREAD + 10.5)}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
            ))}
          </motion.g>
        </g>

        {/* Linia fină care leagă preview-ul din interiorul arcului de segmentul activ */}
        <line
          x1={arcApexX - 28}
          y1={ARC_CY}
          x2={arcApexX - 6}
          y2={ARC_CY}
          stroke="url(#innerConnectorGrad)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle
          cx={arcApexX - 28}
          cy={ARC_CY}
          r="2"
          fill={countdown.active || isNavigating ? "#ffffff" : "#fda4af"}
          opacity={countdown.active || isNavigating ? 0.95 : 0.65}
        />

        {/* TIMER-UL LUMINOS: Se umple exact pe segmentul central */}
        {(countdown.active || isNavigating) && displayFill > 0 && (
          <path
            d={describeArc(ARC_CX, ARC_CY, ARC_R, -10.5 * displayFill, 10.5 * displayFill)}
            stroke="#ffffff"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" }}
          />
        )}

        {/* EFECT DE WARP / FLASH la final */}
        <AnimatePresence>
          {isNavigating && (
            <motion.path
              initial={{ scale: 1, opacity: 0.8, strokeWidth: 5 }}
              animate={{ scale: 1.15, opacity: 0, strokeWidth: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              d={describeArc(ARC_CX, ARC_CY, ARC_R, -11, 11)}
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              style={{ transformOrigin: `${ARC_CX}px ${ARC_CY}px`, filter: "blur(1px)" }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* PREVIEW DINAMIC ÎN INTERIORUL ARCULUI (se schimbă odată cu roata) */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 pr-2 text-right"
        style={{ width: `${arcApexX - 34}px` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex flex-col items-end gap-1"
          >
            <p className="text-xs font-extrabold text-white/95 leading-tight tracking-wide">
              {activePage.label}
            </p>
            <p className="text-[11px] text-rose-100/65 dark:text-gray-400 leading-snug">
              {activePage.hint}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TEXTELE PAGINILOR (aliniate perfect vertical cu Flexbox) */}
      {visibleOffsets.map((offset) => {
        const idx       = mod(activeIdx + offset, N);
        const pos       = getPos(offset);
        const absOffset = Math.abs(offset);

        const isHovered = hoveredIdx === idx;
        const isCenter  = offset === 0;

        const opacity    = isCenter ? 1 : isHovered ? 1 : absOffset === 1 ? 0.78 : absOffset === 2 ? 0.5 : 0.25;
        const fontSize   = isCenter ? 17.5 : absOffset === 1 ? 14 : absOffset === 2 ? 12.5 : 11;
        const fontWeight = isCenter || isHovered ? 800 : 500;

        const xPadding = 12;

        const textGlow =
          isCenter && isNavigating
            ? "0 0 15px rgba(255,255,255,0.9), 0 0 25px rgba(251,113,133,0.8)"
            : isCenter && fillAmount > 0.85
            ? "0 0 10px rgba(255,255,255,0.5)"
            : "none";

        const textScale = isNavigating && isCenter ? 1.15 : isCenter ? 1.05 : isHovered ? 1.03 : 1;

        return (
          <motion.div
            key={offset}
            initial={false}
            animate={{
              left: pos.x + xPadding,
              top: pos.y,
              y: "-50%",
              opacity,
              scale: textScale,
            }}
            whileHover={{ x: 4, opacity: 1, scale: 1.05 }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.8 }}
            onClick={() => {
              if (movedPx.current > 10) return;
              if (idx !== activeIdxRef.current) {
                const stepDiff = offset;
                activeIdxRef.current = idx;
                wheelStepRef.current = wheelStepRef.current + stepDiff;
                setActiveIdx(idx);
                setWheelStep(wheelStepRef.current);
                setHoveredIdx(idx);
                scheduleCommit(idx, SETTLE_MS);
              } else {
                commitNavigation(idx);
              }
            }}
            className="flex items-center gap-1.5"
            style={{
              position:        "absolute",
              transformOrigin: "left center",
              fontSize:        `${fontSize}px`,
              fontWeight,
              color:           isCenter && isNavigating ? "#ffffff" : isCenter && countdown.active ? "#fecdd3" : "#ffffff",
              textShadow:      textGlow,
              whiteSpace:      "nowrap",
              cursor:          "pointer",
              letterSpacing:   "0.02em",
              pointerEvents:   "auto",
              padding:         "6px",
              userSelect:      "none",
              touchAction:     "none",
              willChange:      "left, top, opacity, transform, text-shadow",
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{
                opacity: isCenter ? 1 : 0,
                x: isCenter ? 0 : -5,
              }}
              className="text-[15px] font-black text-rose-200 flex-shrink-0 relative -top-[1px]"
              style={{ lineHeight: 1 }}
            >
              {">"}
            </motion.span>
            <span style={{ lineHeight: 1 }} className="flex-shrink-0">
              {pages[idx].label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const socials = [
    {
      name: "Facebook",
      href: "https://web.facebook.com/BESTBrasov",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/bestbrasov/",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@bestbrasov",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91.04.14 1.59.88 3.14 2.05 4.34 1.25 1.25 2.94 1.96 4.71 2.07v4.06c-1.89-.04-3.7-.68-5.26-1.83v6.52c0 3.73-3.02 6.75-6.75 6.75-3.73 0-6.75-3.02-6.75-6.75 0-3.73 3.02-6.75 6.75-6.75 1.05 0 2.04.24 2.94.67V13.5c-.87-.39-1.87-.58-2.94-.58-2.07 0-3.75 1.68-3.75 3.75 0 2.07 1.68 3.75 3.75 3.75 2.07 0 3.75-1.68 3.75-3.75V.02z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/best-brasov",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#4F0028] to-[#2a0015] dark:from-[#240404] dark:to-[#0c0101] text-gray-200 pt-14 pb-8 border-t border-white/10 dark:border-rose-950/50 transition-colors duration-300">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[220px] bg-rose-500/10 blur-3xl rounded-full" />

      {/* Watermark uriaș „BEST” în fundal, întins până în spațiul din fața Contacts */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 bottom-28 sm:bottom-[78px] overflow-hidden z-0"
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex justify-center lg:justify-start">
          <span className="font-black uppercase leading-[0.78] tracking-[0.06em] lg:tracking-[0.22em] text-[34vw] sm:text-[26vw] lg:text-[250px] text-white/[0.04] dark:text-rose-200/[0.03]">
            BEST
          </span>
        </div>
      </div>

      {/* Alternativă: dacă vrei logo-ul BEST Brașov ca watermark în spatele descrierii/roții, decomentează mai jos:
      <img
        src="/images/logos/logo-BestBV.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -left-16 -bottom-16 w-[360px] sm:w-[440px] opacity-[0.04] grayscale brightness-200 z-0"
      />
      */}

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center pb-12">
          {/* Stânga (Brand & Info) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block"
            >
              <img
                src="/images/logos/logo-BestBV.png"
                alt="BEST Brașov Logo"
                className="h-16 sm:h-20 w-auto hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <p className="text-sm text-rose-100/80 dark:text-gray-400 max-w-xs leading-relaxed text-center lg:text-left">
              {t("footer.description")}
            </p>
          </div>

          {/* Centru (Arc Wheel) */}
          <div className="lg:col-span-4 flex justify-center items-center py-2">
            <ArcWheel />
          </div>

          {/* Dreapta (Socials + Contacts) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-5 w-full max-w-[280px] mx-auto lg:mx-0 lg:ml-auto">
            <div className="flex flex-col items-center gap-2.5 w-full">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-200/60 dark:text-gray-500 text-center">
                {t("footer.followUs")}
              </p>
              <div className="flex justify-center gap-2.5">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-10 h-10 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#4F0028] hover:border-white hover:-translate-y-1 shadow-sm transition-all duration-300"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 w-full pt-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-200/60 dark:text-gray-500 text-center">
                {t("footer.contacts", { defaultValue: "Contacts" })}
              </p>
              <CopyableContact
                label="Email"
                value="bv-board@BEST-eu.org"
                displayValue="bv-board@BEST-eu.org"
                Icon={Mail}
                copiedText={t("footer.copied")}
              />
              <CopyableContact
                label="Phone"
                value="+40730827778"
                displayValue="+40 730 827 778"
                Icon={Phone}
                copiedText={t("footer.copied")}
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 dark:border-rose-950/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-rose-200/60 dark:text-gray-500">
          <p>{t("footer.rights").replace("{{year}}", year)}</p>
          <p className="flex items-center gap-1.5">
            {t("footer.madeWith")}{" "}
            <motion.span
              animate={{ scale: [1, 1.28, 1, 1.18, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.75)] select-none"
              aria-label="love"
            >
              ❤️
            </motion.span>{" "}
            <span className="text-white/90 font-semibold">{t("footer.byItDept")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;