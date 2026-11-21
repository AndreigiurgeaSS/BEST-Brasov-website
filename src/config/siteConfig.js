// ============================================================================
// SITE CONFIG — Panoul de control rapid pentru BEST Brașov
// Modifică valorile de aici și se actualizează automat pe tot site-ul.
// (Pentru membrii Board-ului / Coordonatori, editează src/data/managementData.js)
// ============================================================================

export const siteConfig = {
  // true = Recrutări DESCHISE (bara OPEN + butonul Apply Now activ)
  // false = Recrutări ÎNCHISE (bara CLOSED gri + tooltip informativ)
  isRecruitmentOpen: false,

  // Datele oficiale de contact (folosite în Footer și în pagina Join Us -> Contact)
  contact: {
    email: "bv-board@BEST-eu.org",
    phone: "+40730827778",
    phoneDisplay: "+40 730 827 778",
  },

  // Link-uri Google Forms (folosește mereu parametrul ?embedded=true la final)
  forms: {
    faqEN:
      "https://docs.google.com/forms/d/e/1FAIpQLSc7SYTuLF4KmYz6FsPWmG41ciPwAqV5CVUNdhuo0762JB5GmA/viewform?embedded=true",
    // Înlocuiește link-ul de mai jos când formularul FAQ în română este gata:
    faqRO:
      "https://docs.google.com/forms/d/e/1FAIpQLSc7SYTuLF4KmYz6FsPWmG41ciPwAqV5CVUNdhuo0762JB5GmA/viewform?embedded=true",

    // Formularul de recrutare 
    recruitment:
      "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true",
  },
};