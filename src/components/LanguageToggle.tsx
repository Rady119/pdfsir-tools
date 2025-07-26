'use client';

import { useState } from 'react';

interface LanguageToggleProps {
  currentLanguage?: 'en' | 'ar';
  onLanguageChange?: (language: 'en' | 'ar') => void;
}

export default function LanguageToggle({ 
  currentLanguage = 'en', 
  onLanguageChange 
}: LanguageToggleProps) {
  const [language, setLanguage] = useState<'en' | 'ar'>(currentLanguage);

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
    
    // Update document direction for RTL support
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`
          px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
          ${language === 'en' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ar')}
        className={`
          px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
          ${language === 'ar' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        العربية
      </button>
    </div>
  );
}
