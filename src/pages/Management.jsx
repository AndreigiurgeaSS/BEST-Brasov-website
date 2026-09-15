import { motion } from "framer-motion";
import { board, coordinators } from "../data/managementData";
import { useEffect } from "react";

const TeamCard = ({ member, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: delay }}
    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-rose-900/20 transition-all duration-300 group flex flex-col h-full"
  >
    
    <div className="h-80 sm:h-96 overflow-hidden relative flex-shrink-0">
      <div className="absolute inset-0 bg-[#8b1832]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-multiply" />
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 "
      />
    </div>

    {/* Text area */}
    <div className="p-6 text-center flex flex-col flex-grow">
      <div className="flex flex-col items-center min-h-[80px]">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors leading-tight">
          {member.name}
        </h3>
        <p className="text-rose-700 dark:text-rose-400 font-medium text-sm transition-colors leading-snug">
          {member.role}
        </p>
      </div>

      {/* Email pinned to bottom */}
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors">
        <a
          href={`mailto:${member.email}`}
          className="text-gray-600 dark:text-gray-400 hover:text-rose-700 dark:hover:text-rose-400 text-sm font-medium transition-colors break-all"
        >
          {member.email}
        </a>
      </div>
    </div>
  </motion.div>
);

const Management = () => {

  useEffect(() => {
    document.title = "Management | BEST Brașov";
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-gray-900 dark:text-white sm:text-5xl mb-6 transition-colors"
          >
            Meet the <span className="text-[#8b1832] dark:text-rose-500">Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            The dedicated students working behind the scenes to make the magic happen.
          </motion.p>
        </div>

        {/* --- Local Board Section --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Local Board of Management</h2>
            <div className="w-24 h-1 bg-[#8b1832] dark:bg-rose-500 mx-auto mt-4 rounded-full transition-colors"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto px-4">
            {board.map((member, index) => (
              <div key={index} className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                <TeamCard member={member} delay={index * 0.1} />
              </div>
            ))}
          </div>
        </div>

        {/* --- Coordinators Section --- */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Department Coordinators</h2>
            <div className="w-24 h-1 bg-gray-300 dark:bg-gray-700 mx-auto mt-4 rounded-full transition-colors"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto px-4">
            {coordinators.map((member, index) => (
              <div key={index} className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
                <TeamCard member={member} delay={index * 0.1} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Management;