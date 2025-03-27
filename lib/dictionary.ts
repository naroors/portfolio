export interface Dictionary {
  loading: string;
  nav: {
    home: string;
    about: string;
    projects: string;
    resume: string;
    contact: string;
  };
  home: {
    greeting: string;
    intro: string;
    cta: {
      viewWork: string;
      contact: string;
    };
  };
  about: {
    title: string;
    bio1: string;
    bio2: string;
  };
  projects: {
    title: string;
    projectOne: {
      title: string;
      description: string;
    };
    projectTwo: {
      title: string;
      description: string;
    };
    projectThree?: {
      title: string;
      description: string;
    };
    description: string;
    viewProject: string;
    viewCode: string;
  };
  resume: {
    title: string;
    skills: string;
    experience: string;
    education: string;
    job1: {
      title: string;
      date: string;
      company: string;
      description: string;
    };
    job2: {
      title: string;
      date: string;
      company: string;
      description: string;
    };
    edu: {
      degree: string;
      date: string;
      school: string;
    };
    download: string;
  };
  contact: {
    title: string;
    description: string;
    schedule: string;
    sendEmail: string;
  };
  footer: {
    rights: string;
  };
  languageSwitch: string;
  actionSearch: {
    placeholder: string;
    noResults: string;
    navigationHint: string;
    shortcutHint: string;
  };
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  try {
    return (await import(`../dictionaries/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    return (await import(`../dictionaries/en.json`)).default;
  }
}

// Helper function to detect browser language
export const detectBrowserLanguage = (): string => {
  if (typeof window === 'undefined') return 'en'; // Default for server-side
  
  const navigatorLanguage = navigator.language || (navigator as any).userLanguage;
  const browserLanguage = navigatorLanguage.split('-')[0].toLowerCase();
  
  // For now only support en and pl
  return browserLanguage === 'pl' ? 'pl' : 'en';
}

// Helper to get language from localStorage or cookie
export const getSavedLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  return localStorage.getItem('language') || detectBrowserLanguage();
}

// Helper to save language preference
export const saveLanguage = (locale: string): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('language', locale);
} 