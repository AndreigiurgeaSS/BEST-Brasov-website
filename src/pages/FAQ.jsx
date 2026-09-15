import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "What is BEST Brașov?",
    answer: "BEST (Board of European Students of Technology) is a non-profit, non-political organization. We help students develop their skills, travel, and connect with companies across Europe."
  },
  {
    question: "Who can join the organization?",
    answer: "Any student currently enrolled at Transilvania University of Brașov can apply during our recruitment periods (usually in Autumn and Spring)."
  },
  {
    question: "Are the courses and travels really free?",
    answer: "Mostly, yes! For BEST courses, accommodation, food, and the academic program are covered by the host local group. You usually only pay a small fee and your travel expenses."
  },
  {
    question: "Do I need to be an IT/Computer Science student?",
    answer: "Absolutely not! While we focus on technology, our members come from all faculties. We need people skilled in HR, PR, Design, Marketing, Logistics, and more."
  },
  {
    question: "How much time does it take to be a member?",
    answer: "It's entirely up to you. You can dedicate a few hours a week or get heavily involved in organizing massive events. Flexibility is key, as we are all full-time students."
  }
];

const FAQItem = ({ faq, index, isOpen, toggleOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`mb-4 rounded-2xl transition-all duration-300 overflow-hidden border ${
        isOpen 
          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md' 
          : 'bg-white/40 dark:bg-gray-800/40 border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-800/60'
      }`}
    >
      <button
        onClick={toggleOpen}
        className="w-full text-left px-6 py-5 flex items-center justify-between group relative"
      >
        <div 
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 rounded-r-full transition-all duration-300 ${
            isOpen ? 'bg-[#8b1832] dark:bg-rose-500 opacity-100' : 'bg-[#8b1832] dark:bg-rose-500 opacity-0 group-hover:opacity-30'
          }`} 
        />

        <span className={`font-bold text-lg transition-colors pr-4 relative z-10 ${
          isOpen ? 'text-[#8b1832] dark:text-rose-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-[#8b1832] dark:group-hover:text-rose-400'
        }`}>
          {faq.question}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className={`flex-shrink-0 p-2 rounded-full transition-colors duration-300 ${
            isOpen 
              ? 'bg-rose-50 dark:bg-rose-900/30 text-[#8b1832] dark:text-rose-400' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 group-hover:bg-rose-50 dark:group-hover:bg-gray-700 group-hover:text-[#8b1832] dark:group-hover:text-rose-400'
          }`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700/50 mt-2 pt-4 mx-2">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    document.title = "FAQ | BEST Brașov";
  }, []);

  return (
    <div className="pt-32 pb-32 min-h-screen relative transition-colors duration-300 overflow-hidden bg-gray-50 dark:bg-gray-900">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#8b1832]/10 dark:bg-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            // Am scos transition-ul lent
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1832] to-rose-500">Questions</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} // Un delay foarte scurt, fără a încetini căderea
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to know about joining our local group, traveling across Europe, and developing yourself.
          </motion.p>
        </div>

        {/* CONTAINER GLASSMORPHISM PRINCIPAL */}
        <div className="bg-white/50 dark:bg-gray-800/30 backdrop-blur-xl rounded-[2.5rem] p-4 sm:p-8 shadow-xl border border-white dark:border-gray-700/50">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              index={index} 
              isOpen={openIndex === index} 
              toggleOpen={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;