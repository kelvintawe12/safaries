import React, { useState, createContext, useContext } from 'react';
type Language = 'en' | 'fr' | 'rw';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const translations = {
  en: {
    'home.hero.title': 'Discover the Beauty of Kivu',
    'home.hero.subtitle': "Experience unforgettable adventures in Africa's most breathtaking landscapes",
    'common.book_now': 'Book Now'
    // Add more translations
  },
  fr: {
    'home.hero.title': 'Découvrez la Beauté du Kivu',
    'home.hero.subtitle': "Vivez des aventures inoubliables dans les paysages les plus époustouflants d'Afrique",
    'common.book_now': 'Réserver'
    // Add more translations
  },
  rw: {
    'home.hero.title': 'Tangira Ubwiza bwa Kivu',
    'home.hero.subtitle': 'Bona uburambe butazibagirana mu maso meza ya Afrika',
    'common.book_now': 'Kwandikisha'
    // Add more translations
  }
};
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    t
  }}>
      {children}
    </LanguageContext.Provider>;
};
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};