import { Mail, Phone, Check, Copy } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";

// ── Interactive Glass Contact Pill ────────────────────────────────────────────
const CopyableContact = ({ label, value, displayValue, Icon }) => {
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
      className="group flex items-center gap-3 w-full px-3.5 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all duration-300 text-left"
    >
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
          copied
            ? "bg-emerald-500/20 text-emerald-300"
            : "bg-white/10 text-rose-200 group-hover:bg-white group-hover:text-[#6b1226]"
        }`}
      >
        {copied ? <Check size={15} /> : <Icon size={15} />}
      </div>
      <div className="flex-1 min-w-0 pr-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/45 leading-none mb-1">
          {copied ? "Copied!" : label}
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

// ── Arc Navigation Wheel (Open Arc + Auto-Navigate on Spin) ───────────────────
const pages = [
  { label: "Home",        path: "/" },
  { label: "Events",      path: "/events" },
  { label: "Departments", path: "/departments" },
  { label: "Management",  path: "/management" },
  { label: "Partners",    path: "/partners" },
  { label: "FAQ",         path: "/faq" },
  { label: "Join Us",     path: "/join" },
];

const N       = pages.length;
const ARC_CX  = 20;   // circle center X
const ARC_CY  = 120;  // circle center Y
const ARC_R   = 150;  // radius
const SPREAD  = 28;   // degrees between items
const DRAG_PX = 30;   // pixels per step

function mod(n, m) {
  return ((n % m) + m) % m;
}

const ArcWheel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getIndexFromPath = useCallback((pathname) => {
    const found = pages.findIndex(
      (p) => p.path === pathname || (p.path !== "/" && pathname.startsWith(p.path))
    );
    return found !== -1 ? found : 0;
  }, []);

  const [activeIdx, setActiveIdx] = useState(() => getIndexFromPath(location.pathname));

  const wheelRef      = useRef(null);
  const dragging      = useRef(false);
  const startY        = useRef(0);
  const startIdx      = useRef(0);
  const userSpunRef   = useRef(false);

  // Sincronizare cu URL-ul când schimbi pagina din altă parte (ex: Navbar)
  useEffect(() => {
    const urlIdx = getIndexFromPath(location.pathname);
    if (!userSpunRef.current) {
      setActiveIdx(urlIdx);
    }
  }, [location.pathname, getIndexFromPath]);

  // Navigare AUTOMATĂ instant când învârți roata sus/jos
  useEffect(() => {
    if (!userSpunRef.current) return;

    const targetPath = pages[activeIdx].path;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
    userSpunRef.current = false;
  }, [activeIdx, navigate, location.pathname]);

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
      dragging.current = true;
      startY.current   = getClientY(e);
      startIdx.current = activeIdx;
    },
    [activeIdx]
  );

  const onMove = useCallback((e) => {
    if (!dragging.current) return;
    const delta = startY.current - getClientY(e);
    const steps = Math.round(delta / DRAG_PX);
    const nextIdx = mod(startIdx.current + steps, N);

    setActiveIdx((prev) => {
      if (prev !== nextIdx) {
        userSpunRef.current = true;
        return nextIdx;
      }
      return prev;
    });
  }, []);

  const onEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend",  onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend",  onEnd);
    };
  }, [onMove, onEnd]);

  // Suport pentru rotirea cu rotița mouse-ului -> schimbă pagina automat
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      userSpunRef.current = true;
      setActiveIdx((prev) => mod(prev + dir, N));
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const activePos = getPos(0);

  return (
    <div
      ref={wheelRef}
      className="relative select-none cursor-grab active:cursor-grabbing"
      style={{ width: "240px", height: "240px", flexShrink: 0 }}
      onMouseDown={onStart}
      onTouchStart={(e) => {
        onStart(e);
        e.preventDefault();
      }}
    >
      <svg
        viewBox="0 0 240 240"
        width="240"
        height="240"
        style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
      >
        {/* Arcada deschisă */}
        <path
          d={`M ${ARC_CX},${ARC_CY - ARC_R + 30} A ${ARC_R},${ARC_R} 0 0,1 ${ARC_CX},${ARC_CY + ARC_R - 30}`}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Glow fin pe punctul activ */}
        <circle
          cx={activePos.x - 8}
          cy={activePos.y}
          r="8"
          fill="rgba(255,255,255,0.14)"
        />

        {/* Active dot on arc line */}
        <circle
          cx={activePos.x - 8}
          cy={activePos.y}
          r="4"
          fill="white"
          opacity="0.95"
        />

        {/* Arrow → next to dot */}
        <text
          x={activePos.x - 1}
          y={activePos.y + 4}
          fontSize="11"
          fill="rgba(255,255,255,0.7)"
          fontFamily="sans-serif"
        >
          →
        </text>
      </svg>

      {/* Page labels */}
      {visibleOffsets.map((offset) => {
        const idx        = mod(activeIdx + offset, N);
        const pos        = getPos(offset);
        const absOffset  = Math.abs(offset);
        const opacity    = offset === 0 ? 1 : Math.max(0.08, 0.58 - absOffset * 0.17);
        const fontSize   = offset === 0 ? 16 : Math.max(9.5, 13 - absOffset * 1.3);
        const fontWeight = offset === 0 ? 700 : 400;

        return (
          <div
            key={offset}
            onClick={() => {
              userSpunRef.current = true;
              setActiveIdx(idx);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              position:      "absolute",
              left:          `${pos.x + 12}px`,
              top:           `${pos.y}px`,
              transform:     "translateY(-50%)",
              fontSize:      `${fontSize}px`,
              fontWeight,
              color:         `rgba(255,255,255,${opacity})`,
              whiteSpace:    "nowrap",
              cursor:        "pointer",
              letterSpacing: "0.02em",
              transition:    "all 0.3s ease",
              pointerEvents: "auto",
              padding:       "4px 0",
              userSelect:    "none",
            }}
          >
            {pages[idx].label}
          </div>
        );
      })}
    </div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => {
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
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#6b1226] to-[#4c0b1a] dark:from-gray-950 dark:to-black text-gray-200 pt-14 pb-8 border-t border-white/10 dark:border-gray-900 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[220px] bg-rose-500/10 blur-3xl rounded-full" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center pb-12">

          {/* Col 1: Brand & Story (Stânga - 5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start gap-4">
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

            <p className="text-sm text-rose-100/80 dark:text-gray-400 max-w-xs leading-relaxed text-center md:text-left">
              Developing students since 1997. Empowering the next generation of engineers, leaders, and innovators at Transilvania University.
            </p>
          </div>

          {/* Col 2: Arc Navigation Wheel (Centru - 3 cols) */}
          <div className="md:col-span-3 flex justify-center md:-ml-4">
            <ArcWheel />
          </div>

          {/* Col 3: Dreapta (4 cols) — Follow Us sus + Contactele una sub alta jos */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-5 w-full max-w-[260px] mx-auto md:mx-0 md:pl-4">
            
            {/* Socials */}
            <div className="flex flex-col items-center md:items-start gap-2.5 w-full">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-200/60 dark:text-gray-500">
                Follow Us
              </p>
              <div className="flex gap-2.5">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-10 h-10 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#6b1226] hover:border-white hover:-translate-y-1 shadow-sm transition-all duration-300"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Email & Phone una sub alta */}
            <div className="flex flex-col gap-2.5 w-full">
              <CopyableContact
                label="Email"
                value="bv-board@BEST-eu.org"
                displayValue="bv-board@BEST-eu.org"
                Icon={Mail}
              />
              <CopyableContact
                label="Phone"
                value="+40764468602"
                displayValue="+40 764 468 602"
                Icon={Phone}
              />
            </div>

          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-white/10 dark:border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-rose-200/60 dark:text-gray-500">
          <p>BEST Brașov © {year}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-rose-400 animate-pulse">❤️</span> by the{" "}
            <span className="text-white/90 font-semibold">IT Department</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;