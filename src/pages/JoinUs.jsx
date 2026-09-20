import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Copy, Check, Mail, Phone, Globe, Users, MapPin, Calendar } from "lucide-react";

const benefits = [
  {
    title: "Travel Europe",
    desc: "Participate in courses, engineering competitions, and cultural exchanges in 85 universities across 30 countries. Mostly for free!",
    icon: "🌍"
  },
  {
    title: "Level Up Your Skills",
    desc: "From Public Speaking to Project Management and Web Development. Learn by doing in a safe, risk-free environment.",
    icon: "⚡"
  },
  {
    title: "Awesome Community",
    desc: "Make lifelong friends, go on epic teambuildings, and surround yourself with ambitious people who want more from their student life.",
    icon: "👥"
  },
  {
    title: "Career Boost",
    desc: "Connect directly with top companies, organize massive events, and build a CV that will easily stand out to any employer.",
    icon: "💼"
  }
];

const stats = [
  { value: "29", label: "Years Active", icon: Calendar },
  { value: "85+", label: "Universities", icon: Globe },
  { value: "30", label: "Countries", icon: MapPin },
  { value: "3000+", label: "Members", icon: Users },
];

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
      className="w-full text-left p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl hover:border-[#8b1832]/50 dark:hover:border-rose-500/50 hover:shadow-lg dark:hover:shadow-rose-900/10 transition-all duration-300 group flex items-center gap-5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-transparent dark:from-rose-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8b1832] transition-colors duration-300">
        <Icon size={20} className="text-[#8b1832] dark:text-rose-400 group-hover:text-white transition-colors duration-300" />
      </div>
      
      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{label}</p>
        <p className="text-base font-black text-gray-900 dark:text-white truncate">{displayValue || value}</p>
      </div>
      
      <div className="relative z-10 flex-shrink-0 bg-gray-50 dark:bg-gray-700 p-2.5 rounded-xl group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors duration-300 shadow-sm border border-gray-100 dark:border-gray-600">
        <motion.div
          initial={false}
          animate={{ scale: copied ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {copied 
            ? <Check size={18} className="text-green-500" /> 
            : <Copy size={18} className="text-gray-400 dark:text-gray-400 group-hover:text-[#8b1832] dark:group-hover:text-rose-400 transition-colors" />
          }
        </motion.div>
      </div>
    </motion.button>
  );
};

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
          const y = element.getBoundingClientRect().top + window.scrollY - 96;
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

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#8b1832]/10 dark:bg-rose-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Hero ── */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          {/*<motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-full text-sm font-bold mb-8 transition-colors shadow-sm border border-gray-300 dark:border-gray-700"
          >
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500 dark:bg-gray-400"></span>
            </span>
            Recruitment is CLOSED
          </motion.div>*/}

          <motion.div
          initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 text-[#8b1832] dark:text-rose-400 px-5 py-2 rounded-full text-sm font-bold mb-8 transition-colors shadow-sm border border-rose-200 dark:border-rose-900/50"
          >
            <span className="relative flex h-3 w-3">
          {/* Cercul care pulsează în spate (efectul de ping) */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b1832] dark:bg-rose-400 opacity-75"></span>
    
          {/* Cercul solid din față */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-32"></div>

        {/* ── Contact Section ── */}
        <div id="contact" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4 transition-colors"
            >
              Have questions? <br className="md:hidden" />
              <span className="text-[#8b1832] dark:text-rose-500">Get in touch!</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-300 transition-colors"
            >
              Whether you're a student looking to join our team or a company interested in a partnership, we would love to hear from you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* LEFT: Contact info + stats */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {/* Contact boxes */}
              <div className="flex flex-col gap-4">
                <ContactBox label="Email" value="bv-board@BEST-eu.org" Icon={Mail} />
                <ContactBox label="Phone" value="+40764468602" displayValue="+40 764 468 602" Icon={Phone} />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 flex-1">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      key={stat.label}
                      className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-xl dark:hover:shadow-rose-900/10 transition-all duration-300 group overflow-hidden"
                    >
                      {/* --- ICONIȚA URIAȘĂ ÎN FUNDAL (WATERMARK) --- */}
                      <Icon 
                        size={120} 
                        strokeWidth={1}
                        className="absolute -right-4 -bottom-4 text-gray-300 dark:text-gray-600 opacity-[0.15] group-hover:text-[#8b1832] dark:group-hover:text-rose-500 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500" 
                      />
                      
                      {/* --- TEXTUL CENTRAT --- */}
                      <div className="relative z-10">
                        <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 group-hover:from-[#8b1832] group-hover:to-rose-500 transition-all duration-300">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mt-2 uppercase tracking-widest group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT: Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">Send us a message</h3>

              <form className="space-y-6 flex-1 flex flex-col" onSubmit={handleSubmit}>
                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 focus:ring-4 focus:ring-[#8b1832]/10 dark:focus:ring-rose-500/10 transition-all text-gray-900 dark:text-white font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 focus:ring-4 focus:ring-[#8b1832]/10 dark:focus:ring-rose-500/10 transition-all text-gray-900 dark:text-white font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@company.com"
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 focus:ring-4 focus:ring-[#8b1832]/10 dark:focus:ring-rose-500/10 transition-all text-gray-900 dark:text-white font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 focus:ring-4 focus:ring-[#8b1832]/10 dark:focus:ring-rose-500/10 transition-all text-gray-900 dark:text-white font-medium appearance-none cursor-pointer"
                    >
                      <option>I want to join BEST</option>
                      <option>Company Partnership Inquiry</option>
                      <option>Other Questions</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Message</label>
                    <textarea
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#8b1832] dark:focus:border-rose-500 focus:ring-4 focus:ring-[#8b1832]/10 dark:focus:ring-rose-500/10 transition-all text-gray-900 dark:text-white font-medium resize-none"
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 mt-auto bg-[#8b1832] dark:bg-rose-600 text-white rounded-2xl font-black text-lg hover:bg-rose-900 dark:hover:bg-rose-500 transition-colors shadow-lg shadow-[#8b1832]/20 dark:shadow-rose-900/20"
                >
                  Send Message 🚀
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default JoinUs;