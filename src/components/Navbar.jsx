import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  Home,
  Calendar,
  Layers,
  Users,
  Handshake,
  HelpCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const COLORS = ["#ff4d6d", "#ff9f1c", "#2ec4b6", "#4cc9f0", "#f72585", "#ffffff", "#ffd60a"];
const PARTICLE_COUNT = 40;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle(originX, originY) {
  const angle = randomBetween(0, Math.PI * 2);
  const speed = randomBetween(120, 320);
  return {
    id: Math.random(),
    x: originX,
    y: originY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - randomBetween(60, 160),
    rotation: randomBetween(0, 360),
    rotationSpeed: randomBetween(-600, 600),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: randomBetween(5, 11),
    shape: Math.random() > 0.5 ? "rect" : "circle",
    opacity: 1,
    life: 1,
  };
}

function ConfettiBurst({ origin, onDone }) {
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(origin.x, origin.y)
    );
    let rafId = null;
    let lastTime = null;
    let cancelled = false;

    const GRAVITY = 420;
    const DRAG = 0.97;

    function tick(timestamp) {
      if (cancelled) return;
      if (!lastTime) lastTime = timestamp;
      const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life > 0);

      for (const p of particles) {
        p.vx *= DRAG;
        p.vy += GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.rotationSpeed * dt;
        p.life -= dt * 0.9;
        p.opacity = Math.max(0, p.life);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (particles.length > 0) {
        rafId = requestAnimationFrame(tick);
      } else {
        onDoneRef.current?.();
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [origin]);

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />,
    document.body
  );
}

