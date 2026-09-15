import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { 
  yearRoundPartners, 
  technicalPartners, 
  foodAndPrizesPartners, 
  logisticsPartners, 
  academicalPartners 
} from "../data/partnersData";

const PartnerSection = ({ title, partners, itemWidth = "w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]", maxWidth = "max-w-6xl", large = false }) => {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">{title}</h2>
        <div className="w-16 h-1 bg-[#8b1832] dark:bg-rose-500 mx-auto mt-4 rounded-full transition-colors"></div>
      </div>
      
      <div className={`flex flex-wrap justify-center gap-4 sm:gap-6 ${maxWidth} mx-auto`}>
        {partners.map((partner, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 dark:hover:border-rose-900/50 dark:hover:shadow-rose-900/10 transition-all duration-300 group ${itemWidth} ${large ? 'min-h-[200px] sm:min-h-[250px]' : 'min-h-[140px] sm:min-h-[180px]'}`}
          >
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <img 
                src={partner.logo} 
                alt={partner.name}
                // Am mutat "drop-shadow" doar pe "group-hover:" și am făcut umbra mai fină (0.4 opacitate)
                className={`object-contain transition-all duration-500 opacity-80 dark:opacity-100 grayscale dark:grayscale-0 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 w-full group-hover:dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] ${large ? 'max-h-20 sm:max-h-36' : 'max-h-12 sm:max-h-20'}`}
              />
            </div>

            {partner.link && partner.link !== "#" && (
              <a 
                href={partner.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={`Vizitează site-ul ${partner.name}`}
                className="w-full bg-gray-50 dark:bg-gray-800/80 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/30 transition-colors duration-300 block cursor-pointer z-10 mt-auto"
              >
                <div className="w-full h-[2px] bg-[#8b1832] dark:bg-rose-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="p-2 sm:p-4 flex items-center justify-between">
                  <span className="text-[#8b1832] dark:text-rose-500 font-bold text-[10px] sm:text-xs uppercase tracking-wider drop-shadow-sm">
                    More Info
                  </span>
                  <ChevronRight className="text-[#8b1832] dark:text-rose-500 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-sm" />
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
  useEffect(() => {
    document.title = "Partners | BEST Brașov";
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl mb-6 transition-colors"
          >
            Our <span className="text-[#8b1832] dark:text-rose-500 transition-colors">Partners</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            We thank the companies and institutions that support us in the development of students and the community.
          </motion.p>
        </div>

        <PartnerSection 
          title="Year-round Partners" 
          partners={yearRoundPartners} 
          itemWidth="w-full sm:w-[400px]" 
          maxWidth="max-w-md" 
          large={true} 
        />

        <PartnerSection 
          title="Technical Partners" 
          partners={technicalPartners} 
          itemWidth="w-[calc(50%-0.5rem)] md:w-[calc(25%-1.125rem)]" 
        />

        <PartnerSection 
          title="Food & Prizes Partners" 
          partners={foodAndPrizesPartners} 
          itemWidth="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]" 
        />

        <PartnerSection 
          title="Logistics Partners" 
          partners={logisticsPartners} 
          itemWidth="w-full sm:w-[calc(50%-0.75rem)]" 
          maxWidth="max-w-3xl"
          large={true}
        />

        <PartnerSection 
          title="Academical Partners" 
          partners={academicalPartners} 
          itemWidth="w-full sm:w-[calc(50%-0.75rem)]" 
          maxWidth="max-w-3xl"
          large={true}
        />

      </div>
    </div>
  );
};

export default Partners;