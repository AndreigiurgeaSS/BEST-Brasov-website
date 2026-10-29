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

  const tiltX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), {
    stiffness: 280,
    damping: 22,
  });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), {
    stiffness: 280,
    damping: 22,
  });
  const liftY = useSpring(0, { stiffness: 300, damping: 20 });

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
    if (isMobile) {
      if (cos < -0.15) return 0;
      const normalized = (cos + 0.15) / 1.15;
      return Math.pow(normalized, 1.6);
    }
    const depth = (cos + 1) / 2;
    return 0.12 + Math.pow(depth, 1.65) * 0.88;
  });

  const cardFilter = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    const cos = Math.cos(rad);
    if (cos > 0.75) return "blur(0px)";
    const blurPx = isMobile ? (1 - cos) * 1.8 : (1 - cos) * 1.1;
    return `blur(${Math.min(2.5, Math.max(0, blurPx)).toFixed(1)}px)`;
  });

  const zIndex = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    return Math.round((Math.cos(rad) + 1) * 50);
  });

  const pointerEvents = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    return isMobile && Math.cos(rad) < -0.1 ? "none" : "auto";
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
        filter: cardFilter,
        zIndex,
        pointerEvents,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
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
        }}
        className="relative w-full h-full rounded-[1.75rem] bg-white dark:bg-[#1a0303] border border-gray-200/90 dark:border-rose-950/70 md:hover:border-[#4F0028]/70 dark:md:hover:border-rose-400/60 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.65)] md:hover:shadow-[0_20px_45px_rgba(79,0,40,0.28)] transition-colors duration-300 p-4 sm:p-5 flex flex-col items-center justify-center text-center overflow-hidden group"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBg }}
        />

        <motion.div
          initial={false}
          animate={isHovered && !isMobile ? { x: ["-130%", "130%"] } : { x: "-130%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 dark:via-white/[0.06] to-transparent -skew-x-12"
        />

        <div
          className="relative mb-3 sm:mb-3.5 flex items-center justify-center"
          style={{ transform: "translateZ(26px)" }}
        >
          <motion.div
            animate={
              isHovered && !isMobile
                ? { scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }
                : { scale: 0.8, opacity: 0 }
            }
            transition={{
              duration: 1.6,
              repeat: isHovered && !isMobile ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-2xl bg-[#4F0028]/35 blur-md pointer-events-none"
          />

          <motion.div
            animate={
              isHovered && !isMobile
                ? { y: -4, scale: 1.12, rotate: [0, -7, 7, 0] }
                : { y: 0, scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-rose-50 dark:bg-[#2d0707] border border-rose-100 dark:border-rose-900/50 md:group-hover:bg-gradient-to-br md:group-hover:from-[#4F0028] md:group-hover:to-[#7a0b3b] md:group-hover:border-transparent flex items-center justify-center text-[#4F0028] dark:text-rose-400 md:group-hover:text-white shadow-sm md:group-hover:shadow-lg md:group-hover:shadow-[#4F0028]/40 transition-colors duration-300"
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        </div>

        <h3
          style={{ transform: "translateZ(18px)" }}
          className="text-sm sm:text-base font-black text-gray-900 dark:text-white mb-1.5 sm:mb-2 uppercase tracking-wider md:group-hover:text-[#4F0028] dark:md:group-hover:text-rose-400 transition-colors duration-300"
        >
          {item.title}
        </h3>

        <p
          style={{ transform: "translateZ(12px)" }}
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

  const [dims, setDims] = useState({
    radius: 380,
    cardW: 215,
    cardH: 250,
    stageH: 320,
    isMobile: false,
  });

  useEffect(() => {
    const updateDims = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDims({
          radius: 155,
          cardW: 185,
          cardH: 225,
          stageH: 275,
          isMobile: true,
        });
      } else if (w < 1024) {
        setDims({
          radius: 300,
          cardW: 195,
          cardH: 235,
          stageH: 295,
          isMobile: false,
        });
      } else {
        setDims({
          radius: 380,
          cardW: 215,
          cardH: 250,
          stageH: 320,
          isMobile: false,
        });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
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
    if (isDragging.current || isCentering.current) return;
    const degPerMs = -0.0085 * smoothSpeed.get();
    rotation.set(rotation.get() + delta * degPerMs);
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
        if (dims.isMobile) {
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

  return (
    <section className="relative pt-20 sm:pt-14 pb-20 bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:to-[#140202] transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[760px] h-[240px] bg-gradient-to-r from-[#4F0028]/5 via-[#4F0028]/15 to-[#4F0028]/5 rounded-full blur-3xl z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-10 relative z-10">
        <div className="text-center mb-8 sm:mb-10">
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-gray-50 dark:from-[#230404] to-transparent z-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-gray-50 dark:from-[#230404] to-transparent z-40" />

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