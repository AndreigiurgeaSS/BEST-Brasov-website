import { Mail, Phone, Check, Copy, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

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
      type="button"
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
      <div className="flex-1 min-w-0 pr-2">
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

// ── Split-Track ArcWheel cu Timer + Buton X de Anulare ───────────────────────
const ARC_CX = 48;
const ARC_CY = 135;
const ARC_R = 138;
const SPREAD = 27;
const DRAG_PX = 32;
const SETTLE_MS = 1600;

function mod(n, m) {
  return ((n % m) + m) % m;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArcSegment(cx, cy, r, startDeg, endDeg) {
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, endDeg);
  const largeArc = Math.abs(endDeg - startDeg) <= 180 ? "0" : "1";
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

const ArcWheel = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRO = i18n.language?.toLowerCase().startsWith("ro");

  const pages = useMemo(
    () => [
      {
        label: t("nav.home"),
        path: "/",
        hint: isRO
          ? "Povestea, misiunea și valorile noastre."
          : "Our story, mission, and core values.",
      },
      {
        label: t("nav.events"),
        path: "/events",
        hint: isRO
          ? "Competiții, cursuri și calendarul anual."
          : "Competitions, courses & yearly calendar.",
      },
      {
        label: t("nav.departments"),
        path: "/departments",
        hint: isRO
          ? "HR, FR, Marketing și IT în culise."
          : "HR, FR, Marketing & IT behind the scenes.",
      },
      {
        label: t("nav.management"),
        path: "/management",
        hint: isRO
          ? "Board-ul local și coordonatorii BEST."
          : "Local Board & department coordinators.",
      },
      {
        label: t("nav.partners"),
        path: "/partners",
        hint: isRO
          ? "Companiile și partenerii noștri."
          : "Companies and partners supporting us.",
      },
      {
        label: t("nav.faq"),
        path: "/faq",
        hint: isRO
          ? "Răspunsuri rapide despre recrutare."
          : "Quick answers about joining BEST.",
      },
      {
        label: t("nav.join"),
        path: "/join",
        hint: isRO
          ? "Aplică în BEST sau contactează-ne."
          : "Apply to BEST or get in touch.",
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

  const [activeIdx, setActiveIdx] = useState(() => getIndexFromPath(location.pathname));
  const [countdownMs, setCountdownMs] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const activeIdxRef = useRef(activeIdx);
  const wheelRef = useRef(null);
  const dragging = useRef(false);
  const isInteracting = useRef(false);
  const startY = useRef(0);
  const startIdx = useRef(0);
  const movedPx = useRef(0);
  const commitTimer = useRef(null);
  const countdownInterval = useRef(null);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useEffect(() => {
    if (!isInteracting.current) {
      setActiveIdx(getIndexFromPath(location.pathname));
    }
  }, [location.pathname, getIndexFromPath]);

  const clearTimers = useCallback(() => {
    if (commitTimer.current) {
      clearTimeout(commitTimer.current);
      commitTimer.current = null;
    }
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
    setIsCountingDown(false);
    setCountdownMs(0);
  }, []);

  // ── Butonul X: oprește instant navigarea și revine la pagina curentă ──
  const handleCancelNavigation = useCallback(
    (e) => {
      e?.stopPropagation();
      clearTimers();
      isInteracting.current = false;
      const currentIdx = getIndexFromPath(location.pathname);
      activeIdxRef.current = currentIdx;
      setActiveIdx(currentIdx);
    },
    [clearTimers, getIndexFromPath, location.pathname]
  );

  const commitNavigation = useCallback(
    (targetIdx) => {
      clearTimers();
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
    [clearTimers, navigate, location.pathname, pages]
  );

  const scheduleCommit = useCallback(
    (targetIdx, delay = SETTLE_MS) => {
      clearTimers();
      const startedAt = Date.now();
      setIsCountingDown(true);
      setCountdownMs(delay);

      countdownInterval.current = setInterval(() => {
        const remaining = Math.max(0, delay - (Date.now() - startedAt));
        setCountdownMs(remaining);
      }, 50);

      commitTimer.current = setTimeout(() => {
        commitNavigation(targetIdx);
      }, delay);
    },
    [clearTimers, commitNavigation]
  );

  useEffect(() => clearTimers, [clearTimers]);

  // Mouse drag doar pe desktop (pe mobil lăsăm scroll-ul nativ liber!)
  const onMouseDown = useCallback(
    (e) => {
      clearTimers();
      dragging.current = true;
      isInteracting.current = true;
      movedPx.current = 0;
      startY.current = e.clientY;
      startIdx.current = activeIdxRef.current;
    },
    [clearTimers]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!dragging.current) return;
      const delta = startY.current - e.clientY;
      movedPx.current = Math.max(movedPx.current, Math.abs(delta));
      if (Math.abs(delta) < 8) return;

      const steps = Math.round(delta / DRAG_PX);
      const nextIdx = mod(startIdx.current + steps, N);
      if (nextIdx !== activeIdxRef.current) {
        activeIdxRef.current = nextIdx;
        setActiveIdx(nextIdx);
      }
    },
    [N]
  );

  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    if (movedPx.current >= 8) {
      scheduleCommit(activeIdxRef.current, SETTLE_MS);
    } else {
      isInteracting.current = false;
    }
  }, [scheduleCommit]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // Scroll wheel pe desktop
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      if (window.innerWidth < 1024) return;
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      isInteracting.current = true;
      const nextIdx = mod(activeIdxRef.current + dir, N);
      activeIdxRef.current = nextIdx;
      setActiveIdx(nextIdx);
      scheduleCommit(nextIdx, SETTLE_MS);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [N, scheduleCommit]);

  const visibleOffsets = [-3, -2, -1, 0, 1, 2, 3];
  const activePage = pages[activeIdx];
  const progressRatio = isCountingDown ? countdownMs / SETTLE_MS : 0;

  return (
    <div
      ref={wheelRef}
      onMouseDown={onMouseDown}
      className="relative select-none touch-pan-y lg:touch-none lg:cursor-grab lg:active:cursor-grabbing"
      style={{ width: "310px", height: "270px", flexShrink: 0 }}
    >
      {/* ── Arc SVG Secționat (7 segmente) ── */}
      <svg
        viewBox="0 0 310 270"
        width="310"
        height="270"
        className="absolute inset-0 overflow-visible pointer-events-none"
      >
        {visibleOffsets.map((offset) => {
          const centerDeg = offset * SPREAD;
          const halfSpan = SPREAD * 0.36;
          const d = describeArcSegment(
            ARC_CX,
            ARC_CY,
            ARC_R,
            centerDeg - halfSpan,
            centerDeg + halfSpan
          );
          const isCenter = offset === 0;
          return (
            <path
              key={offset}
              d={d}
              fill="none"
              stroke={isCenter ? "#ffffff" : "rgba(255,255,255,0.22)"}
              strokeWidth={isCenter ? "3.2" : "1.8"}
              strokeLinecap="round"
              opacity={isCenter ? 1 : Math.max(0.2, 0.75 - Math.abs(offset) * 0.18)}
            />
          );
        })}

        {/* Punct discret pe interiorul arcului */}
        <circle
          cx={ARC_CX + ARC_R - 18}
          cy={ARC_CY}
          r="2.5"
          fill="rgba(255,255,255,0.65)"
        />
      </svg>

      {/* ── Preview + Timer cu Buton X în concavitatea arcului ── */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 pr-3 text-right z-20"
        style={{ width: `${ARC_CX + ARC_R - 26}px` }}
      >
        <AnimatePresence mode="wait">
          {isCountingDown ? (
            <motion.div
              key="timer-active"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-end gap-2"
            >
              <div className="inline-flex items-center gap-2 pl-2.5 pr-1.5 py-1 rounded-full bg-black/45 border border-white/20 shadow-lg">
                {/* Numărătoare inversă */}
                <span className="text-[11px] font-black tabular-nums text-white">
                  {(countdownMs / 1000).toFixed(1)}s
                </span>

                {/* Bară mini de progres */}
                <span className="w-8 h-1.5 rounded-full bg-white/15 overflow-hidden">
                  <span
                    className="block h-full bg-emerald-400 rounded-full"
                    style={{ width: `${Math.round(progressRatio * 100)}%` }}
                  />
                </span>

                {/* Buton X evident pentru a anula schimbarea paginii */}
                <button
                  type="button"
                  onClick={handleCancelNavigation}
                  onMouseDown={(e) => e.stopPropagation()}
                  aria-label={isRO ? "Anulează navigarea" : "Cancel navigation"}
                  className="w-6 h-6 rounded-full bg-rose-500 hover:bg-rose-400 active:scale-90 text-white flex items-center justify-center shadow-md ring-2 ring-white/30 transition-transform cursor-pointer"
                >
                  <X size={13} strokeWidth={3} />
                </button>
              </div>
              <p className="text-[10px] font-semibold text-rose-200/80">
                {isRO ? "Apasă X pentru a anula" : "Tap X to cancel"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`hint-${activeIdx}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-end gap-1 pointer-events-none"
            >
              <p className="text-xs font-extrabold text-white/95 leading-tight tracking-wide">
                {activePage.label}
              </p>
              <p className="text-[11px] text-rose-100/65 dark:text-gray-400 leading-snug">
                {activePage.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Etichetele paginilor pe exteriorul arcului ── */}
      {visibleOffsets.map((offset) => {
        const idx = mod(activeIdx + offset, N);
        const pos = polarToCartesian(ARC_CX, ARC_CY, ARC_R, offset * SPREAD);
        const absOffset = Math.abs(offset);
        const isCenter = offset === 0;
        const opacity = isCenter ? 1 : Math.max(0.22, 0.72 - absOffset * 0.16);
        const fontSize = isCenter ? 16 : Math.max(11, 13.5 - absOffset * 0.9);

        return (
          <button
            key={offset}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (movedPx.current >= 8) return;
              isInteracting.current = true;
              activeIdxRef.current = idx;
              setActiveIdx(idx);
              scheduleCommit(idx, SETTLE_MS);
            }}
            style={{
              position: "absolute",
              left: `${pos.x + 16}px`,
              top: `${pos.y}px`,
              transform: "translateY(-50%)",
              fontSize: `${fontSize}px`,
              fontWeight: isCenter ? 800 : 500,
              color: `rgba(255,255,255,${opacity})`,
            }}
            className="whitespace-nowrap cursor-pointer tracking-wide transition-opacity duration-200 py-1.5 px-1 text-left"
          >
            {isCenter ? `> ${pages[idx].label}` : pages[idx].label}
          </button>
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
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#4F0028] to-[#320019] dark:from-[#1d0208] dark:to-[#0f0103] text-gray-200 pt-14 pb-28 lg:pb-8 border-t border-white/10 dark:border-rose-950/60 transition-colors duration-300">
      {/* Watermark uriaș BEST în fundal */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-10 lg:bottom-2 left-1/2 -translate-x-1/2 text-[110px] sm:text-[180px] lg:text-[230px] font-black tracking-tighter text-white/[0.035] leading-none whitespace-nowrap"
      >
        BEST
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center pb-10">
          {/* Col 1: Brand */}
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

          {/* Col 2: Arc Navigation Wheel */}
          <div className="lg:col-span-4 flex justify-center">
            <ArcWheel />
          </div>

          {/* Col 3: Socials & Contacts */}
          <div className="lg:col-span-4 flex flex-col items-center gap-5 w-full max-w-[300px] mx-auto lg:mx-0 lg:ml-auto">
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

            <div className="flex flex-col gap-2.5 w-full">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-200/60 dark:text-gray-500 text-center">
                Contacts
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
        <div className="pt-6 border-t border-white/10 dark:border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-rose-200/60 dark:text-gray-500 text-center">
          <p>{t("footer.rights", { year })}</p>
          <p className="flex items-center gap-1.5">
            {t("footer.madeWith")} <span className="text-rose-400 animate-heartbeat">❤️</span>{" "}
            <span className="text-white/90 font-semibold">{t("footer.byItDept")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;