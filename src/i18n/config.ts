import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';

// Detect user's language preference or default to German
const getInitialLanguage = () => {
  // Check localStorage first
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && ['de', 'en'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Default to German (primary language)
  return 'de';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
  });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
