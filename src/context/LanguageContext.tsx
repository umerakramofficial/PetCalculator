import React, { createContext, useContext, useState } from 'react';
import { getLanguage, setLanguageSetting } from '../utils/localStorage';
import { translations } from '../utils/translations';

type Language = 'en' | 'de' | 'fr' | 'es' | 'it' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setLanguageSetting(lang);
    window.dispatchEvent(new Event('language-changed'));
  };

  const t = (key: keyof typeof translations['en']): string => {
    const langTranslations = translations[language] || translations['en'];
    return (langTranslations[key] || translations['en'][key] || key) as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
