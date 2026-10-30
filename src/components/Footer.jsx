import { Mail, Phone, Check, Copy } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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

// ── Arc Navigation Wheel (Locked Drag + Smooth Spring Animation) ─────────────
const ARC_CX    = 20;
const ARC_CY    = 120;
const ARC_R     = 150;
const SPREAD    = 28;
const DRAG_PX   = 44;
const SETTLE_MS = 650;

function mod(n, m) {
  return ((n % m) + m) % m;
}

const ArcWheel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const pages = useMemo(
    () => [
      { label: t("nav.home"),        path: "/" },
      { label: t("nav.events"),      path: "/events" },
      { label: t("nav.departments"), path: "/departments" },
      { label: t("nav.management"),  path: "/management" },
      { label: t("nav.partners"),    path: "/partners" },
      { label: t("nav.faq"),         path: "/faq" },
      { label: t("nav.join"),        path: "/join" },
    ],
    [t]
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
  const [isSelecting, setIsSelecting] = useState(false);

  const dragging      = useRef(false);
  const isInteracting = useRef(false);
  const startY        = useRef(0);
  const startIdx      = useRef(0);
  const movedPx       = useRef(0);
  const commitTimer   = useRef(null);
  const activeIdxRef  = useRef(activeIdx);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useEffect(() => {
    if (!isInteracting.current) {
      setActiveIdx(getIndexFromPath(location.pathname));
    }
  }, [location.pathname, getIndexFromPath]);

  const commitNavigation = useCallback(
    (targetIdx) => {
      if (commitTimer.current) clearTimeout(commitTimer.current);
      setIsSelecting(false);
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
      if (commitTimer.current) clearTimeout(commitTimer.current);
      const currentUrlIdx = getIndexFromPath(location.pathname);

      if (targetIdx === currentUrlIdx) {
        setIsSelecting(false);
        isInteracting.current = false;
        return;
      }

      setIsSelecting(true);
      commitTimer.current = setTimeout(() => {
        commitNavigation(targetIdx);
      }, delay);
    },
    [commitNavigation, getIndexFromPath, location.pathname]
  );

  useEffect(() => {
    return () => {
      if (commitTimer.current) clearTimeout(commitTimer.current);
    };
  }, []);

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

  const onStart = useCallback((e) => {
    if (commitTimer.current) clearTimeout(commitTimer.current);
    dragging.current      = true;
    isInteracting.current = true;
    movedPx.current       = 0;
    startY.current        = getClientY(e);
    startIdx.current      = activeIdxRef.current;
  }, []);

  const onMove = useCallback(
    (e) => {
      if (!dragging.current) return;

      if (e.cancelable) {
        e.preventDefault();
      }

      const delta = startY.current - getClientY(e);
      movedPx.current = Math.max(movedPx.current, Math.abs(delta));

      if (Math.abs(delta) < 8) return;

      const steps   = Math.round(delta / DRAG_PX);
      const nextIdx = mod(startIdx.current + steps, N);

      if (nextIdx !== activeIdxRef.current) {
        activeIdxRef.current = nextIdx;
        setActiveIdx(nextIdx);
        setIsSelecting(true);
      }
    },
    [N]
  );

  const onEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;

    if (movedPx.current >= 8) {
      scheduleCommit(activeIdxRef.current, 450);
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

  const activePos   = getPos(0);
  const arcPath     = `M ${ARC_CX},${ARC_CY - ARC_R + 30} A ${ARC_R},${ARC_R} 0 0,1 ${ARC_CX},${ARC_CY + ARC_R - 30}`;
  const arcApexX    = ARC_CX + Math.sqrt(ARC_R * ARC_R - (ARC_R - 30) * (ARC_R - 30));
  const pointerEndX = activePos.x + 2;

  return (
    <div
      className="relative select-none touch-none cursor-grab active:cursor-grabbing"
      style={{
        width: "260px",
        height: "240px",
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
        viewBox="0 0 260 240"
        width="260"
        height="240"
        style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="50%" stopColor={isSelecting ? "rgba(251,113,133,0.65)" : "rgba(255,255,255,0.38)"} />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>

          <linearGradient id="pointerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor={isSelecting ? "#fda4af" : "rgba(255,255,255,0.9)"} />
          </linearGradient>
        </defs>

        <motion.path
          d={arcPath}
          fill="none"
          stroke="rgba(251,113,133,0.3)"
          strokeLinecap="round"
          animate={{
            strokeWidth: isSelecting ? 5 : 0,
            opacity: isSelecting ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ filter: "blur(4px)" }}
        />

        <path
          d={arcPath}
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <motion.circle
          cx={arcApexX}
          cy={ARC_CY}
          key={`halo-${activeIdx}`}
          initial={{ r: 12, opacity: 0.5 }}
          animate={{
            r: isSelecting ? 10 : 7,
            opacity: 1,
            fill: isSelecting ? "rgba(251,113,133,0.32)" : "rgba(255,255,255,0.14)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        <circle cx={arcApexX} cy={ARC_CY} r="3.5" fill="white" />

        <motion.g
          key={`pointer-${activeIdx}`}
          initial={{ x: -5, opacity: 0.5 }}
          animate={{ x: isSelecting ? 3 : 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
        >
          <line
            x1={arcApexX + 7}
            y1={ARC_CY}
            x2={pointerEndX - 2}
            y2={ARC_CY}
            stroke="url(#pointerGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d={`M ${pointerEndX - 6},${ARC_CY - 3.5} L ${pointerEndX},${ARC_CY} L ${pointerEndX - 6},${ARC_CY + 3.5}`}
            fill="none"
            stroke={isSelecting ? "#fda4af" : "white"}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>

      {visibleOffsets.map((offset) => {
        const idx        = mod(activeIdx + offset, N);
        const pos        = getPos(offset);
        const absOffset  = Math.abs(offset);
        const opacity    = offset === 0 ? 1 : Math.max(0.08, 0.58 - absOffset * 0.17);
        const fontSize   = offset === 0 ? 16.5 : Math.max(9.5, 13 - absOffset * 1.3);
        const fontWeight = offset === 0 ? 700 : 400;

        return (
          <motion.div
            key={idx}
            initial={false}
            animate={{
              left: pos.x + 14,
              top: pos.y,
              y: "-50%",
              opacity,
              scale: offset === 0 ? 1.05 : 1 - absOffset * 0.04,
              filter: absOffset >= 3 ? "blur(0.6px)" : "blur(0px)",
            }}
            whileHover={{
              x: 4,
              opacity: Math.min(1, opacity + 0.25),
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 26,
              mass: 0.85,
            }}
            onClick={() => {
              if (movedPx.current > 8) return;
              activeIdxRef.current = idx;
              setActiveIdx(idx);
              commitNavigation(idx);
            }}
            style={{
              position:        "absolute",
              transformOrigin: "left center",
              fontSize:        `${fontSize}px`,
              fontWeight,
              color:           "#ffffff",
              whiteSpace:      "nowrap",
              cursor:          "pointer",
              letterSpacing:   "0.02em",
              pointerEvents:   "auto",
              padding:         "4px 0",
              userSelect:      "none",
              touchAction:     "none",
              willChange:      "left, top, opacity, transform",
            }}
          >
            {pages[idx].label}
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

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center pb-12">
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
          <div className="lg:col-span-4 flex justify-center lg:justify-start lg:pl-12">
            <ArcWheel />
          </div>

          {/* Dreapta (Contacte & Socials) */}
          <div className="lg:col-span-4 flex flex-col items-center gap-5 w-full max-w-[280px] mx-auto lg:mx-0 lg:ml-auto lg:-pl-8">
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


            {/* NUMAR DE TELEFON (cand trebuie schimbat) */}
            <div className="flex flex-col gap-2.5 w-full">
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
            {t("footer.madeWith")} <span className="text-rose-400">🩷</span>{" "}
            <span className="text-white/90 font-semibold">{t("footer.byItDept")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;