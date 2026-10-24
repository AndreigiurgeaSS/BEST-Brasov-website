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

const baseValues = [
  {
    icon: Star,
    title: "FUN",
    desc: "We love what we do, and we want everyone who participates in our activities and events to feel the same.",
  },
  {
    icon: Users,
    title: "FRIENDSHIP",
    desc: "We build lasting relationships, standing by each other through good times and bad times.",
  },
  {
    icon: Unlock,
    title: "FLEXIBILITY",
    desc: "We are open to new ideas. Whatever happens, we seek solutions to adapt.",
  },
  {
    icon: Lightbulb,
    title: "OPEN MINDEDNESS",
    desc: "We aim to improve ourselves every day. If we become better, then those around us also evolve.",
  },
  {
    icon: TrendingUp,
    title: "IMPROVEMENT",
    desc: "We learn from every experience, event, or even a simple conversation with another BEST member.",
  },
];

// 10 panouri pe cilindru pentru continuitate circulară 3D
const cylinderItems = [...baseValues, ...baseValues];
const ITEM_COUNT = cylinderItems.length;
const STEP_DEG = 360 / ITEM_COUNT;

// ── Card individual cu 3D Magnetic Tilt + Cursor Spotlight + Click-to-Center ─
const CylinderCard = ({
  item,
  index,
  rotation,
  radius,
  cardW,
  cardH,
  onHoverStart,
  onHoverEnd,
  onSelectCard,
}) => {
  const baseAngle = index * STEP_DEG;
  const [isHovered, setIsHovered] = useState(false);

  // Valori pentru 3D Magnetic Tilt & Spotlight la hover
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [11, -11]), {
    stiffness: 260,
    damping: 22,
  });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-11, 11]), {
    stiffness: 260,
    damping: 22,
  });
  const liftY = useSpring(0, { stiffness: 280, damping: 20 });

  // Spotlight radial care urmărește cursorul pe card
  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([mx, my]) =>
      `radial-gradient(240px circle at ${mx * 100}% ${my * 100}%, rgba(244, 63, 94, 0.16), transparent 75%)`
  );

  // Coordonatele pe cilindrul 3D
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
    return Math.sin(rad) * -26;
  });

  const scale = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    const depth = (Math.cos(rad) + 1) / 2;
    return 0.66 + depth * 0.34;
  });

  const opacity = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    const depth = (Math.cos(rad) + 1) / 2;
    return 0.16 + Math.pow(depth, 1.5) * 0.84;
  });

  const zIndex = useTransform(rotation, (r) => {
    const rad = ((r + baseAngle) * Math.PI) / 180;
    return Math.round((Math.cos(rad) + 1) * 50);
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleEnter = () => {
    setIsHovered(true);
    liftY.set(-10);
    onHoverStart();
  };

  const handleLeave = () => {
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
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
      onMouseEnter={handleEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onClick={() => onSelectCard(baseAngle)}
      className="absolute select-none cursor-pointer"
    >
      {/* Wrapper interior pentru Magnetic 3D Tilt la hover */}
      <motion.div
        style={{
          rotateX: isHovered ? tiltX : 0,
          rotateY: isHovered ? tiltY : 0,
          y: liftY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-3xl bg-white dark:bg-[#151c2c] border border-gray-200/90 dark:border-gray-700/80 hover:border-[#8b1832]/60 dark:hover:border-rose-500/60 shadow-[0_14px_35px_rgba(0,0,0,0.07)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_22px_50px_rgba(139,24,50,0.25)] transition-colors duration-300 p-5 sm:p-6 flex flex-col items-center justify-center text-center overflow-hidden group"
      >
        {/* Spotlight interactiv care urmărește mouse-ul */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBg }}
        />

        {/* Iconiță cu levitație + inel pulsatoriu la hover */}
        <div
          className="relative mb-4 flex items-center justify-center"
          style={{ transform: "translateZ(24px)" }}
        >
          {/* Halo animat în spatele iconiței */}
          <motion.div
            animate={
              isHovered
                ? { scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }
                : { scale: 0.85, opacity: 0 }
            }
            transition={{
              duration: 1.8,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-2xl bg-rose-500/30 blur-md pointer-events-none"
          />

          <motion.div
            animate={
              isHovered
                ? { y: -4, scale: 1.1, rotate: [0, -6, 6, 0] }
                : { y: 0, scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/50 group-hover:bg-gradient-to-br group-hover:from-[#8b1832] group-hover:to-rose-600 group-hover:border-transparent flex items-center justify-center text-[#8b1832] dark:text-rose-400 group-hover:text-white shadow-sm group-hover:shadow-lg group-hover:shadow-rose-900/30 transition-colors duration-300"
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </div>

        {/* Titlu */}
        <h3
          style={{ transform: "translateZ(18px)" }}
          className="text-base sm:text-lg font-black text-gray-900 dark:text-white mb-2 uppercase tracking-wider group-hover:text-[#8b1832] dark:group-hover:text-rose-400 transition-colors duration-300"
        >
          {item.title}
        </h3>

        {/* Descriere */}
        <p
          style={{ transform: "translateZ(12px)" }}
          className="text-gray-600 dark:text-gray-300 text-xs sm:text-[13px] leading-relaxed"
        >
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

// ── Secțiunea Principală CoreValues ──────────────────────────────────────────
const CoreValues = () => {
  // Dimensiuni mai mici și proporționate
  const [dims, setDims] = useState({
    radius: 440,
    cardW: 240,
    cardH: 275,
    stageH: 360,
  });

  useEffect(() => {
    const updateDims = () => {
      const w = window.innerWidth;
      if (w < 640) {
        // Telefon
        setDims({ radius: 220, cardW: 195, cardH: 240, stageH: 300 });
      } else if (w < 1024) {
        // Tabletă
        setDims({ radius: 340, cardW: 220, cardH: 255, stageH: 330 });
      } else {
        // Laptop / Desktop — carduri mai compacte, lăsând spațiu de respirație
        setDims({ radius: 450, cardW: 240, cardH: 275, stageH: 360 });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  const rotation = useMotionValue(0);

  // Viteza lină cu inerție la oprire și repornire
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

  useAnimationFrame((_, delta) => {
    if (isDragging.current || isCentering.current) return;
    const degPerMs = -0.0085 * smoothSpeed.get();
    rotation.set(rotation.get() + delta * degPerMs);
  });

  const handlePause = () => targetSpeed.set(0);
  const handleResume = () => {
    if (!isDragging.current && !isCentering.current) {
      targetSpeed.set(1);
    }
  };

  // Click pe orice card lateral -> îl aduce lin în centru pe drumul cel mai scurt
  const handleSelectCard = (baseAngle) => {
    // Ignorăm click-ul dacă utilizatorul tocmai a tras de carusel (drag)
    if (dragDistance.current > 8) return;

    if (centerAnimRef.current) centerAnimRef.current.stop();
    isCentering.current = true;
    targetSpeed.set(0);

    const currentRot = rotation.get();
    // Calculăm diferența unghiulară minimă în intervalul [-180, 180]
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
      },
    });
  };

  // Drag / Swipe manual
  const handlePointerDown = (e) => {
    if (centerAnimRef.current) {
      centerAnimRef.current.stop();
      isCentering.current = false;
    }
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
    rotation.set(rotation.get() + deltaX * 0.28);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    targetSpeed.set(1);
  };

  return (
    <section className="relative pt-14 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Glow ambiental */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[850px] h-[280px] bg-gradient-to-r from-rose-500/5 via-[#8b1832]/10 to-rose-500/5 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Titlul */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-wider uppercase"
          >
            <span className="text-[#8b1832] dark:text-rose-500">BEST</span> VALUES
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-16 h-1.5 bg-[#8b1832] dark:bg-rose-500 mx-auto mt-5 rounded-full"
          />
        </div>

        {/* Scena 3D cu o mică margine laterală curată */}
        <div
          className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{
            height: `${dims.stageH}px`,
            perspective: "1300px",
          }}
          onMouseEnter={handlePause}
          onMouseLeave={() => {
            handlePointerUp();
            handleResume();
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Fade-uri laterale */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-40" />

          {/* Cilindrul 3D */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cylinderItems.map((item, index) => (
              <CylinderCard
                key={index}
                item={item}
                index={index}
                rotation={rotation}
                radius={dims.radius}
                cardW={dims.cardW}
                cardH={dims.cardH}
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