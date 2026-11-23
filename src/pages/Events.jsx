import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Users,
  Compass,
  Sun,
  MapPin,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  externalEvents,
  internalEvents,
  calendarHighlights,
} from "../data/eventsData";

const FALLBACK_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const FALLBACK_WD_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FALLBACK_WD_RO = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];

const TYPE_COLOR = { public: "#3b82f6", internal: "#e11d48", intl: "#f59e0b" };
const pad = (n) => String(n).padStart(2, "0");
const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

function expandEventDates(item) {
  const results = [];
  if (item.date) results.push(item.date);
  if (Array.isArray(item.dates)) {
    item.dates.forEach((d) => {
      if (d && !results.includes(d)) results.push(d);
    });
  }
  if (item.startDate && item.endDate) {
    const [sy, sm, sd] = item.startDate.split("-").map(Number);
    const [ey, em, ed] = item.endDate.split("-").map(Number);
    const cur = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);
    let guard = 0;
    while (cur <= end && guard < 120) {
      const k = toKey(cur.getFullYear(), cur.getMonth(), cur.getDate());
      if (!results.includes(k)) results.push(k);
      cur.setDate(cur.getDate() + 1);
      guard++;
    }
  }
  return results;
}

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col items-center text-center mb-10">
    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1e0404] shadow-md border border-gray-100 dark:border-rose-950/60 flex items-center justify-center text-[#4F0028] dark:text-rose-400 mb-4">
      <Icon size={28} />
    </div>
    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{title}</h2>
    <p className="text-gray-500 dark:text-gray-400 max-w-lg">{subtitle}</p>
  </div>
);

