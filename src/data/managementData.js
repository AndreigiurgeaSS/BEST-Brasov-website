// Ordinea în Board este afișată direct pe pagină:
// Rândul 1 (Sus): 1. Președinte (Stânga) | 2. Trezorier (Mijloc) | 3. Secretar (Dreapta)
// Rândul 2 (Jos): 4. VP HR               | 5. VP Marketing
export const board = [
  {
    name: "Dimitrie Tăbăcaru",
    roleKey: "managementPage.roles.president",
    role: "President",
    email: "dimitrie.tabacaru@best-eu.org",
    phone: "+40 730 827 778", // Numărul Președintelui
    image: "/images/management/Dimi.webp",
  },
  {
    name: "Paul Stănescu",
    roleKey: "managementPage.roles.treasurerFr",
    role: "Treasurer & Fundraising Coordinator",
    email: "paul.stanescu@best-eu.org",
    phone: "+40 740 426 164", // Numărul Trezorierului
    image: "/images/management/Paul.webp",
  },
  {
    name: "Ioana-Alexandra Stan",
    roleKey: "managementPage.roles.secretary",
    role: "General Secretary",
    email: "stan.ioana.alexandra@best-eu.org",
    phone: "+40 733 378 225", // Numărul Secretarului
    image: "/images/management/Alexandra.webp",
  },
  {
    name: "Giani-Claudiu Zlate",
    roleKey: "managementPage.roles.vpHr",
    role: "Vice President & Human Resources Coordinator",
    email: "giani.zlate@best-eu.org",
    image: "/images/management/Giani.webp",
  },
  {
    name: "Andrada-Maria Dobre",
    roleKey: "managementPage.roles.vpMarketing",
    role: "Vice President & Marketing Coordinator",
    email: "andrada-maria.dobre@best-eu.org",
    image: "/images/management/Ada.webp",
  },
];

export const coordinators = [
  {
    name: "Andrei Giurgea",
    roleKey: "managementPage.roles.itCoord",
    role: "IT Coordinator",
    email: "andrei.giurgea@best-eu.org",
    image: "/images/management/eu.webp",
  },
  {
    name: "Ioana-Bianca Renea",
    roleKey: "managementPage.roles.vivaldiCoord",
    role: "Seasonal Courses Responsible",
    email: "ioana.bianca.renea@best-eu.org",
    image: "/images/management/Ioana.webp",
  },
];