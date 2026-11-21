import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  animate,
} from "framer-motion";
import { Star, Users, Unlock, Lightbulb, TrendingUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useEcoMode } from "../context/EcoModeContext";

const valueIcons = [Star, Users, Unlock, Lightbulb, TrendingUp];

const CylinderCard = ({
  item,
  index,
  stepDeg,
  rotation,
  radius,
  cardW,
  cardH,
  isMobile,
  onHoverStart,
  onHoverEnd,
  onSelectCard,
}) => {
  const baseAngle = index * stepDeg;
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const tiltX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), {
    stiffness: 280,
    damping: 24,
  });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 280,
    damping: 24,
  });
  const liftY = useSpring(0, { stiffness: 300, damping: 22 });

  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([mx, my]) =>
      `radial-gradient(200px circle at ${mx * 100}% ${my * 100}%, rgba(79, 0, 40, 0.22), transparent 75%)`
  );

  const x = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    return Math.sin(rad) * radius;
  });

  const z = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    return Math.cos(rad) * radius - radius * 0.25;
  });

  const rotateY = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    return Math.sin(rad) * (isMobile ? -32 : -25);
  });

  const scale = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    const depth = (Math.cos(rad) + 1) / 2;
    return isMobile ? 0.72 + depth * 0.28 : 0.65 + depth * 0.35;
  });

  const opacity = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    const cos = Math.cos(rad);
    if (cos < 0.05) return 0;
    const normalized = (cos - 0.05) / 0.95;
    return Math.pow(normalized, 1.35);
  });

  const zIndex = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    return Math.round((Math.cos(rad) + 1) * 50);
  });

  const pointerEvents = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    return Math.cos(rad) < 0.1 ? "none" : "auto";
  });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    liftY.set(-8);
    onHoverStart();
  };

  const handleLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
    liftY.set(0);
    onHoverEnd();
  };

  const Icon = item.icon;

  return (
    <motion.div
      style={{
        width: cardW,
        height: cardH,
        x,
        z,
        rotateY,
        scale,
        opacity,
        zIndex,
        pointerEvents,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform, opacity",
      }}
      onMouseEnter={handleEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onClick={() => onSelectCard(baseAngle)}
      className="absolute select-none cursor-pointer"
    >
      <motion.div
        style={{
          rotateX: isHovered && !isMobile ? tiltX : 0,
          rotateY: isHovered && !isMobile ? tiltY : 0,
          y: liftY,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="relative w-full h-full rounded-[1.75rem] bg-white dark:bg-[#1a0303] border border-gray-200/90 dark:border-rose-950/70 md:hover:border-[#4F0028]/70 dark:md:hover:border-rose-400/60 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.65)] md:hover:shadow-[0_20px_45px_rgba(79,0,40,0.28)] transition-colors duration-300 p-4 sm:p-5 flex flex-col items-center justify-center text-center overflow-hidden group"
      >
        {!isMobile && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: spotlightBg }}
          />
        )}

        <div
          className="relative mb-3 sm:mb-3.5 flex items-center justify-center"
          style={{ transform: "translateZ(24px)" }}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-rose-50 dark:bg-[#2d0707] border border-rose-100 dark:border-rose-900/50 md:group-hover:bg-gradient-to-br md:group-hover:from-[#4F0028] md:group-hover:to-[#7a0b3b] md:group-hover:border-transparent flex items-center justify-center text-[#4F0028] dark:text-rose-400 md:group-hover:text-white shadow-sm transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <h3
          style={{ transform: "translateZ(16px)" }}
          className="text-sm sm:text-base font-black text-gray-900 dark:text-white mb-1.5 sm:mb-2 uppercase tracking-wider md:group-hover:text-[#4F0028] dark:md:group-hover:text-rose-400 transition-colors duration-300"
        >
          {item.title}
        </h3>

        <p
          style={{ transform: "translateZ(10px)" }}
          className="text-gray-600 dark:text-gray-300 text-[11px] sm:text-xs leading-relaxed"
        >
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

const CoreValues = () => {
  const { t } = useTranslation();
  const { isEcoMode } = useEcoMode();

  const sectionRef = useRef(null);
  const isInViewRef = useRef(true);

  const [dims, setDims] = useState({
    radius: 380,
    cardW: 215,
    cardH: 250,
    stageH: 400,
    isMobile: false,
  });

  useEffect(() => {
    const updateDims = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDims({ radius: 155, cardW: 185, cardH: 225, stageH: 315, isMobile: true });
      } else if (w < 1024) {
        setDims({ radius: 300, cardW: 195, cardH: 235, stageH: 360, isMobile: false });
      } else {
        setDims({ radius: 380, cardW: 215, cardH: 250, stageH: 400, isMobile: false });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Oprește bucla 3D când secțiunea nu este vizibilă pe ecran (economisește mult CPU/baterie pe mobil)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const translatedItems = t("coreValues.items", { returnObjects: true });
  const baseValues = (Array.isArray(translatedItems) ? translatedItems : []).map(
    (item, idx) => ({
      ...item,
      icon: valueIcons[idx % valueIcons.length],
    })
  );

  const activeItems = dims.isMobile ? baseValues : [...baseValues, ...baseValues];
  const stepDeg = 360 / (activeItems.length || 1);

  const rotation = useMotionValue(0);

  const targetSpeed = useMotionValue(1);
  const smoothSpeed = useSpring(targetSpeed, {
    stiffness: 55,
    damping: 18,
    mass: 0.9,
  });

  const isDragging = useRef(false);
  const isCentering = useRef(false);
  const dragDistance = useRef(0);
  const lastPointerX = useRef(0);
  const centerAnimRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  useAnimationFrame((_, delta) => {
    if (isEcoMode || !isInViewRef.current || isDragging.current || isCentering.current) {
      return;
    }
    const degPerMs = -0.0085 * smoothSpeed.get();
    rotation.set(rotation.get() + Math.min(delta, 40) * degPerMs);
  });

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePause = () => targetSpeed.set(0);
  const handleResume = () => {
    if (!isDragging.current && !isCentering.current) {
      targetSpeed.set(1);
    }
  };

  const handleSelectCard = (baseAngle) => {
    if (dragDistance.current > 8) return;

    if (centerAnimRef.current) centerAnimRef.current.stop();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    isCentering.current = true;
    targetSpeed.set(0);

    const currentRot = rotation.get();
    const currentCardAngle = (currentRot + baseAngle) % 360;
    let deltaDeg = -currentCardAngle;
    if (deltaDeg > 180) deltaDeg -= 360;
    if (deltaDeg < -180) deltaDeg += 360;

    centerAnimRef.current = animate(rotation, currentRot + deltaDeg, {
      type: "spring",
      stiffness: 120,
      damping: 20,
      onComplete: () => {
        isCentering.current = false;
        if (dims.isMobile && !isEcoMode) {
          resumeTimeoutRef.current = setTimeout(() => {
            if (!isDragging.current) targetSpeed.set(1);
          }, 1800);
        }
      },
    });
  };

  const handlePointerDown = (e) => {
    if (centerAnimRef.current) {
      centerAnimRef.current.stop();
      isCentering.current = false;
    }
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    isDragging.current = true;
    dragDistance.current = 0;
    targetSpeed.set(0);
    lastPointerX.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastPointerX.current;
    dragDistance.current += Math.abs(deltaX);
    lastPointerX.current = e.clientX;
    rotation.set(rotation.get() + deltaX * (dims.isMobile ? 0.42 : 0.28));
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    targetSpeed.set(1);
  };

  const edgeMask = dims.isMobile
    ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
    : "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

  return (
    <section ref={sectionRef} className="relative pt-12 sm:pt-14 pb-16 bg-transparent">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[760px] h-[280px] z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79, 0, 40, 0.22) 0%, rgba(79, 0, 40, 0) 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-10 relative z-10">
        <div className="text-center mb-2 sm:mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-wider uppercase"
          >
            <span className="text-[#4F0028] dark:text-rose-400">
              {t("coreValues.titleHighlight")}
            </span>{" "}
            {t("coreValues.titleEnd")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-16 h-1.5 bg-[#4F0028] dark:bg-rose-400 mx-auto mt-4 rounded-full"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto sm:px-10 relative z-10">
        <div
          className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{
            height: `${dims.stageH}px`,
            perspective: dims.isMobile ? "950px" : "1200px",
            maskImage: edgeMask,
            WebkitMaskImage: edgeMask,
          }}
          onMouseEnter={() => !dims.isMobile && handlePause()}
          onMouseLeave={() => {
            if (!dims.isMobile) {
              handlePointerUp();
              handleResume();
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {activeItems.map((item, index) => (
              <CylinderCard
                key={`${dims.isMobile ? "m" : "d"}-${index}`}
                item={item}
                index={index}
                stepDeg={stepDeg}
                rotation={rotation}
                radius={dims.radius}
                cardW={dims.cardW}
                cardH={dims.cardH}
                isMobile={dims.isMobile}
                onHoverStart={handlePause}
                onHoverEnd={handleResume}
                onSelectCard={handleSelectCard}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;