import { motion } from "framer-motion";
import { ExternalLink, MapPin, Globe2 } from "lucide-react";

const WhatIsBest = () => {
  return (
    <section className="py-12 relative bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      
      {/* Background Blobs (Subtile) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#8b1832]/5 dark:bg-rose-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Titlul Secțiunii */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl mb-6 transition-colors"
          >
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1832] to-rose-500">BEST?</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1.5 bg-gradient-to-r from-[#8b1832] to-rose-500 mx-auto rounded-full"
          ></motion.div>
        </div>

        <div className="space-y-16 lg:space-y-24">
          
          {/* --- 1. BEST Brașov Section --- */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative group hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#8b1832] to-rose-500 z-10 hidden lg:block"></div>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8b1832] to-rose-500 z-10 lg:hidden"></div>

            <div className="w-full lg:w-7/12 p-6 sm:p-10 lg:p-16 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <div className="w-12 h-12 bg-rose-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-[#8b1832] dark:text-rose-400">
                  <MapPin size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Local Level</h3>
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed sm:text-lg">
                <p>
                  <strong className="text-gray-900 dark:text-white transition-colors">BEST Brașov</strong> is a non-governmental organization, established in 1997, intended for Transilvania University students. We facilitate communication between the University, students, and companies, focusing on professional and personal development.
                </p>
                <p>
                  We aid students through tailored events like workshops, academic courses, and company presentations. This ensures participants get the necessary support, both academically and professionally.
                </p>
                <p>
                  Beyond academics, we organize diverse social activities for our members to build strong relationships and a tightly-knit community.
                </p>
              </div>
            </div>

            {/* CARD INTERIOR 1 */}
            <div className="w-full lg:w-5/12 bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-10 lg:p-12 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-700">
              <div className="absolute inset-0 bg-[#8b1832]/5 dark:bg-rose-500/5 blur-3xl rounded-full scale-150"></div>
              
              <div className="relative bg-white dark:bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-200 hover:-translate-y-2 transition-transform duration-500 w-full max-w-[320px] h-[280px] sm:h-[320px] flex flex-col justify-center items-center">
                <img 
                  src="/images/logos/BESTBV-Colorat-1.png" 
                  alt="BEST Brasov Logo" 
                  className="max-w-[90%] h-auto drop-shadow-sm"
                  style={{ maxHeight: "160px" }}
                />
              </div>
            </div>
          </motion.div>

          {/* --- 2. BEST International Section --- */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col-reverse lg:flex-row bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative group hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-blue-600 to-indigo-500 z-10 hidden lg:block"></div>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 z-10 lg:hidden"></div>

            {/* CARD INTERIOR 2 - LOGO MĂRIT ȘI BUTON MICȘORAT */}
            <div className="w-full lg:w-5/12 bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-r border-gray-100 dark:border-gray-700">
              <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/5 blur-3xl rounded-full scale-150"></div>
              
              <div className="relative bg-white dark:bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-200 hover:-translate-y-2 transition-transform duration-500 w-full max-w-[320px] h-[280px] sm:h-[320px] flex flex-col justify-center items-center gap-6">
                
                <img 
                  src="/images/logos/BEST_signature_long.png" 
                  alt="BEST International Logo" 
                  className="w-[90%] max-w-[250px] h-auto drop-shadow-sm"
                />
                
                <a 
                  href="https://best.eu.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[85%] max-w-[200px] flex items-center justify-center gap-2 bg-[#8b1832] px-4 py-2.5 rounded-xl text-white font-bold uppercase tracking-wide text-xs sm:text-sm hover:bg-rose-900 transition-colors shadow-md mt-2"
                >
                  Visit Website
                  <ExternalLink size={16} />
                </a>
                
              </div>
            </div>

            <div className="w-full lg:w-7/12 p-6 sm:p-10 lg:p-16 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <div className="w-12 h-12 bg-blue-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Globe2 size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">European Level</h3>
              </div>

              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed sm:text-lg">
                <p>
                  At a European level, <strong className="text-gray-900 dark:text-white transition-colors">BEST</strong> (Board of European Students of Technology) is a non-profit organization founded in 1989, active in 85 universities in 30 European countries.
                </p>
                <p>
                  Through BEST International, we have access to a vast network of students and technology professionals. This allows us to organize academic exchanges, summer courses, and conferences across Europe, providing unique networking opportunities.
                </p>
                <p>
                  Our mission is to facilitate the exchange of knowledge through innovative events like technical competitions, trainings, and workshops in fields such as engineering, IT, robotics, and design.
                </p>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsBest;