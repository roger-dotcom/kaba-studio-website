import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

export const LANGUAGES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'sv', label: 'SV', full: 'Svenska' },
  { code: 'fr', label: 'FR', full: 'Français' },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = useCallback((key) => {
    const keys = key.split('.');
    let result = translations[lang];
    for (const k of keys) {
      if (result && typeof result === 'object') {
        result = result[k];
      } else {
        return key;
      }
    }
    return result ?? key;
  }, [lang]);

  const switchLanguage = useCallback((code) => {
    setLang(code);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t, switchLanguage, translations: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}