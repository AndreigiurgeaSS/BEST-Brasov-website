import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  yearRoundPartners,
  technicalPartners,
  foodAndPrizesPartners,
  logisticsPartners,
  academicalPartners,
} from "../data/partnersData";

const FOLDER_THEMES = [
  {
    tab: "bg-[#4F0028] text-white border-[#7a0b3b] dark:bg-[#4F0028] dark:text-white dark:border-rose-400/40",
    body: "bg-[#4F0028] border-[#7a0b3b] dark:bg-[#3a001e] dark:border-rose-400/35",
    count: "text-rose-200/80",
    offset: "ml-0 md:ml-[2%]",
  },
  {
    tab: "bg-white text-gray-900 border-[#4F0028]/25 dark:bg-[#FAF8F9] dark:text-gray-900 dark:border-rose-200/50",
    body: "bg-white border-[#4F0028]/25 dark:bg-[#FAF8F9] dark:border-rose-200/40",
    count: "text-[#4F0028]/70",
    offset: "ml-2 sm:ml-4 md:ml-[18%]",
  },
  {
    tab: "bg-rose-50 text-[#4F0028] border-[#4F0028]/25 dark:bg-[#2d0713] dark:text-rose-100 dark:border-rose-400/35",
    body: "bg-rose-50 border-[#4F0028]/25 dark:bg-[#24050f] dark:border-rose-400/30",
    count: "text-[#4F0028]/65 dark:text-rose-300/75",
    offset: "ml-4 sm:ml-8 md:ml-[34%]",
  },
  {
    tab: "bg-[#26040e] text-white border-[#4F0028]/60 dark:bg-[#190207] dark:text-rose-50 dark:border-rose-500/35",
    body: "bg-[#26040e] border-[#4F0028]/60 dark:bg-[#160206] dark:border-rose-500/30",
    count: "text-rose-300/75",
    offset: "ml-6 sm:ml-12 md:ml-[48%]",
  },
  {
    tab: "bg-[#F5EEF1] text-[#320606] border-[#4F0028]/25 dark:bg-[#EFE6EA] dark:text-[#2a040e] dark:border-rose-200/45",
    body: "bg-[#F5EEF1] border-[#4F0028]/25 dark:bg-[#EFE6EA] dark:border-rose-200/40",
    count: "text-[#4F0028]/70",
    offset: "ml-8 sm:ml-16 md:ml-[62%]",
  },
];

const PartnerCard = memo(({ partner, large, moreInfoLabel, visitSiteTitle }) => (
  <div
    className={`relative flex flex-col overflow-hidden bg-white dark:bg-[#1a0303] rounded-2xl border border-[#4F0028]/25 hover:border-[#4F0028]/65 dark:border-rose-500/30 dark:hover:border-rose-400/70 shadow-[0_6px_18px_rgba(79,0,40,0.08)] hover:shadow-[0_14px_28px_rgba(79,0,40,0.18)] dark:shadow-black/40 transition-all duration-300 group ${
      large
        ? "w-full sm:w-[calc(50%-0.75rem)] max-w-[340px] min-h-[180px] sm:min-h-[215px]"
        : "w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.85rem)] lg:w-[calc(25%-0.95rem)] min-h-[145px] sm:min-h-[170px]"
    } lg:hover:-translate-y-1`}
  >
    <div className="flex-1 bg-white dark:bg-[#FAF8F9] flex items-center justify-center p-5 sm:p-6 pointer-events-none relative z-10">
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        decoding="async"
        className={`object-contain w-full transition-transform duration-300 lg:group-hover:scale-105 ${
          large ? "max-h-20 sm:max-h-28" : "max-h-12 sm:max-h-16"
        }`}
      />
    </div>

    {partner.link && partner.link !== "#" && (
      <a
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        title={visitSiteTitle}
        className="w-full bg-rose-50/60 hover:bg-rose-100/85 dark:bg-[#1a0303] dark:hover:bg-[#2a0606] transition-colors duration-300 block cursor-pointer z-20 mt-auto"
      >
        <div className="w-full h-[2px] bg-[#4F0028]/80 dark:bg-rose-500/80" />
        <div className="px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between">
          <span className="text-[#4F0028] dark:text-rose-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
            {moreInfoLabel}
          </span>
          <ChevronRight className="text-[#4F0028] dark:text-rose-300 w-4 h-4 sm:w-5 sm:h-5 lg:group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </a>
    )}
  </div>
));

