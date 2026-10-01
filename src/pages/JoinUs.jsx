import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Copy, Check, Mail, Phone, Star } from "lucide-react";

// --- Datele Secțiunilor ---
const benefits = [
  {
    title: "Travel Europe",
    desc: "Participate in courses, engineering competitions, and cultural exchanges in 85 universities across 30 countries. Mostly for free!",
    icon: "🌍",
    iconBg: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    title: "Level Up Your Skills",
    desc: "From Public Speaking to Project Management and Web Development. Learn by doing in a safe, risk-free environment.",
    icon: "⚡",
    iconBg: "bg-orange-50 dark:bg-orange-900/20"
  },
  {
    title: "Awesome Community",
    desc: "Make lifelong friends, go on epic teambuildings, and surround yourself with ambitious people who want more from their student life.",
    icon: "👥",
    iconBg: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    title: "Career Boost",
    desc: "Connect directly with top companies, organize massive events, and build a CV that will easily stand out to any employer.",
    icon: "💼",
    iconBg: "bg-rose-50 dark:bg-rose-900/20"
  }
];

const testimonialsRow1 = [
  {
    text: "My journey with BEST's Educational Involvement Programme showed me the real impact of the student voice. I gained practical skills in project management and survey design. The real highlight was building lifelong friendships.",
    author: "Kadir Özkan",
    local: "BEST Izmir",
    bgColor: "bg-[#0275b8]"
  },
  {
    stars: 5,
    text: "BEST transformed my university years from a simple academic routine into an incredible journey of skill-building, travel, and international friendships. It taught me how to step out of my comfort zone.",
    author: "Alex Popescu",
    local: "BEST Brașov",
    bgColor: "bg-[#71b626]"
  },
  {
    text: "I got to know so many amazing people across Europe and improved my communication, organising and strategic skills. I'm full of unique memories.",
    author: "Maria Zolota",
    local: "BEST Athens",
    bgColor: "bg-[#005f9e]"
  }
];

const testimonialsRow2 = [
  {
    text: "The sheer amount of soft skills I developed in just one year of being a BEST member is staggering. From organizing local events to attending international courses, it's an experience every student should have.",
    author: "Elena Stoica",
    local: "BEST Bucharest",
    bgColor: "bg-[#8b1832]"
  },
  {
    stars: 5,
    text: "Joining BEST was the smartest decision of my college life. I got to travel to 4 different countries almost for free and built an incredible network of ambitious engineering students.",
    author: "Mateo Garcia",
    local: "BEST Madrid",
    bgColor: "bg-[#d97706]" // Orange
  },
  {
    text: "From writing emails to corporate partners to managing a team of 20 people during a hackathon, BEST gave me the real-world experience that got me my first job.",
    author: "Sarah Schmidt",
    local: "BEST Munich",
    bgColor: "bg-[#059669]" // Green
  }
];

// --- Componente Reutilizabile ---

const ContactBox = ({ label, value, displayValue, Icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCopy}
      className="w-full text-left p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] hover:border-[#8b1832]/50 dark:hover:border-rose-500/50 hover:shadow-md transition-all duration-300 group flex items-center gap-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-transparent dark:from-rose-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 w-10 h-10 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8b1832] transition-colors duration-300 border border-gray-100 dark:border-gray-600">
        <Icon size={18} className="text-[#8b1832] dark:text-rose-400 group-hover:text-white transition-colors duration-300" />
      </div>
      
      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-black text-gray-900 dark:text-white truncate">{displayValue || value}</p>
      </div>
      
      <div className="relative z-10 flex-shrink-0 bg-white dark:bg-gray-700 p-2 rounded-lg group-hover:bg-[#8b1832] transition-colors duration-300 shadow-sm border border-gray-100 dark:border-gray-600">
        <motion.div
          initial={false}
          animate={{ scale: copied ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {copied 
            ? <Check size={16} className="text-green-500" /> 
            : <Copy size={16} className="text-gray-400 dark:text-gray-400 group-hover:text-white transition-colors" />
          }
        </motion.div>
      </div>
    </motion.button>
  );
};

const HorizontalMarquee = ({ testimonials, direction = -1 }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"],
        transition: {
          ease: "linear",
          duration: 40, // Viteza de scroll
          repeat: Infinity,
        }
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls, direction]);

  return (
    <div 
      className="relative overflow-visible w-full py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={controls}
        className="flex gap-6 w-max"
        style={{ willChange: "transform" }}
      >
        {/* Triplăm array-ul ca să fim 100% siguri că acoperă tot ecranul larg */}
        {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className={`relative w-[320px] sm:w-[380px] ${t.bgColor} p-6 rounded-[1.5rem] shadow-md overflow-hidden flex flex-col flex-shrink-0 cursor-default hover:-translate-y-1 transition-transform duration-300`}>
            
            <div className="relative z-10 flex-1">
               {t.stars && (
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.stars)].map((_, starIdx) => (
                      <Star key={starIdx} size={14} className="fill-[#111] text-[#111]" />
                    ))}
                  </div>
                )}
                <p className="text-white/95 font-medium mb-6 text-sm leading-relaxed">
                  "{t.text}"
                </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{t.author.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">{t.author}</p>
                <p className="text-white/80 text-xs font-medium tracking-wide truncate">{t.local}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};


