import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslations from './locales/en/common.json';
import trTranslations from './locales/tr/common.json';
import deTranslations from './locales/de/common.json';
import frTranslations from './locales/fr/common.json';
import esTranslations from './locales/es/common.json';
import elTranslations from './locales/el/common.json';
import arTranslations from './locales/ar/common.json';

const resources = {
  en: {
    common: enTranslations,
  },
  tr: {
    common: trTranslations,
  },
  de: {
    common: deTranslations,
  },
  fr: {
    common: frTranslations,
  },
  es: {
    common: esTranslations,
  },
  el: {
    common: elTranslations,
  },
  ar: {
    common: arTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;