import { motion } from "framer-motion";
import { BookOpen, Briefcase, Lightbulb } from "lucide-react";

// Componenta pentru Piuneză (Pin) cu efect 3D și reflexie de lumină
const PushPin = () => (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center drop-shadow-md">
    {/* Capul piunezei */}
    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-[#8b1832] border-b-2 border-[#5a0e1f] relative z-10 shadow-sm">
      {/* Reflexia luminii pe plastic */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full blur-[0.5px]"></div>
    </div>
    {/* Umbra/Acul care intră în hârtie */}
    <div className="w-1 h-3 bg-black/20 -mt-1 rounded-full blur-[1px]"></div>
  </div>
);

const WhatWeDo = () => {
  const pillars = [
    {
      title: "Complementary Education",
      description: "We offer excellent opportunities for further education in an international environment. Our seasonal courses allow students to deepen their knowledge while working in interdisciplinary teams.",
      icon: <BookOpen className="w-7 h-7 text-[#8b1832] dark:text-rose-400" />,
      rotate: -1.5, // Redus de la -3 pentru a evita coliziunea
      offsetY: 0, // Cardul 1 stă la nivelul 0
    },
    {
      title: "Career Support",
      description: "We provide valuable career development support. Through events like BEST Company Day, we connect students directly with top companies to showcase opportunities and kickstart careers.",
      icon: <Briefcase className="w-7 h-7 text-[#8b1832] dark:text-rose-400" />,
      rotate: 1.5, // Redus de la 2
      offsetY: 20, // Cardul 2 este ușor mai jos (20px), prevenind lovirea de cardul 1
    },
    {
      title: "Educational Involvement",
      description: "We are actively involved in education through technical competitions like EBEC. We encourage students to apply their skills in competitive environments, fostering critical thinking and teamwork.",
      icon: <Lightbulb className="w-7 h-7 text-[#8b1832] dark:text-rose-400" />,
      rotate: -1, // Redus de la -2
      offsetY: 0, // Cardul 3 revine la nivelul 0
    },
  ];

  // Varianta pentru animația "WOW" de tip spring (arc)
  const cardVariants = {
    hidden: { opacity: 0, y: -60, scale: 1.05 },
    visible: (index) => ({
      opacity: 1,
      y: pillars[index].offsetY, // Aplicăm offset-ul vertical aici!
      scale: 1,
      rotate: pillars[index].rotate,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 15,
        delay: index * 0.15,
      }
    })
  };

  return (
    <section id="what-we-do" className="scroll-mt-24 pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Pattern subtil ca de "tablă de plută" sau grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl transition-colors duration-300 tracking-tight"
          >
            What do we do?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-1 bg-[#8b1832] dark:bg-rose-500 mx-auto mt-6 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            Empowering students through three core initiatives.
          </motion.p>
        </div>

        {/* The 3 Pinned Cards */}
        {/* Am modificat gap-urile pentru a fi sigure pe toate device-urile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-10 xl:gap-12 px-2 sm:px-4 mt-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                y: 0, // Când pui mouse-ul, anulează offset-ul Y ca să vină drept spre tine
                zIndex: 10,
                transition: { type: "spring", stiffness: 300, damping: 20 } 
              }}
              // CSS aplicat pentru a preveni coliziunea pe ecrane medii (md)
              className={`relative bg-white dark:bg-gray-800 rounded-xl p-8 sm:p-10 transition-colors duration-300 border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl dark:shadow-black/50 cursor-pointer origin-top w-full max-w-md mx-auto lg:max-w-none ${index === 2 ? 'md:col-span-2 lg:col-span-1 md:w-1/2 lg:w-full' : ''}`}
            >
              <PushPin />

              <div className="bg-rose-50 dark:bg-gray-700/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-rose-100 dark:border-gray-600">
                {pillar.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                {pillar.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;