import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Calendar, Compass } from "lucide-react";

const NotFound = () => {
  const { i18n } = useTranslation();
  const isRO = !!i18n.language && i18n.language.toLowerCase().startsWith("ro");

  useEffect(() => {
    document.title = isRO
      ? "404 · Pagină negăsită | BEST Brașov"
      : "404 · Page Not Found | BEST Brașov";
  }, [isRO]);

  return (
    <div className="min-h-[82vh] pt-28 pb-20 px-4 flex items-center justify-center bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1e0303] dark:to-[#110101] transition-colors duration-300 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(79,0,40,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rose-50 dark:bg-[#2a0505] border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-[#4F0028] dark:text-rose-400 shadow-sm">
          <Compass size={32} />
        </div>

        <p className="text-7xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#4F0028] via-[#7a0b3b] to-[#a11d3a] dark:from-rose-200 dark:via-rose-400 dark:to-[#c83e5b] leading-none">
          404
        </p>

        <h1 className="mt-4 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {isRO ? "Pagina aceasta a plecat într-un curs BEST." : "This page went on a BEST Course."}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {isRO
            ? "Link-ul pe care l-ai accesat nu există sau a fost mutat. Te putem duce rapid înapoi pe drumul cel bun."
            : "The link you followed doesn't exist or has been moved. Let's get you back on track."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#4F0028] hover:bg-[#3a001d] text-white font-bold text-sm shadow-lg shadow-[#4F0028]/25 transition-all hover:-translate-y-0.5"
          >
            <Home size={16} />
            <span>{isRO ? "Înapoi Acasă" : "Back Home"}</span>
          </Link>

          <Link
            to="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-[#1e0404] border border-gray-200 dark:border-white/15 text-gray-800 dark:text-gray-100 hover:border-[#4F0028]/40 font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5"
          >
            <Calendar size={16} />
            <span>{isRO ? "Vezi Evenimentele" : "Explore Events"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;