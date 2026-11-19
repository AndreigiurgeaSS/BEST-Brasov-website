import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Hero from "../sections/Hero";
import WhatWeDo from "../sections/WhatWeDo";
import WhatIsBest from "../sections/WhatIsBest";
import VisionMission from "../sections/VisionMission";
import CoreValues from "../sections/CoreValues";

const Home = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("hero.pageTitle", { defaultValue: "BEST Brașov" });
  }, [t, i18n.language]);

  return (
    <div className="relative bg-gray-50 dark:bg-gradient-to-b dark:from-[#320606] dark:via-[#1c0303] dark:to-[#140202] transition-colors duration-300 overflow-x-clip">
      <Hero />

      {/* Un singur grid continuu sub Hero, cu fade lin sus ca să nu se taie brusc */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 140px, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 140px, black 100%)",
          }}
        />

        <div className="relative z-10">
          <WhatWeDo />
          <WhatIsBest />
          <VisionMission />
          <CoreValues />
        </div>
      </div>
    </div>
  );
};

export default Home;