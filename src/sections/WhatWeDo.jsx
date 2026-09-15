import { motion } from "framer-motion";
import { BookOpen, Briefcase, Lightbulb } from "lucide-react";

const WhatWeDo = () => {
  const pillars = [
    {
      title: "Complementary Education",
      description: "We offer excellent opportunities for further education in an international environment. Our seasonal courses allow students to deepen their knowledge while working in interdisciplinary teams.",
      icon: <BookOpen className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
      delay: 0.1,
    },
    {
      title: "Career Support",
      description: "We provide valuable career development support. Through events like BEST Company Day, we connect students directly with top companies to showcase opportunities and kickstart careers.",
      icon: <Briefcase className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
      delay: 0.2,
    },
    {
      title: "Educational Involvement",
      description: "We are actively involved in education through technical competitions like EBEC. We encourage students to apply their skills in competitive environments, fostering critical thinking and teamwork.",
      icon: <Lightbulb className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
      delay: 0.3,
    },
  ];

  return (
    // Am schimbat py-24 cu pt-24 pb-12
    <section id="what-we-do" className="scroll-mt-24 pt-24 pb-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300"
          >
            What do we do?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            Empowering students through three core initiatives.
          </motion.p>
        </div>

        {/* The 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: pillar.delay }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:bg-rose-50 dark:hover:bg-gray-700/80 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-rose-100 dark:hover:border-rose-900/50 shadow-sm"
            >
              <div className="bg-white dark:bg-gray-900 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6 transition-colors duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
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