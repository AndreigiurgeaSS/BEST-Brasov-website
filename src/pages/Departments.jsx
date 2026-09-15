import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Megaphone, UserPlus, RotateCw } from "lucide-react";

const departments = [
  { 
    name: "Human Resources", 
    short: "HR",
    icon: <UserPlus size={32} />, 
    image: "/images/departments/hr-photo.jpg", 
    motto: "Are you a sociable person who loves being around people and making friends easily? Or maybe you're on the shy side and want a safe space to practice your social skills? In BEST, you'll have the perfect chance to develop your soft skills, learn to interact with diverse personalities, and organize the most memorable activities for your friends!",
    desc: "This department takes care of the organization's members: from outings, parties, and teambuildings, to training and other activities that develop you. In addition, they are also in charge of constantly evaluating what we do, so that we can constantly improve our work."
  },
  { 
    name: "Fundraising", 
    short: "FR",
    icon: <Briefcase size={32} />, 
    image: "/images/departments/fr-photo.jpg", 
    motto: "Negotiations? Corporate meetings? If you want to overcome the fear of communicating in a professional environment and master negotiation techniques that will give you a massive head start in your future career, FR is exactly where you belong!",
    desc: "Those involved in this department ensure that we have the material and financial means to carry out our projects. They contact and negotiate with companies to convince them to sponsor our events or offer us prizes and discounts for participants."
  },
  { 
    name: "Marketing", 
    short: "PR",
    icon: <Megaphone size={32} />, 
    image: "/images/departments/pr-photo.jpg", 
    motto: "Design? Video editing? Constantly scrolling through social media trends? If you want to dive into digital marketing, product design, and public speaking, or if you're just looking for a space to unleash your imagination and apply your skills creatively, PR is waiting for you!",
    desc: "The members of this department are in charge of the organization's external image, from poster design, to promotional materials, articles, social media presence and podcasts, to maintaining relationships with stakeholders (the University, partners and students)."
  },
  { 
    name: "Information Technology", 
    short: "IT",
    icon: <Code size={32} />, 
    image: "/images/departments/it-photo.jpg", 
    motto: "Websites? Apps? If you want to level up your organization skills and acquire hard skills that will boost any career path in a future-proof field, IT is for you! Join us to collaborate on exciting projects alongside passionate team members.",
    desc: "Here you have the opportunity to learn how to create a website and how to take into account all the details related to the resources with which an event is organized. You can also develop yourself in the robotics area, working on interesting projects alongside the other members of the department!"
  }
];

const DepartmentCard = ({ dept, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      // Perspectiva e crucială pentru efectul 3D
      className="relative w-full h-[600px] sm:h-[650px] lg:h-[600px] cursor-pointer group perspective-1000"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        // Preserve-3d asigură că fețele nu devin "plate"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* --- FAȚA CARDULUI (FRONT) --- */}
        <div 
          className="absolute inset-0 w-full h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col group-hover:border-rose-200 dark:group-hover:border-rose-500/50 group-hover:shadow-rose-900/20 transition-colors duration-500"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Bara roșie decorativă din stânga */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#8b1832] to-rose-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-10"></div>

          <div className="p-8 flex-grow flex flex-col h-full">
            
            {/* Zona Pentru Poză */}
            <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 relative border border-gray-200 dark:border-gray-600 flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm font-medium">
                [ Imagine {dept.short} ]
              </div>
              <img 
                src={dept.image} 
                alt={`${dept.name} Department`} 
                className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            
            {/* Header card (Icon + Titlu) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-gray-900 border border-rose-100 dark:border-gray-700 flex items-center justify-center text-[#8b1832] dark:text-rose-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm flex-shrink-0">
                {dept.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{dept.name}</h3>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded-md">{dept.short}</span>
                </div>
              </div>
            </div>

            {/* Textul Catchy (Motto-ul) */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic overflow-hidden flex-grow relative line-clamp-[7]">
              "{dept.motto}"
            </p>

            {/* Indicatorul de FLIP */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-[#8b1832] dark:text-rose-400 font-bold flex-shrink-0">
              <span className="text-sm tracking-wide uppercase">Click to flip</span>
              <RotateCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            </div>

          </div>
        </div>

        {/* --- SPATELE CARDULUI (BACK) --- */}
        <div 
          className="absolute inset-0 w-full h-full bg-white dark:bg-gray-800 rounded-[2.5rem] border border-rose-200 dark:border-rose-900/50 shadow-2xl overflow-hidden flex flex-col p-8 lg:p-12 text-center items-center justify-center"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" // Este întors cu spatele din start
          }}
        >
          {/* Decor: Iconiță gigantică semi-transparentă în fundal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] scale-[5] text-[#8b1832] dark:text-rose-500 pointer-events-none z-0">
            {dept.icon}
          </div>

          <div className="relative z-10 flex flex-col items-center h-full justify-center">
            
            <div className="w-20 h-20 rounded-3xl bg-[#8b1832] dark:bg-rose-600 text-white flex items-center justify-center mb-8 shadow-lg transform rotate-3">
              {dept.icon}
            </div>

            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6">What we do ?</h3>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium max-w-sm">
              {dept.desc}
            </p>

            </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

const Departments = () => {
  useEffect(() => {
    document.title = "Departments | BEST Brașov";
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6 transition-colors"
          >
            Our <span className="text-[#8b1832] dark:text-rose-500">Departments</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            Discover our departments and find the one that sparks your passion. Click on any card to see what happens behind the scenes!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          {departments.map((dept, index) => (
            <DepartmentCard key={index} dept={dept} index={index} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Departments;