import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(origin.x, origin.y)
    );

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const GRAVITY = 420;
    const DRAG = 0.97;

    function tick(timestamp) {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
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

      if (particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onDone();
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [confettiOrigin, setConfettiOrigin] = useState(null);
  const joinBtnRef = useRef(null);
  
  // Detectăm ruta curentă pentru sublinieri
  const location = useLocation();

  // ── Blur ONLY the page content (flex-grow div + footer) behind the menu ──
  useEffect(() => {
    const appRoot = document.getElementById("root")?.firstElementChild;

    if (!appRoot) return;

    const contentChildren = Array.from(appRoot.children).filter(
      (el) => el.tagName.toLowerCase() !== "nav"
    );

    if (isOpen) {
      document.body.style.overflow = "hidden";
      contentChildren.forEach((el) => {
        el.style.filter = "blur(6px) brightness(0.4)";
        el.style.transition = "filter 0.3s ease";
        el.style.pointerEvents = "none";
        el.style.userSelect = "none";
      });
    } else {
      document.body.style.overflow = "";
      contentChildren.forEach((el) => {
        el.style.filter = "";
        el.style.transition = "filter 0.3s ease";
        el.style.pointerEvents = "";
        el.style.userSelect = "";
      });
    }

    return () => {
      document.body.style.overflow = "";
      contentChildren.forEach((el) => {
        el.style.filter = "";
        el.style.pointerEvents = "";
        el.style.userSelect = "";
      });
    };
  }, [isOpen]);

  // ── Scroll hide/show ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // scroll-ul vine de la buton (automat), 
      if (window.isAutoScrolling) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return; // Oprim execuția aici
      }

      // Comportamentul normal 
      setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ── Dark mode ─────────────────────────────────────────────────────────────
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

  // ── Confetti trigger ──────────────────────────────────────────────────────
  const triggerConfetti = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setConfettiOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Departments", path: "/departments" },
    { name: "Management", path: "/management" },
    { name: "Partners", path: "/partners" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      {/* Confetti burst */}
      {confettiOrigin && (
        <ConfettiBurst
          origin={confettiOrigin}
          onDone={() => setConfettiOrigin(null)}
        />
      )}

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-lg border-b transition-transform duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${isDarkMode ? "bg-gray-950/90 border-gray-800" : "bg-[#8b1832]/95 border-white/10"}`}
      >
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 2xl:px-24">
          <div className="flex justify-between items-center h-24">

            {/* Logo + dark mode */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Link to="/" className="flex items-center cursor-pointer z-50">
                <img
                  src="/images/logos/logo-BestBV.png"
                  alt="BEST Brașov Logo"
                  className="h-16 sm:h-20 w-auto hover:scale-105 transition-transform"
                />
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-white dark:text-gray-400 hover:bg-white/20 rounded-full transition-colors z-50"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Desktop links - VIZIBIL DE LA LG (LAPTOP) ÎN SUS */}
            <div className="hidden lg:flex space-x-6 items-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative group py-2 text-rose-50 dark:text-gray-300 hover:text-white text-sm font-bold transition-colors"
                  >
                    {link.name}
                    {/* Subliniere simplă pentru pagina activă */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-white dark:bg-rose-500 rounded-full transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                );
              })}

              <Link
                to="/join"
                ref={joinBtnRef}
                onMouseEnter={triggerConfetti}
                className="relative inline-flex items-center px-6 py-2.5 ml-2 text-sm font-bold text-[#8b1832] dark:text-white bg-white dark:bg-rose-700 rounded-full shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <span className="relative z-10">Join Us!</span>
              </Link>
            </div>

            {/* Hamburger - VIZIBIL ȘI PE TABLETĂ (PÂNĂ LA LG) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 z-50"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* ── Mobile & Tablet dropdown ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden absolute top-24 left-0 w-full border-t border-white/10 overflow-hidden z-50
                ${isDarkMode ? "bg-gray-950/95" : "bg-[#8b1832]/95"}`}
            >
              <div className="grid grid-cols-2 gap-3 p-6 sm:max-w-2xl sm:mx-auto">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-center py-4 rounded-xl font-bold text-sm transition-all ${
                        isActive
                          ? "bg-white/25 dark:bg-gray-800 text-white border-2 border-white/40 dark:border-rose-500 shadow-sm"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="px-6 pb-8 sm:max-w-2xl sm:mx-auto">
                <Link
                  to="/join"
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={triggerConfetti}
                  className="w-full bg-white dark:bg-rose-700 text-[#8b1832] dark:text-white py-4 rounded-2xl font-black text-center block shadow-xl"
                >
                  Join Us!
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;