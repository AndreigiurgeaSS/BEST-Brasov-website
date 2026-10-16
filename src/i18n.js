import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationRO from './locales/ro.json';

const resources = {
  en: { translation: translationEN },
  ro: { translation: translationRO }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Limba default cu care se deschide site-ul
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;