const PartnerFolder = ({ section, index, isOpen, onToggle, registerRef, t }) => {
  const theme = FOLDER_THEMES[index % FOLDER_THEMES.length];
  const countLabel = String(section.partners.length).padStart(2, "0");
  const moreInfoLabel = t("partnersPage.moreInfo");

  return (
    <div
      ref={registerRef}
      className={`relative transition-transform duration-300 ${
        index > 0 ? "-mt-5 sm:-mt-6" : ""
      } ${!isOpen ? "hover:-translate-y-1.5" : ""}`}
      style={{ zIndex: 10 + index * 10 }}
    >
      <div className={`${theme.offset} relative z-20 inline-block max-w-[calc(100%-1rem)]`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className={`relative -mb-[1px] flex items-center justify-between gap-4 sm:gap-7 px-4 sm:px-6 pt-2.5 pb-2.5 sm:pt-3 sm:pb-3 rounded-t-2xl border border-b-0 shadow-[0_-4px_14px_rgba(0,0,0,0.08)] cursor-pointer select-none transition-colors ${theme.tab}`}
        >
          <span className="font-extrabold text-xs sm:text-sm md:text-[15px] tracking-tight truncate">
            {section.title}
          </span>
          <span className="flex items-center gap-1.5 flex-shrink-0">
            <span className={`text-[10px] sm:text-xs font-black tabular-nums ${theme.count}`}>
              {countLabel}
            </span>
            <ChevronDown
              size={15}
              className={`transition-transform duration-300 ${theme.count} ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`relative z-10 rounded-2xl sm:rounded-3xl border shadow-[0_-6px_20px_rgba(0,0,0,0.11)] dark:shadow-[0_-8px_24px_rgba(0,0,0,0.5)] overflow-hidden transition-colors ${theme.body}`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-label={`Toggle ${section.title}`}
          className={`w-full block cursor-pointer transition-[height] duration-300 ${
            isOpen ? "h-4 sm:h-5" : "h-10 sm:h-12"
          }`}
        />

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-4 sm:px-7 pb-10 sm:pb-12 pt-1">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                {section.partners.map((partner, idx) => (
                  <PartnerCard
                    key={`${partner.name}-${idx}`}
                    partner={partner}
                    large={section.large}
                    moreInfoLabel={moreInfoLabel}
                    visitSiteTitle={t("partnersPage.visitSiteTitle", { name: partner.name })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Partners = () => {
  const { t, i18n } = useTranslation();
  const isRO = !!i18n.language && i18n.language.toLowerCase().startsWith("ro");

  useEffect(() => {
    document.title = t("partnersPage.pageTitle");
  }, [t, i18n.language]);

  const sections = useMemo(
    () =>
      [
        {
          id: "year-round",
          title: t("partnersPage.sections.yearRound"),
          partners: yearRoundPartners || [],
          large: true,
        },
        {
          id: "technical",
          title: t("partnersPage.sections.technical"),
          partners: technicalPartners || [],
          large: false,
        },
        {
          id: "food-prizes",
          title: t("partnersPage.sections.foodAndPrizes"),
          partners: foodAndPrizesPartners || [],
          large: false,
        },
        {
          id: "logistics",
          title: t("partnersPage.sections.logistics"),
          partners: logisticsPartners || [],
          large: true,
        },
        {
          id: "academic",
          title: t("partnersPage.sections.academical"),
          partners: academicalPartners || [],
          large: true,
        },
      ].filter((s) => s.partners.length > 0),
    [t]
  );

  const totalPartners = useMemo(
    () => sections.reduce((acc, s) => acc + s.partners.length, 0),
    [sections]
  );

  const [openIds, setOpenIds] = useState(() => (sections[0] ? [sections[0].id] : []));
  const folderRefs = useRef({});
  const scrollLockRafRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scrollLockRafRef.current) cancelAnimationFrame(scrollLockRafRef.current);
      window.isAutoScrolling = false;
    };
  }, []);

  const lockFolderPosition = useCallback((id) => {
    const el = folderRefs.current[id];
    if (!el) return;

    const targetTop = Math.max(92, el.getBoundingClientRect().top);
    if (scrollLockRafRef.current) cancelAnimationFrame(scrollLockRafRef.current);

    window.isAutoScrolling = true;
    const startTime = performance.now();
    const LOCK_DURATION = 360;

    const keepLocked = (now) => {
      const currentEl = folderRefs.current[id];
      if (currentEl) {
        const diff = currentEl.getBoundingClientRect().top - targetTop;
        if (Math.abs(diff) > 0.5) {
          window.scrollBy(0, diff);
        }
      }

      if (now - startTime < LOCK_DURATION) {
        scrollLockRafRef.current = requestAnimationFrame(keepLocked);
      } else {
        window.isAutoScrolling = false;
        scrollLockRafRef.current = null;
      }
    };

    scrollLockRafRef.current = requestAnimationFrame(keepLocked);
  }, []);

  const handleToggle = useCallback(
    (id) => {
      lockFolderPosition(id);

      setOpenIds((prev) => {
        if (prev.includes(id)) return prev.filter((item) => item !== id);
        if (prev.length > 1) return [...prev, id];
        return [id];
      });
    },
    [lockFolderPosition]
  );

  const allOpen = sections.length > 0 && openIds.length === sections.length;

  const handleToggleAll = () => {
    if (scrollLockRafRef.current) {
      cancelAnimationFrame(scrollLockRafRef.current);
      scrollLockRafRef.current = null;
      window.isAutoScrolling = false;
    }
    setOpenIds(allOpen ? [] : sections.map((s) => s.id));
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300 overflow-x-clip">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl mb-5 transition-colors"
          >
            {t("partnersPage.titleStart")}{" "}
            <span className="text-[#4F0028] dark:text-rose-400 transition-colors">
              {t("partnersPage.titleHighlight")}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            {t("partnersPage.subtitle")}
          </motion.p>
        </div>

        <div className="flex justify-end mb-4 px-1 sm:px-3">
          <button
            type="button"
            onClick={handleToggleAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/[0.07] hover:bg-rose-50 dark:hover:bg-white/[0.13] text-[#4F0028] dark:text-rose-200 border border-[#4F0028]/20 dark:border-white/15 shadow-sm transition-all cursor-pointer"
          >
            {allOpen ? <ChevronsDownUp size={15} /> : <ChevronsUpDown size={15} />}
            <span>
              {allOpen
                ? t("faqPage.collapseAll", {
                    defaultValue: isRO ? "Închide toate" : "Collapse all",
                  })
                : t("faqPage.expandAll", {
                    defaultValue: isRO ? "Deschide toate" : "Expand all",
                  })}
            </span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="relative"
          style={{ overflowAnchor: "none" }}
        >
          <div className="relative px-1 sm:px-3">
            {sections.map((section, index) => (
              <PartnerFolder
                key={section.id}
                section={section}
                index={index}
                isOpen={openIds.includes(section.id)}
                onToggle={() => handleToggle(section.id)}
                registerRef={(el) => {
                  folderRefs.current[section.id] = el;
                }}
                t={t}
              />
            ))}
          </div>

          <div className="relative z-[80] -mt-6 sm:-mt-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#180205] border border-[#4F0028]/25 dark:border-rose-400/25 shadow-[0_18px_40px_rgba(79,0,40,0.12)] dark:shadow-[0_24px_55px_rgba(0,0,0,0.75)] overflow-hidden">
            <div className="h-2.5 sm:h-3 bg-gradient-to-b from-gray-100 to-white dark:from-white/10 dark:to-transparent border-b border-gray-200/80 dark:border-white/10" />
            <div className="py-6 sm:py-7 flex flex-col items-center justify-center gap-3">
              <div className="w-24 sm:w-32 h-3.5 sm:h-4 rounded-full bg-[#320606] dark:bg-[#090001] shadow-[inset_0_2px_6px_rgba(0,0,0,0.65)] ring-1 ring-black/10 dark:ring-rose-500/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#4F0028]/45 dark:text-rose-200/35 select-none">
                {totalPartners} {isRO ? "Parteneri" : "Partners"} · {sections.length}{" "}
                {isRO ? "Categorii" : "Categories"}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 mb-6 rounded-[2.5rem] bg-gradient-to-br from-[#4F0028] to-[#320606] dark:from-[#240310] dark:to-[#120101] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(244,63,94,0.22) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              {t("partnersPage.cta.titleStart")}{" "}
              <span className="text-rose-300">{t("partnersPage.cta.titleHighlight")}</span>
            </h3>
            <p className="text-rose-100/85 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              {t("partnersPage.cta.description")}
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <Link
              to="/join#contact"
              className="inline-flex items-center justify-center w-full md:w-auto gap-2 bg-white text-[#4F0028] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-rose-50 transition-colors shadow-lg"
            >
              {t("partnersPage.cta.button")}
              <ChevronRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;