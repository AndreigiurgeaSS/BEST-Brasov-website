import { MapPin, Mail, Phone, Check } from "lucide-react";
import { Link } from "react-router-dom"; 
import { useState } from "react";

// --- MPentru link-urile care se copiaza---
const CopyableContact = ({ value, displayValue, Icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button 
      onClick={handleCopy} 
      className={`flex items-center gap-2 transition-colors duration-300 group ${
        copied ? 'text-green-500 dark:text-green-400' : 'hover:text-white'
      }`}
      title="Click to copy"
    >
      {copied ? (
        <Check size={16} className="scale-110 transition-transform" />
      ) : (
        <Icon size={16} className="group-hover:scale-110 transition-transform" />
      )}
      <span>{displayValue}</span>
    </button>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#6b1226] dark:bg-gray-950 text-gray-200 py-12 border-t border-[#4a0d1b] dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 items-start">
          
          {/* --- Brand & Contacts --- */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <img 
              src="/images/logos/logo-BestBV.png" 
              alt="BEST Brașov Logo"
              className="h-16 sm:h-20 w-auto mb-6 transition-transform duration-300 hover:scale-105"
            />
            <p className="text-sm text-gray-300 dark:text-gray-400 max-w-xs mx-auto md:mx-0 leading-relaxed transition-colors duration-300 mb-8">
              Developing students since 1997. Empowering the next generation of engineers, leaders, and innovators at Transilvania University.
            </p>
            
            {/* Contacts (Acum folosesc noua componentă) */}
            <h3 className="text-white dark:text-gray-100 text-xl font-bold mb-4 transition-colors duration-300">
              Contacts
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-300 dark:text-gray-400 items-center md:items-start">
              <CopyableContact 
                value="bv-board@BEST-eu.org" 
                displayValue="bv-board@BEST-eu.org" 
                Icon={Mail} 
              />
              <CopyableContact 
                value="+40764468602" 
                displayValue="+40 764 468 602" 
                Icon={Phone} 
              />
            </div>
          </div>

          {/* --- Socials & Links --- */}
          <div className="flex flex-col items-center">
            <h3 className="text-white dark:text-gray-100 text-xl font-bold mb-6 transition-colors duration-300">Follow Us</h3>
            <div className="flex space-x-4 mb-10">
              {/* Facebook */}
              <a href="https://web.facebook.com/BESTBrasov/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-[#8b1832] dark:text-rose-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/bestbrasov/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-[#8b1832] dark:text-rose-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@bestbrasov" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-[#8b1832] dark:text-rose-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.04.14 1.59.88 3.14 2.05 4.34 1.25 1.25 2.94 1.96 4.71 2.07v4.06c-1.89-.04-3.7-.68-5.26-1.83v6.52c0 3.73-3.02 6.75-6.75 6.75-3.73 0-6.75-3.02-6.75-6.75 0-3.73 3.02-6.75 6.75-6.75 1.05 0 2.04.24 2.94.67V13.5c-.87-.39-1.87-.58-2.94-.58-2.07 0-3.75 1.68-3.75 3.75 0 2.07 1.68 3.75 3.75 3.75 2.07 0 3.75-1.68 3.75-3.75V.02z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/best-brasov" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-[#8b1832] dark:text-rose-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>

            {/* Linkuri rapide */}
            <ul className="flex flex-col items-center space-y-3 text-sm font-medium text-gray-300 dark:text-gray-400">
              <li>
                <Link to="/events" className="hover:text-white transition-colors uppercase tracking-wider">Events</Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors uppercase tracking-wider">Departments</Link>
              </li>
              <li>
                <Link to="/management" className="hover:text-white transition-colors uppercase tracking-wider">Management</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors uppercase tracking-wider">FAQ</Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition-colors uppercase tracking-wider">Partners</Link>
              </li>
            </ul>
          </div>

          {/* --- Address & Map --- */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-white dark:text-gray-100 text-xl font-bold mb-4 flex items-center gap-2 transition-colors duration-300">
              <MapPin size={20} />
              Address
            </h3>
            <p className="text-gray-200 dark:text-gray-300 font-medium mb-1 text-center md:text-right transition-colors duration-300">
              BEST Brașov, Căminul 15,
            </p>
            <p className="text-gray-200 dark:text-gray-300 font-medium mb-4 text-center md:text-right transition-colors duration-300">
              Strada Universității 1, Brașov 500068
            </p>
            
            <div className="w-full max-w-[350px] h-[180px] rounded-lg overflow-hidden border-2 border-white/20 dark:border-gray-800 shadow-lg transition-colors duration-300 opacity-90 hover:opacity-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.664406155694!2d25.5866184766946!3d45.65755107107775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b6fb89182a9%3A0x63c5a711202b8d44!2sStrada%20Universit%C4%83%C8%9Bii%201%2C%20Bra%C8%99ov%20500068!5e0!3m2!1sen!2sro!4v1714138000000!5m2!1sen!2sro"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* --- Copyright --- */}
        <div className="mt-12 pt-8 border-t border-[#8b1832] dark:border-gray-800 text-center text-sm text-gray-400 dark:text-gray-500 flex flex-col sm:flex-row justify-between items-center transition-colors duration-300">
          <p>BEST © {new Date().getFullYear()}. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Made with <span className="text-rose-500">❤️</span> by the IT Department
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;