// --- Componenta Principală ---
const JoinUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "I want to join BEST",
    message: ""
  });

  const location = useLocation();

  useEffect(() => {
    document.title = "Join Us! | BEST Brașov";
  }, []);

  useEffect(() => {
    if (location.hash === "#contact") {
      const element = document.getElementById("contact");
      if (element) {
        setTimeout(() => {
          const y = element.getBoundingClientRect().top - 96;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyText = `Name: ${formData.firstName} ${formData.lastName}\nContact Email: ${formData.email}\n\nMessage:\n${formData.message}`;
    const destEmail = "bv-board@BEST-eu.org";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${destEmail}&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(bodyText)}`;
    window.open(gmailUrl, "_blank");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#8b1832]/10 dark:bg-rose-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Hero ── */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          
          {/* COMENTARIU PĂSTRAT PENTRU STAREA CLOSED
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-full text-sm font-bold mb-8 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
          >
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500 dark:bg-gray-400"></span>
            </span>
            Recruitment is CLOSED
          </motion.div>
          */}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 text-[#8b1832] dark:text-rose-400 px-5 py-2 rounded-full text-sm font-bold mb-8 transition-colors shadow-sm border border-rose-200 dark:border-rose-900/50"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b1832] dark:bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8b1832] dark:bg-rose-500"></span>
            </span>
            Recruitment is OPEN
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-8 transition-colors"
          >
            Don't just be a student. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1832] to-rose-500">
              Be the BEST.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors"
          >
            Step out of your comfort zone, travel across Europe, develop skills they don't teach you in classes, and meet the best friends you'll ever have.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative inline-block group"
          >
            <button
              disabled
              className="inline-flex items-center gap-3 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-10 py-4 rounded-full font-black text-lg cursor-not-allowed transition-all"
            >
              Apply Now 🚀
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[280px] px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              Registration is currently closed. <br /> Recruitment will resume in the fall!
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-gray-900 dark:border-b-white"></div>
            </div>
          </motion.div>
        </div>

        {/* ── Benefits ── */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Why should you join us?</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#8b1832] to-rose-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 pt-10 rounded-[2rem] border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-xl transition-all duration-300 flex flex-col min-h-[360px]"
              >
                <div className={`w-12 h-12 ${benefit.iconBg} rounded-[1rem] flex items-center justify-center text-2xl mb-8`}>
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Orizontal Testimonials (Banda Infinita) ── */}
      <div className="mb-32 w-full overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">What do our volunteers say?</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">(Hover to pause)</p>
        </div>

        {/* Gradiente laterale pentru fade-out efect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

        <div className="flex flex-col gap-6">
          <HorizontalMarquee testimonials={testimonialsRow1} direction={-1} />
          <HorizontalMarquee testimonials={testimonialsRow2} direction={1} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Master Unified Contact Card (Zero Empty Space) ── */}
        <div id="contact" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 overflow-hidden relative"
          >
            {/* Decorațiune de fundal pentru formular */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-rose-50/50 to-transparent dark:from-rose-900/10 pointer-events-none rounded-tr-[2.5rem] rounded-br-[2.5rem]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
              
              {/* LEFT: Text & Contact Boxes (Ocupă 5 coloane din 12) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div className="mb-10 lg:mb-0">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight transition-colors">
                    Have questions? <br />
                    <span className="text-[#8b1832] dark:text-rose-500">Get in touch!</span>
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-300 transition-colors">
                    Whether you're a student looking to join our team or a company interested in a partnership, we would love to hear from you. Drop us a message or reach out directly!
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  <ContactBox label="Email" value="bv-board@BEST-eu.org" Icon={Mail} />
                  <ContactBox label="Phone" value="+40764468602" displayValue="+40 764 468 602" Icon={Phone} />
                </div>
              </div>

              {/* RIGHT: Formularul (Ocupă 7 coloane din 12) */}
              <div className="lg:col-span-7 lg:pl-8 flex flex-col">
                <form className="space-y-5 flex-1 flex flex-col" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@company.com"
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm appearance-none cursor-pointer"
                    >
                      <option>I want to join BEST</option>
                      <option>Company Partnership Inquiry</option>
                      <option>Other Questions</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 flex-1 flex flex-col">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      className="w-full flex-1 min-h-[120px] px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 transition-all text-gray-900 dark:text-white font-medium text-sm resize-none"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-[#8b1832] dark:bg-rose-600 text-white rounded-2xl font-bold text-base hover:bg-rose-900 dark:hover:bg-rose-500 transition-colors shadow-md mt-2"
                  >
                    Send Message 🚀
                  </motion.button>
                </form>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default JoinUs;