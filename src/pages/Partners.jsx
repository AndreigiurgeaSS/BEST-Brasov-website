import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  yearRoundPartners,
  technicalPartners,
  foodAndPrizesPartners,
  logisticsPartners,
  academicalPartners,
} from "../data/partnersData";

const PartnerSection = ({
  title,
  partners,
  itemWidth = "w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]",
  maxWidth = "max-w-6xl",
  large = false,
  t,
}) => {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
          {title}
        </h2>
        <div className="w-16 h-1 bg-[#4F0028] dark:bg-rose-400 mx-auto mt-4 rounded-full transition-colors" />
      </div>

      <div className={`flex flex-wrap justify-center gap-4 sm:gap-6 ${maxWidth} mx-auto`}>
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`relative flex flex-col overflow-hidden shadow-sm transition-all duration-300 group ${itemWidth} ${
              large
                ? "min-h-[200px] sm:min-h-[250px] bg-gradient-to-br from-white to-rose-50/30 dark:from-[#220404] dark:to-[#180202] rounded-[2rem] border-2 border-[#4F0028]/20 dark:border-rose-900/40 lg:hover:border-[#4F0028]/60 lg:hover:shadow-[0_15px_30px_-10px_rgba(79,0,40,0.2)]"
                : "min-h-[140px] sm:min-h-[180px] bg-white dark:bg-[#1e0404] rounded-2xl border border-gray-100 dark:border-rose-950/60 lg:hover:border-rose-200/70 dark:lg:hover:border-rose-500/25 dark:lg:hover:shadow-[0_12px_30px_-10px_rgba(244,63,94,0.12)]"
            } lg:hover:shadow-xl lg:hover:-translate-y-1`}
          >
            {large && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#4F0028]/10 dark:bg-rose-500/15 text-[#4F0028] dark:text-rose-300 text-[10px] font-black uppercase tracking-widest z-10">
                {t("partnersPage.strategicBadge")}
              </div>
            )}

            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 pointer-events-none z-10 relative">
              <img
                src={partner.logo}
                alt={partner.name}
                className={`object-contain transition-all duration-500 w-full opacity-100 grayscale-0 lg:opacity-80 dark:lg:opacity-95 lg:grayscale dark:lg:grayscale-0 lg:group-hover:opacity-100 lg:group-hover:grayscale-0 lg:group-hover:scale-105 dark:lg:group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.14)] ${
                  large ? "max-h-20 sm:max-h-36 mt-4" : "max-h-12 sm:max-h-20"
                }`}
              />
            </div>

            {partner.link && partner.link !== "#" && (
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                title={t("partnersPage.visitSiteTitle", { name: partner.name })}
                className="w-full bg-gray-50 dark:bg-[#150202] active:bg-rose-50 dark:active:bg-rose-900/20 lg:group-hover:bg-rose-50/80 dark:lg:group-hover:bg-[#2a0505] transition-colors duration-300 block cursor-pointer z-20 mt-auto"
              >
                <div className="w-full h-[2px] bg-[#4F0028] dark:bg-rose-500/80 opacity-80 lg:group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-2 sm:p-4 flex items-center justify-between">
                  <span className="text-[#4F0028] dark:text-rose-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                    {t("partnersPage.moreInfo")}
                  </span>
                  <ChevronRight className="text-[#4F0028] dark:text-rose-400 w-4 h-4 sm:w-5 sm:h-5 lg:group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Partners = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("partnersPage.pageTitle");
  }, [t, i18n.language]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl mb-6 transition-colors"
          >
            {t("partnersPage.titleStart")}{" "}
            <span className="text-[#4F0028] dark:text-rose-400 transition-colors">
              {t("partnersPage.titleHighlight")}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            {t("partnersPage.subtitle")}
          </motion.p>
        </div>

        <PartnerSection
          title={t("partnersPage.sections.yearRound")}
          partners={yearRoundPartners}
          itemWidth="w-full sm:w-[400px]"
          maxWidth="max-w-md"
          large={true}
          t={t}
        />

        <PartnerSection
          title={t("partnersPage.sections.technical")}
          partners={technicalPartners}
          itemWidth="w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)]"
          t={t}
        />

        <PartnerSection
          title={t("partnersPage.sections.foodAndPrizes")}
          partners={foodAndPrizesPartners}
          itemWidth="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
          t={t}
        />

        <PartnerSection
          title={t("partnersPage.sections.logistics")}
          partners={logisticsPartners}
          itemWidth="w-full sm:w-[calc(50%-0.75rem)]"
          maxWidth="max-w-3xl"
          large={true}
          t={t}
        />

        <PartnerSection
          title={t("partnersPage.sections.academical")}
          partners={academicalPartners}
          itemWidth="w-full sm:w-[calc(50%-0.75rem)]"
          maxWidth="max-w-3xl"
          large={true}
          t={t}
        />

        {/* CALL TO ACTION: BECOME A PARTNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-6 rounded-[2.5rem] bg-gradient-to-br from-[#4F0028] to-[#320606] dark:from-[#240310] dark:to-[#120101] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

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