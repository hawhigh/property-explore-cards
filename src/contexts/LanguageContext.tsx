
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'SK';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    // Header
    'header.search.placeholder': 'Search properties by location, type, or amenities...',
    'header.filters': 'Filters',
    'header.signin': 'Sign In',
    'header.dashboard': 'Dashboard',
    'header.signout': 'Sign Out',
    
    // Hero Section
    'hero.title': 'Villa Lucilla',
    'hero.subtitle': 'Cyprus Paradise',
    'hero.experience': 'Experience Luxury in Cyprus',
    'hero.description': 'Discover Villa Lucilla - Your gateway to an unforgettable Mediterranean escape. Premium amenities, stunning views, and world-class hospitality await.',
    'hero.signin.to.book': 'Sign In to Book',
    'hero.explore.villa': 'Explore Villa',
    'hero.welcome.back': 'Welcome Back',
    'hero.book.your.stay': 'Book Your Stay',
    'hero.my.bookings': 'My Bookings',
    
    // Villa Features
    'villa.features': 'Villa Lucilla Features',
    'villa.luxury.comfort': 'Luxury Meets Comfort',
    'villa.description': 'Experience the perfect blend of Mediterranean charm and modern amenities in our 3-bedroom villa with private pool in the exclusive Anthorina Gardens Resort.',
    
    // Common
    'loading': 'Loading personalized content...',
  },
  SK: {
    // Header
    'header.search.placeholder': 'Hľadajte nehnuteľnosti podľa lokality, typu alebo vybavenia...',
    'header.filters': 'Filtre',
    'header.signin': 'Prihlásiť sa',
    'header.dashboard': 'Dashboard',
    'header.signout': 'Odhlásiť sa',
    
    // Hero Section
    'hero.title': 'Villa Lucilla',
    'hero.subtitle': 'Cyprus Paradise',
    'hero.experience': 'Zažite luxus na Cypre',
    'hero.description': 'Objavte Villa Lucilla - Vašu bránu k nezabudnuteľnému stredomorskému úniku. Prémiové vybavenie, úžasné výhľady a služby svetovej triedy na vás čakajú.',
    'hero.signin.to.book': 'Prihláste sa na rezerváciu',
    'hero.explore.villa': 'Preskúmať vilu',
    'hero.welcome.back': 'Vitajte späť',
    'hero.book.your.stay': 'Rezervovať pobyt',
    'hero.my.bookings': 'Moje rezervácie',
    
    // Villa Features
    'villa.features': 'Funkcie Villa Lucilla',
    'villa.luxury.comfort': 'Luxus stretáva pohodlie',
    'villa.description': 'Zažite dokonalú kombináciu stredomorského šarmu a moderného vybavenia v našej 3-izbovej vile so súkromným bazénom v exkluzívnom Anthorina Gardens Resort.',
    
    // Common
    'loading': 'Načítavam personalizovaný obsah...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