// ── Pill Switch Unificat EN / RO ─────────────────────────────────────────────
const LanguageSwitch = ({ lang, onToggle, compact = false }) => {
  const isRO = lang === "RO";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label="Toggle language between English and Romanian"
      className={`relative inline-flex items-center bg-black/25 dark:bg-white/10 border border-white/15 hover:border-white/30 rounded-full p-0.5 sm:p-1 cursor-pointer select-none transition-colors flex-shrink-0 ${
        compact ? "w-[58px] h-7" : "w-[76px] h-8"
      }`}
    >
      <motion.div
        initial={false}
        animate={{ x: isRO ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="w-1/2 h-full rounded-full bg-white dark:bg-[#4F0028] shadow-sm"
      />

      <div className="absolute inset-0 grid grid-cols-2 items-center text-[10px] sm:text-[11px] font-black tracking-wider">
        <span
          className={`text-center transition-colors duration-200 ${
            !isRO ? "text-[#4F0028] dark:text-white" : "text-white/65"
          }`}
        >
          EN
        </span>
        <span
          className={`text-center transition-colors duration-200 ${
            isRO ? "text-[#4F0028] dark:text-white" : "text-white/65"
          }`}
        >
          RO
        </span>
      </div>
    </button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [confettiOrigin, setConfettiOrigin] = useState(null);

  const lastScrollYRef = useRef(0);
  const lastBurstTimeRef = useRef(0);
  const joinBtnRef = useRef(null);
  const location = useLocation();

  const { t, i18n } = useTranslation();

  const initialLang =
    i18n.language && i18n.language.toLowerCase().startsWith("ro") ? "RO" : "EN";
  const [lang, setLang] = useState(initialLang);

  const toggleLanguage = () => {
    const nextLang = lang === "EN" ? "RO" : "EN";
    setLang(nextLang);
    i18n.changeLanguage(nextLang.toLowerCase());
  };

  // Închide automat drawer-ul când se schimbă ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Blochează scroll-ul paginii când Side Drawer-ul e deschis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Ascundere lină la scroll în jos / reapariție la scroll în sus
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.isAutoScrolling) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const shouldShow = !(currentScrollY > lastScrollYRef.current && currentScrollY > 100);
      setIsVisible(shouldShow);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleConfettiDone = useCallback(() => {
    setConfettiOrigin(null);
  }, []);

  const triggerConfetti = useCallback((e) => {
    const now = Date.now();
    if (now - lastBurstTimeRef.current < 800) return;
    lastBurstTimeRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    setConfettiOrigin({
      id: now,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, []);

  const navLinks = [
    { name: t("nav.home"), path: "/", icon: Home },
    { name: t("nav.events"), path: "/events", icon: Calendar },
    { name: t("nav.departments"), path: "/departments", icon: Layers },
    { name: t("nav.management"), path: "/management", icon: Users },
    { name: t("nav.partners"), path: "/partners", icon: Handshake },
    { name: t("nav.faq"), path: "/faq", icon: HelpCircle },
  ];

  const isRO = lang === "RO";

  return (
    <>
      {confettiOrigin && (
        <ConfettiBurst
          key={confettiOrigin.id}
          origin={confettiOrigin}
          onDone={handleConfettiDone}
        />
      )}

      {/* ── Top Navbar: Floating Glass Pill pe mobil/tabletă, bară completă pe desktop ── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 pointer-events-none lg:pointer-events-auto
          ${isVisible || isOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="px-3 pt-2.5 lg:p-0">
          <nav
            className={`pointer-events-auto mx-auto rounded-2xl lg:rounded-none backdrop-blur-md shadow-lg border lg:border-0 lg:border-b transition-colors duration-300
              ${
                isDarkMode
                  ? "bg-[#180202]/92 border-rose-900/50 lg:bg-[#180202]/95 lg:border-rose-950/60"
                  : "bg-[#4F0028]/95 border-white/15 lg:bg-[#4F0028]/95 lg:border-white/10"
              }`}
          >
            <div className="w-full mx-auto px-3.5 sm:px-6 lg:px-16 2xl:px-24">
              <div className="flex justify-between items-center h-16 lg:h-24 gap-2">
                {/* Logo + Desktop Controls */}
                <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
                  <Link to="/" className="flex items-center cursor-pointer">
                    <img
                      src="/images/logos/logo-BestBV.png"
                      alt="BEST Brașov Logo"
                      className="h-11 sm:h-12 lg:h-20 w-auto hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Pe Desktop rămân lângă logo (exact ca înainte) */}
                  <div className="hidden lg:flex items-center gap-4">
                    <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
                    <button
                      type="button"
                      onClick={toggleDarkMode}
                      aria-label="Toggle theme"
                      className="p-2 text-white dark:text-gray-300 hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                    >
                      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  </div>
                </div>

                {/* Desktop links */}
                <div className="hidden lg:flex space-x-6 items-center">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="relative group py-2 text-rose-50 dark:text-gray-200 hover:text-white text-sm font-bold transition-colors"
                      >
                        {link.name}
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-white dark:bg-rose-400 rounded-full transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>
                    );
                  })}

                  <Link
                    to="/join"
                    ref={joinBtnRef}
                    onClick={triggerConfetti}
                    className="relative inline-flex items-center px-6 py-2.5 ml-2 text-sm font-bold text-[#4F0028] dark:text-white bg-white dark:bg-[#4F0028] rounded-full shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
                  >
                    <span className="relative z-10">{t("nav.join")}</span>
                  </Link>
                </div>

                {/* Mobil & Tabletă Top Bar (Dreapta): Join Us! + EN/RO + Tema */}
                <div className="lg:hidden flex items-center gap-1.5 sm:gap-2.5">
                  <Link
                    to="/join"
                    onClick={triggerConfetti}
                    className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-white dark:bg-[#4F0028] text-[#4F0028] dark:text-white text-[11px] sm:text-xs font-black tracking-wide shadow-sm active:scale-95 transition-transform whitespace-nowrap border border-transparent dark:border-rose-400/35"
                  >
                    {t("nav.join")}
                  </Link>

                  <LanguageSwitch lang={lang} onToggle={toggleLanguage} compact />

                  <button
                    type="button"
                    onClick={toggleDarkMode}
                    aria-label="Toggle theme"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex-shrink-0"
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Buton Plutitor Jos-Dreapta (Thumb Zone, doar pe mobil & tabletă) ── */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.94 }}
        className={`lg:hidden fixed right-4 bottom-5 z-[70] inline-flex items-center gap-2.5 pl-4 pr-3.5 py-3 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-[0_10px_30px_rgba(0,0,0,0.35)] border backdrop-blur-md transition-colors duration-200 cursor-pointer select-none
          ${
            isOpen
              ? "bg-white text-[#4F0028] border-white/60"
              : isDarkMode
              ? "bg-[#2a040e]/95 text-white border-rose-400/35"
              : "bg-[#4F0028]/95 text-white border-white/25"
          }`}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <span>{isOpen ? (isRO ? "Închide" : "Close") : isRO ? "Meniu" : "Menu"}</span>
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isOpen ? "bg-[#4F0028]/10 text-[#4F0028]" : "bg-white/15 text-rose-200"
          }`}
        >
          {isOpen ? <X size={15} strokeWidth={2.5} /> : <Menu size={15} strokeWidth={2.5} />}
        </span>
      </motion.button>

      {/* ── Side Drawer din Dreapta + Backdrop Blur Clickabil (mobil & tabletă) ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[60]">
            {/* Backdrop pe stânga: tap oriunde închide meniul */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[5px]"
            />

            {/* Sertarul lateral (80% din lățime, max 320px) */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              className={`absolute top-0 right-0 h-full w-[82%] max-w-[320px] flex flex-col border-l shadow-2xl
                ${
                  isDarkMode
                    ? "bg-gradient-to-b from-[#200308] via-[#160204] to-[#0f0102] border-rose-900/50"
                    : "bg-gradient-to-b from-[#4F0028] via-[#3c001e] to-[#290014] border-white/15"
                }`}
            >
              {/* Header Drawer */}
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/10">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center"
                >
                  <img
                    src="/images/logos/logo-BestBV.png"
                    alt="BEST Brașov"
                    className="h-11 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Lista de pagini (ușor de atins cu degetul) */}
              <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-1.5">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;

                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + idx * 0.035, duration: 0.22 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`relative flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-[15px] transition-all ${
                          isActive
                            ? "bg-white/18 text-white shadow-sm"
                            : "text-rose-50/85 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                        }`}
                      >
                        {/* Bară fină de accent pentru pagina activă */}
                        {isActive && (
                          <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-rose-300" />
                        )}

                        <span className="flex items-center gap-3.5">
                          <span
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                              isActive
                                ? "bg-white/20 text-rose-200"
                                : "bg-white/[0.07] text-rose-200/80"
                            }`}
                          >
                            <Icon size={18} />
                          </span>
                          <span>{link.name}</span>
                        </span>

                        <ChevronRight
                          size={16}
                          className={isActive ? "text-rose-200" : "text-white/35"}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer Drawer: CTA Join Us! (lăsând loc jos pentru butonul Close plutitor) */}
              <div
                className="px-5 pt-4 pb-24 border-t border-white/10"
                style={{ paddingBottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}
              >
                <Link
                  to="/join"
                  onClick={(e) => {
                    triggerConfetti(e);
                    setIsOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-[#4F0028] text-[#4F0028] dark:text-white py-3.5 rounded-2xl font-black text-sm tracking-wide shadow-xl active:scale-95 transition-transform border border-transparent dark:border-rose-400/40"
                >
                  <span>{t("nav.join")}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;