const CalendarSection = ({ events }) => {
  const { t, i18n } = useTranslation();
  const isRO = !!i18n.language && i18n.language.toLowerCase().startsWith("ro");

  const monthsT = t("eventsPage.calendar.months", { returnObjects: true });
  const months = Array.isArray(monthsT) ? monthsT : FALLBACK_MONTHS;
  const wdT = t("eventsPage.calendar.weekdays", { returnObjects: true });
  const weekdays = Array.isArray(wdT) ? wdT : isRO ? FALLBACK_WD_RO : FALLBACK_WD_EN;

  const now = new Date();
  const todayKey = toKey(now.getFullYear(), now.getMonth(), now.getDate());

  const dated = useMemo(() => {
    const list = [];
    events.forEach((e) => {
      const days = expandEventDates(e);
      days.forEach((dKey) => {
        list.push({ ...e, date: dKey });
      });
    });
    return list.sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  const byDate = useMemo(() => {
    const acc = {};
    dated.forEach((e) => {
      (acc[e.date] = acc[e.date] || []).push(e);
    });
    return acc;
  }, [dated]);

  const eventMonths = useMemo(() => {
    const map = new Map();
    dated.forEach((e) => {
      const [y, m] = e.date.split("-").map(Number);
      const id = `${y}-${pad(m)}`;
      if (!map.has(id)) {
        map.set(id, { id, y, m: m - 1, firstDate: e.date });
      }
    });
    return Array.from(map.values());
  }, [dated]);

  const startKey = (dated.find((e) => e.date >= todayKey) || {}).date || todayKey;
  const [sel, setSel] = useState(startKey);
  const [view, setView] = useState(() => {
    const [y, m] = startKey.split("-").map(Number);
    return { y, m: m - 1 };
  });

  const shiftMonth = (delta) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  const goTo = (key) => {
    const [y, m] = key.split("-").map(Number);
    setView({ y, m: m - 1 });
    setSel(key);
  };

  const getEventTitle = (e) => {
    if (isRO && e.titleRO) return e.titleRO;
    if (!isRO && e.titleEN) return e.titleEN;
    if (e.title) return e.title;
    return t(e.titleKey);
  };

  const getEventDesc = (e) => {
    if (isRO && e.descRO) return e.descRO;
    if (!isRO && e.descEN) return e.descEN;
    if (e.desc) return e.desc;
    return t(e.descKey);
  };

  const lead = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
  const dim = new Date(view.y, view.m + 1, 0).getDate();

  const [sy, sm, sd] = sel.split("-").map(Number);
  const weekdayLong = new Date(sy, sm - 1, sd).toLocaleDateString(
    isRO ? "ro-RO" : "en-GB",
    { weekday: "long" }
  );
  const dayEvents = byDate[sel] || [];

  const upcoming = useMemo(() => {
    const seen = new Set();
    const res = [];
    for (const e of dated) {
      if (e.date > sel) {
        const id = e.titleKey || e.titleRO || e.titleEN || e.date;
        if (!seen.has(id)) {
          seen.add(id);
          res.push(e);
        }
      }
      if (res.length >= 3) break;
    }
    return res;
  }, [dated, sel]);

  const nextEvent = upcoming[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-24 sm:mb-28 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] bg-white dark:bg-[#1e0404] rounded-[2rem] shadow-xl border border-gray-100 dark:border-rose-950/60 overflow-hidden"
    >
      {/* Stânga: Grila lunii */}
      <div className="p-4 sm:p-7">
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              {t("eventsPage.calendar.title", {
                defaultValue: isRO ? "Calendar Evenimente" : "Event Calendar",
              })}
            </p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {months[view.m]} {view.y}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => goTo(todayKey)}
              className="px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-rose-950/60 text-[11px] font-bold text-gray-600 dark:text-gray-300 hover:bg-[#4F0028] hover:text-white hover:border-[#4F0028] transition-all cursor-pointer"
            >
              {isRO ? "Azi" : "Today"}
            </button>
            {[
              [-1, ChevronLeft],
              [1, ChevronRight],
            ].map(([delta, Icon]) => (
              <button
                key={delta}
                onClick={() => shiftMonth(delta)}
                className="p-2 sm:p-2.5 rounded-xl border border-gray-200 dark:border-rose-950/60 text-gray-500 dark:text-gray-300 hover:bg-[#4F0028] hover:text-white hover:border-[#4F0028] transition-all cursor-pointer"
              >
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>

        {eventMonths.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-hide">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 shrink-0 mr-1 flex items-center gap-1">
              <CalendarIcon size={11} />
              {isRO ? "Salt la:" : "Jump to:"}
            </span>
            {eventMonths.map((em) => {
              const isCurrentView = em.y === view.y && em.m === view.m;
              return (
                <button
                  key={em.id}
                  onClick={() => goTo(em.firstDate)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                    isCurrentView
                      ? "bg-[#4F0028] text-white shadow-sm"
                      : "bg-rose-50/70 dark:bg-rose-950/40 text-[#4F0028] dark:text-rose-300 hover:bg-[#4F0028]/15"
                  }`}
                >
                  {months[em.m].slice(0, 3)} {em.y}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1">
          {weekdays.map((w) => (
            <span
              key={w}
              className="text-center text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-gray-400 dark:text-gray-500 py-1"
            >
              {w}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {Array.from({ length: lead }).map((_, i) => (
            <div key={`b${i}`} className="h-10 sm:h-auto sm:aspect-square" />
          ))}
          {Array.from({ length: dim }, (_, i) => i + 1).map((day) => {
            const key = toKey(view.y, view.m, day);
            const evs = byDate[key] || [];
            const isSel = key === sel;
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                onClick={() => setSel(key)}
                className={`h-10 sm:h-auto sm:aspect-square rounded-xl border flex flex-col items-center justify-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer
                  ${
                    isSel
                      ? "bg-[#4F0028] border-[#4F0028] text-white shadow-md shadow-[#4F0028]/40 scale-[1.04]"
                      : isToday
                        ? "border-[#4F0028] dark:border-rose-400 text-[#4F0028] dark:text-rose-300 bg-rose-50/40 dark:bg-rose-950/20"
                        : evs.length
                          ? "border-[#4F0028]/20 dark:border-rose-400/20 bg-rose-50/80 dark:bg-rose-950/40 text-gray-900 dark:text-white hover:border-[#4F0028]/50"
                          : "border-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2a0505] hover:border-gray-200 dark:hover:border-rose-950"
                  }`}
              >
                <span className="leading-none">{day}</span>
                <span className="flex gap-0.5 h-1.5 items-center">
                  {evs.slice(0, 3).map((e, i) => (
                    <i
                      key={i}
                      className="w-1.5 h-1.5 rounded-full block"
                      style={{ background: isSel ? "#fff" : TYPE_COLOR[e.type] }}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dreapta: Panou Agendă */}
      <div className="relative bg-gradient-to-br from-[#4F0028] to-[#1e0404] text-white p-5 sm:p-7 flex flex-col gap-4 min-h-[340px] lg:min-h-[440px] overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <span className="text-4xl sm:text-5xl font-black leading-none">{sd}</span>
          <div className="text-xs text-white/65 leading-snug">
            <strong className="block text-sm text-white capitalize">{weekdayLong}</strong>
            {months[sm - 1]} {sy}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative flex flex-col gap-3"
          >
            {dayEvents.length ? (
              dayEvents.slice(0, 2).map((e, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/15 rounded-2xl p-4 flex flex-col gap-2"
                >
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest bg-white/10 rounded-full px-2.5 py-1 w-fit">
                    <i
                      className="w-1.5 h-1.5 rounded-full block"
                      style={{ background: TYPE_COLOR[e.type] }}
                    />
                    {t(`eventsPage.calendar.legend.${e.type}`)}
                  </span>
                  <p className="text-base sm:text-lg font-black leading-tight line-clamp-1">
                    {getEventTitle(e)}
                  </p>
                  <p className="text-xs text-white/75 leading-relaxed line-clamp-2">
                    {getEventDesc(e)}
                  </p>
                  {e.link && (
                    <a
                      href={e.link}
                      target={e.link.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white text-[#4F0028] text-xs font-bold px-4 py-2 rounded-xl w-fit hover:translate-x-1 transition-transform"
                    >
                      {t("eventsPage.calendar.moreInfo")} <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="border border-dashed border-white/25 rounded-2xl p-4 text-xs text-white/75 leading-relaxed flex flex-col items-start gap-3">
                {t("eventsPage.calendar.nothingPlanned")}
                {nextEvent && (
                  <button
                    onClick={() => goTo(nextEvent.date)}
                    className="inline-flex items-center gap-1.5 bg-white text-[#4F0028] text-xs font-bold px-4 py-2 rounded-xl hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    {t("eventsPage.calendar.next")}: {getEventTitle(nextEvent)}{" "}
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {upcoming.length > 0 && (
          <div className="relative flex flex-col gap-1.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-1">
              {t("eventsPage.calendar.upcoming")}
            </p>
            {upcoming.map((e, i) => {
              const [, em, ed] = e.date.split("-").map(Number);
              return (
                <button
                  key={i}
                  onClick={() => goTo(e.date)}
                  className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="min-w-[38px] text-center bg-white/10 rounded-lg py-1 leading-none">
                    <b className="block text-sm">{ed}</b>
                    <small className="text-[8px] uppercase tracking-wider text-white/60">
                      {months[em - 1].slice(0, 3)}
                    </small>
                  </span>
                  <span className="flex-1 text-sm font-semibold line-clamp-1">
                    {getEventTitle(e)}
                  </span>
                  <i
                    className="w-1.5 h-1.5 rounded-full block"
                    style={{ background: TYPE_COLOR[e.type] }}
                  />
                </button>
              );
            })}
          </div>
        )}

        <div className="relative mt-auto pt-3 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1">
          {["public", "internal", "intl"].map((k) => (
            <span key={k} className="flex items-center gap-1.5 text-[10px] text-white/70">
              <i
                className="w-1.5 h-1.5 rounded-full block"
                style={{ background: TYPE_COLOR[k] }}
              />
              {t(`eventsPage.calendar.legend.${k}`)}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SingleItemCarousel = ({ events, showButton = true }) => {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!events || events.length === 0) return;
    const timer = setInterval(() => {
      setDir(1);
      setIdx((p) => (p === events.length - 1 ? 0 : p + 1));
    }, 11000);
    return () => clearInterval(timer);
  }, [events, idx]);

  if (!events || events.length === 0) return null;

  const next = () => {
    setDir(1);
    setIdx((p) => (p === events.length - 1 ? 0 : p + 1));
  };
  const prev = () => {
    setDir(-1);
    setIdx((p) => (p === 0 ? events.length - 1 : p - 1));
  };
  const goTo = (i) => {
    setDir(i >= idx ? 1 : -1);
    setIdx(i);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const d = touchStartX.current - e.changedTouches[0].clientX;
    if (d > 45) next();
    else if (d < -45) prev();
    touchStartX.current = null;
  };

  const ev = events[idx];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className="bg-white dark:bg-[#1e0404] rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-rose-950/60 overflow-hidden flex flex-col md:flex-row h-[560px] md:h-[440px] w-full transition-colors duration-300"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full md:w-1/2 h-[330px] md:h-full p-7 sm:p-8 md:p-12 flex flex-col justify-between relative order-2 md:order-1 shrink-0 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`t-${idx}`}
              initial={{ opacity: 0, x: dir * 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -16 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex flex-col justify-center flex-1 min-h-0 overflow-hidden will-change-transform"
            >
              <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-tight truncate">
                {t(ev.titleKey)}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm md:text-[15px] leading-relaxed mb-5 line-clamp-4">
                {t(ev.descKey)}
              </p>
              {showButton && ev.link && (
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-fit text-white bg-[#4F0028] hover:bg-[#320606] px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-[#4F0028]/20 hover:-translate-y-0.5 group/btn"
                >
                  {t("eventsPage.carousel.viewDetails")}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Puncte centrate pe mobil, săgeți ascunse pe mobil și păstrate pe desktop */}
          <div className="flex items-center justify-center md:justify-between pt-3 border-t border-gray-100 dark:border-rose-950/40 shrink-0">
            <div className="flex items-center gap-2">
              {events.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Event ${i + 1}`}
                  className={`transition-all duration-300 h-2 md:h-1.5 rounded-full cursor-pointer ${
                    i === idx
                      ? "bg-[#4F0028] dark:bg-rose-400 w-8"
                      : "bg-gray-200 dark:bg-rose-950 w-2 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2">
              {[
                [prev, ChevronLeft],
                [next, ChevronRight],
              ].map(([fn, Icon], i) => (
                <button
                  key={i}
                  type="button"
                  onClick={fn}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 dark:bg-[#140202] border border-gray-200 dark:border-rose-950/60 text-gray-600 dark:text-gray-300 hover:bg-[#4F0028] hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-[230px] md:h-full md:w-1/2 shrink-0 bg-gradient-to-br from-[#4F0028] to-[#320606] dark:from-[#320606] dark:to-[#140202] p-8 flex items-center justify-center relative overflow-hidden order-1 md:order-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)",
            }}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`i-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative z-10 w-[220px] h-[150px] md:w-[280px] md:h-[220px] flex justify-center items-center will-change-transform"
            >
              <img
                src={ev.image}
                alt={t(ev.titleKey)}
                decoding="async"
                className="w-full h-full object-contain drop-shadow-2xl md:animate-float-y"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const InternationalStudyCard = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white dark:bg-[#1e0404] rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-rose-950/60 overflow-hidden flex flex-col md:flex-row min-h-[440px] transition-colors duration-300">
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F0028]/10 dark:bg-rose-500/15 text-[#4F0028] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Compass size={14} />
              {t("eventsPage.international.badge")}
            </div>

            <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
              {t("eventsPage.international.cardTitle")}
            </h3>

            <p className="text-gray-500 dark:text-gray-300 text-sm md:text-[15px] leading-relaxed mb-6">
              {t("eventsPage.international.cardDesc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#140202] border border-gray-100 dark:border-rose-950/60">
                <div className="flex items-center gap-2 text-[#4F0028] dark:text-rose-400 font-bold text-sm mb-1">
                  <Globe size={16} />
                  <span>{t("eventsPage.international.abroadTitle")}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t("eventsPage.international.abroadDesc")}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#140202] border border-gray-100 dark:border-rose-950/60">
                <div className="flex items-center gap-2 text-[#4F0028] dark:text-rose-400 font-bold text-sm mb-1">
                  <Sun size={16} />
                  <span>{t("eventsPage.international.localSummerTitle")}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t("eventsPage.international.localSummerDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://studyandtravel.bestbrasov.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white bg-[#4F0028] hover:bg-[#320606] px-7 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-[#4F0028]/25 hover:-translate-y-0.5 group/btn"
            >
              {t("eventsPage.international.ctaBtn")}
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              studyandtravel.bestbrasov.ro
            </span>
          </div>
        </div>

        <div className="w-full md:w-5/12 bg-gradient-to-br from-[#4F0028] via-[#320606] to-[#140202] p-8 md:p-10 flex flex-col justify-between text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(251,113,133,0.2) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-200/80">
              BEST Courses
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/10 border border-white/15 px-3 py-1 rounded-full whitespace-nowrap">
              <MapPin size={12} className="text-rose-300 shrink-0" /> 85+{" "}
              {t("eventsPage.international.locationsTag")}
            </span>
          </div>

          <div className="relative z-10 my-8">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-300/80 font-bold mb-2">
              {t("eventsPage.international.portalLabel")}
            </p>
            <h4 className="text-3xl sm:text-4xl font-black tracking-tight leading-none mb-4">
              Time to <span className="text-rose-300">Connect.</span>
            </h4>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              {t("eventsPage.international.portalHighlight")}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            <div>
              <p className="text-lg font-black text-white">7–14</p>
              <p className="text-[10px] uppercase tracking-wider text-white/60">
                {t("eventsPage.international.statDays")}
              </p>
            </div>
            <div className="border-x border-white/10">
              <p className="text-lg font-black text-white">30</p>
              <p className="text-[10px] uppercase tracking-wider text-white/60">
                {t("eventsPage.international.statCountries")}
              </p>
            </div>
            <div>
              <p className="text-lg font-black text-rose-300">Free*</p>
              <p className="text-[10px] uppercase tracking-wider text-white/60">
                {t("eventsPage.international.statMeals")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("eventsPage.pageTitle");
  }, [t, i18n.language]);

  const allEvents = useMemo(
    () => [
      ...externalEvents.map((e) => ({ ...e, type: "public" })),
      ...internalEvents.map((e) => ({ ...e, type: "internal" })),
      ...(calendarHighlights || []).map((e) => ({ ...e, type: e.type || "public" })),
    ],
    []
  );

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen bg-gray-50/50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-10 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,0,40,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-6 tracking-tight"
          >
            {t("eventsPage.header.titleStart")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F0028] to-rose-500 dark:from-rose-300 dark:to-rose-500">
              {t("eventsPage.header.titleHighlight")}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            {t("eventsPage.header.subtitle")}
          </motion.p>
        </div>

        <CalendarSection events={allEvents} />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-28 sm:mb-32"
        >
          <SectionHeader
            icon={Globe}
            title={t("eventsPage.publicEvents.title")}
            subtitle={t("eventsPage.publicEvents.subtitle")}
          />
          <SingleItemCarousel events={externalEvents} showButton={true} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-28 sm:mb-32"
        >
          <SectionHeader
            icon={Users}
            title={t("eventsPage.internalEvents.title")}
            subtitle={t("eventsPage.internalEvents.subtitle")}
          />
          <SingleItemCarousel events={internalEvents} showButton={false} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            icon={Compass}
            title={t("eventsPage.international.title")}
            subtitle={t("eventsPage.international.subtitle")}
          />
          <InternationalStudyCard />
        </motion.section>
      </div>
    </div>
  );
};

export default Events;