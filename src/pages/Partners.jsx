import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
    flushLeftOnMobile: true,
  },
  {
    tab: "bg-white text-gray-900 border-[#4F0028]/25 dark:bg-[#FAF8F9] dark:text-gray-900 dark:border-rose-200/50",
    body: "bg-white border-[#4F0028]/25 dark:bg-[#FAF8F9] dark:border-rose-200/40",
    count: "text-[#4F0028]/70",
    offset: "ml-3 sm:ml-4 md:ml-[18%]",
    flushLeftOnMobile: false,
  },
  {
    tab: "bg-rose-50 text-[#4F0028] border-[#4F0028]/25 dark:bg-[#2d0713] dark:text-rose-100 dark:border-rose-400/35",
    body: "bg-rose-50 border-[#4F0028]/25 dark:bg-[#24050f] dark:border-rose-400/30",
    count: "text-[#4F0028]/65 dark:text-rose-300/75",
    offset: "ml-6 sm:ml-8 md:ml-[34%]",
    flushLeftOnMobile: false,
  },
  {
    tab: "bg-[#26040e] text-white border-[#4F0028]/60 dark:bg-[#190207] dark:text-rose-50 dark:border-rose-500/35",
    body: "bg-[#26040e] border-[#4F0028]/60 dark:bg-[#160206] dark:border-rose-500/30",
    count: "text-rose-300/75",
    offset: "ml-9 sm:ml-12 md:ml-[48%]",
    flushLeftOnMobile: false,
  },
  {
    tab: "bg-[#F5EEF1] text-[#320606] border-[#4F0028]/25 dark:bg-[#EFE6EA] dark:text-[#2a040e] dark:border-rose-200/45",
    body: "bg-[#F5EEF1] border-[#4F0028]/25 dark:bg-[#EFE6EA] dark:border-rose-200/40",
    count: "text-[#4F0028]/70",
    offset: "ml-12 sm:ml-16 md:ml-[62%]",
    flushLeftOnMobile: false,
  },
];

