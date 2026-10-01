import { motion } from "framer-motion";
import { Star, Users, Unlock, Lightbulb, TrendingUp } from "lucide-react";

const coreValues = [
  {
    icon: <Star className="w-10 h-10 text-[#8b1832] dark:text-rose-500 mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />,
    title: "FUN",
    desc: "We love what we do, and we want everyone who participates in our activities and events to feel the same."
  },
  {
    icon: <Users className="w-10 h-10 text-[#8b1832] dark:text-rose-500 mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />,
    title: "FRIENDSHIP",
    desc: "We build lasting relationships, standing by each other through good times and bad times."
  },
  {
    icon: <Unlock className="w-10 h-10 text-[#8b1832] dark:text-rose-500 mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />,
    title: "FLEXIBILITY",
    desc: "We are open to new ideas. Whatever happens, we seek solutions to adapt."
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-[#8b1832] dark:text-rose-500 mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />,
    title: "OPEN MINDEDNESS",
    desc: "We aim to improve ourselves every day. If we become better, then those around us also evolve."
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-[#8b1832] dark:text-rose-500 mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />,
    title: "IMPROVEMENT",
    desc: "We learn from every experience, event, or even a simple conversation with another BEST member."
  }
];

const CoreValues = () => {
  return (
    <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      
      {/* Engineering Grid Background (Foaia de matematică) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Titlul */}
        <div className="text-center mb-16">
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
            className="w-16 h-1.5 bg-[#8b1832] dark:bg-rose-500 mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>

        {/* Cardurile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {coreValues.map((val, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-rose-100 dark:hover:border-rose-900/50 transition-all duration-300 group"
            >
              {val.icon}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide group-hover:text-[#8b1832] dark:group-hover:text-rose-400 transition-colors duration-300">
                {val.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default CoreValues;