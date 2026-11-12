// Format dată pentru calendar: string simplu "YYYY-MM-DD" (fără new Date / toISOString,
// altfel fusul orar poate muta ziua).
//
// Poți seta zilele pentru un eveniment în 3 moduri (oricare lună din an):
//   1) O singură zi:         date: "2026-11-30"
//   2) Mai multe zile:       dates: ["2026-11-14", "2026-11-15"]
//   3) Interval (de la-până): startDate: "2026-11-24", endDate: "2026-11-28"

export const externalEvents = [
  
  {
    titleKey: "eventsData.external.hackathon.title",
    descKey: "eventsData.external.hackathon.desc",
    image: "/images/events/hackathon.png",
    link: "https://hackathon.bestbrasov.ro",
    // dates: ["2026-11-14", "2026-11-15"],
  },
  {
    titleKey: "eventsData.external.btw.title",
    descKey: "eventsData.external.btw.desc",
    image: "/images/events/btw.png",
    link: "https://btw.bestbrasov.ro",
    startDate: "2026-11-17", 
    endDate: "2026-11-21",   
  },
  {
    titleKey: "eventsData.external.bit.title",
    descKey: "eventsData.external.bit.desc",
    image: "/images/events/bit.png",
    link: "https://bit.bestbrasov.ro",
    // date: "2026-00-00",
  },
  {
    titleKey: "eventsData.external.bcds.title",
    descKey: "eventsData.external.bcds.desc",
    image: "/images/events/bcds.png",
    link: "https://bcds.bestbrasov.ro",
    // date: "2027-03-18",
  },
  {
    titleKey: "eventsData.external.bcd.title",
    descKey: "eventsData.external.bcd.desc",
    image: "/images/events/bcd.png",
    link: "https://bcd.bestbrasov.ro",
  },
  {
    titleKey: "eventsData.external.courses.title",
    descKey: "eventsData.external.courses.desc",
    image: "/images/events/BEST-Courses.png",
    link: "https://studyandtravel.bestbrasov.ro",
  },
  {
    titleKey: "eventsData.external.gala.title",
    descKey: "eventsData.external.gala.desc",
    image: "/images/events/GalaAniversare.png",
  },
];

export const internalEvents = [
  {
    titleKey: "eventsData.internal.mw.title",
    descKey: "eventsData.internal.mw.desc",
    image: "/images/events/Mw.jpeg",
    // startDate: "2026-11-20",
    // endDate: "2026-11-22",
  },
  {
    titleKey: "eventsData.internal.ai.title",
    descKey: "eventsData.internal.ai.desc",
    image: "/images/events/AiRefacut.png",
    // date: "2026-12-12",
  },
];

// ── Zile Importante / Extra în Calendar (apar doar în calendar, pe orice lună vrei) ──
// type poate fi: "public" (albastru) | "internal" (roșu/rose) | "intl" (galben/amber)
// Poți folosi fie titleKey/descKey din JSON, fie direct title/desc simplu (sau RO/EN).
export const calendarHighlights = [
  // Exemple (decomentează sau adaugă ce zile vrei tu pe orice lună):
  /*
  {
    date: "2026-11-15",
    type: "intl",
    titleRO: "Deadline Înscrieri Cursuri de Primăvară",
    titleEN: "Spring Courses Application Deadline",
    descRO: "Ultima zi în care poți aplica pentru un curs BEST de primăvară în Europa.",
    descEN: "Last day to apply for a BEST Spring Course across Europe.",
    link: "https://studyandtravel.bestbrasov.ro",
  },
  {
    startDate: "2027-02-22",
    endDate: "2027-03-05",
    type: "public",
    titleRO: "Recrutări de Primăvară BEST Brașov",
    titleEN: "BEST Brașov Spring Recruitments",
    descRO: "Înscrierile pentru noii voluntari sunt deschise!",
    descEN: "Registrations for new volunteers are open!",
    link: "/join",
  },
  */
];

// Cursuri de sezon internaționale — site-ul e gestionat de altă echipă,
// aici doar le prezentăm și trimitem către ele.
// icon: "leaf" | "snowflake" | "flower" | "sun"   status: "open" | "tba"
// `date` e opțional (dacă îl pui, apare și în calendar).
export const internationalEvents = [
  { id: "autumn", icon: "leaf",      status: "open", link: "https://studyandtravel.bestbrasov.ro", titleKey: "eventsData.international.autumn.title", descKey: "eventsData.international.autumn.desc" },
  { id: "winter", icon: "snowflake", status: "tba",  link: "https://studyandtravel.bestbrasov.ro", titleKey: "eventsData.international.winter.title", descKey: "eventsData.international.winter.desc" },
  { id: "spring", icon: "flower",    status: "tba",  link: "https://studyandtravel.bestbrasov.ro", titleKey: "eventsData.international.spring.title", descKey: "eventsData.international.spring.desc" },
  { id: "summer", icon: "sun",       status: "tba",  link: "https://studyandtravel.bestbrasov.ro", titleKey: "eventsData.international.summer.title", descKey: "eventsData.international.summer.desc" },
];