const PartnerCard = ({ partner, large, t }) => (
  <div
    className={`relative flex flex-col overflow-hidden bg-white dark:bg-[#1a0303] rounded-2xl border border-[#4F0028]/25 lg:hover:border-[#4F0028]/65 dark:border-rose-500/30 shadow-sm lg:hover:shadow-lg transition-transform duration-200 group ${
      large ? "min-h-[175px] sm:min-h-[215px]" : "min-h-[140px] sm:min-h-[175px]"
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
        title={t("partnersPage.visitSiteTitle", { name: partner.name })}
        className="w-full bg-rose-50/60 hover:bg-rose-100/85 dark:bg-[#1a0303] dark:hover:bg-[#2a0606] transition-colors duration-200 block cursor-pointer z-20 mt-auto"
      >
        <div className="w-full h-[2px] bg-[#4F0028]/80 dark:bg-rose-500/80" />
        <div className="px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between">
          <span className="text-[#4F0028] dark:text-rose-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
            {t("partnersPage.moreInfo")}
          </span>
          <ChevronRight className="text-[#4F0028] dark:text-rose-300 w-4 h-4 sm:w-5 sm:h-5 lg:group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </a>
    )}
  </div>
);

const PartnerFolder = ({ section, index, isOpen, onToggle, t }) => {
  const theme = FOLDER_THEMES[index % FOLDER_THEMES.length];
  const countLabel = String(section.partners.length).padStart(2, "0");

  return (
    <div
      className={`relative transition-transform duration-200 ${
        index > 0 ? "-mt-5 sm:-mt-6" : ""
      } ${!isOpen ? "lg:hover:-translate-y-2" : ""}`}
      style={{ zIndex: 1 + index }}
    >
      {/* Tab-ul decalat al dosarului */}
      <div className={`${theme.offset} relative z-20 inline-block max-w-[calc(100%-0.5rem)]`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className={`relative -mb-[1px] flex items-center justify-between gap-3 sm:gap-7 px-4 sm:px-6 pt-2.5 pb-2.5 sm:pt-3 sm:pb-3 rounded-t-2xl border border-b-0 shadow-sm cursor-pointer select-none transition-colors ${theme.tab}`}
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
              className={`transition-transform duration-200 ${theme.count} ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Corpul dosarului — rounded-tl-none pe primul dosar pe mobil ca să stea perfect drept */}
      <div
        className={`relative z-10 rounded-2xl sm:rounded-3xl ${
          theme.flushLeftOnMobile ? "rounded-tl-none md:rounded-tl-3xl" : ""
        } border shadow-md dark:shadow-black/50 overflow-hidden transition-colors ${theme.body}`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-label={`Toggle ${section.title}`}
          className={`w-full block cursor-pointer ${
            isOpen ? "h-4 sm:h-5" : "h-10 sm:h-12"
          }`}
        />

        {/* Acordeon pur CSS (grid-rows) — zero lag pe mobil */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-4 sm:px-7 pb-10 sm:pb-12 pt-1">
              <div
                className={`grid gap-4 sm:gap-5 ${
                  section.large
                    ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {section.partners.map((partner, idx) => (
                  <PartnerCard
                    key={`${partner.name}-${idx}`}
                    partner={partner}
                    large={section.large}
                    t={t}
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
  const isRO = i18n.language?.toLowerCase().startsWith("ro");

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

  const [openIds, setOpenIds] = useState(() =>
    sections[0]?.id ? [sections[0].id] : []
  );

  const allExpanded = openIds.length === sections.length;
  const totalPartners = sections.reduce((sum, s) => sum + s.partners.length, 0);

  const handleToggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    setOpenIds(allExpanded ? [] : sections.map((s) => s.id));
  };

  return (
    <div className="pt-28 lg:pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300 overflow-x-clip">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
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
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            {t("partnersPage.subtitle")}
          </motion.p>
        </div>

        {/* Buton Expand All / Collapse All */}
        <div className="flex justify-end mb-5 px-1 sm:px-3">
          <button
            type="button"
            onClick={handleToggleAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/15 text-xs font-extrabold uppercase tracking-wider text-gray-800 dark:text-rose-100 shadow-sm hover:border-[#4F0028]/40 transition-colors cursor-pointer"
          >
            <ChevronsUpDown size={14} />
            <span>
              {allExpanded
                ? isRO
                  ? "Restrânge tot"
                  : "Collapse all"
                : isRO
                ? "Extinde tot"
                : "Expand all"}
            </span>
          </button>
        </div>

        {/* ── SERTARUL DE DOSARE (isolate z-10 => nu mai trece NICIODATĂ peste butonul MENU!) ── */}
        <div className="isolate relative z-10">
          <div className="relative px-0.5 sm:px-3">
            {sections.map((section, index) => (
              <PartnerFolder
                key={section.id}
                section={section}
                index={index}
                isOpen={openIds.includes(section.id)}
                onToggle={() => handleToggle(section.id)}
                t={t}
              />
            ))}
          </div>

          {/* Fața sertarului (z-20 local în isolate => sub Navbar z-[90]) */}
          <div className="relative z-20 -mt-6 sm:-mt-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#180205] border border-[#4F0028]/25 dark:border-rose-400/25 shadow-lg dark:shadow-black/60 overflow-hidden">
            <div className="h-2.5 sm:h-3 bg-gradient-to-b from-gray-100 to-white dark:from-white/10 dark:to-transparent border-b border-gray-200/80 dark:border-white/10" />
            <div className="py-6 sm:py-8 flex flex-col items-center justify-center gap-3">
              <div className="w-24 sm:w-32 h-3.5 sm:h-4 rounded-full bg-[#320606] dark:bg-[#090001] shadow-[inset_0_2px_6px_rgba(0,0,0,0.65)] ring-1 ring-black/10 dark:ring-rose-500/20" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400 dark:text-rose-200/50">
                {totalPartners} {isRO ? "Parteneri" : "Partners"} · {sections.length}{" "}
                {isRO ? "Categorii" : "Categories"}
              </p>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION: BECOME A PARTNER */}
        <div className="mt-20 mb-6 rounded-[2.5rem] bg-gradient-to-br from-[#4F0028] to-[#320606] dark:from-[#240310] dark:to-[#120101] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
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
        </div>
      </div>
    </div>
  );
};

export default Partners;