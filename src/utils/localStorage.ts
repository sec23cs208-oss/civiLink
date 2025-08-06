// Local Storage utility functions for CIVILINK

export interface StorageKeys {
  USER_DATA: 'civilink-user';
  SPLASH_SHOWN: 'civilink-splash-shown';
  THEME_PREFERENCE: 'civilink-theme';
  LANGUAGE_PREFERENCE: 'civilink-language';
  CHAT_HISTORY: 'civilink-chat-history';
  SCHEME_FAVORITES: 'civilink-scheme-favorites';
  EDUCATION_PROGRESS: 'civilink-education-progress';
  LAST_VISIT: 'civilink-last-visit';
}

export const STORAGE_KEYS: StorageKeys = {
  USER_DATA: 'civilink-user',
  SPLASH_SHOWN: 'civilink-splash-shown',
  THEME_PREFERENCE: 'civilink-theme',
  LANGUAGE_PREFERENCE: 'civilink-language',
  CHAT_HISTORY: 'civilink-chat-history',
  SCHEME_FAVORITES: 'civilink-scheme-favorites',
  EDUCATION_PROGRESS: 'civilink-education-progress',
  LAST_VISIT: 'civilink-last-visit'
};

// Generic localStorage functions with error handling
export const setStorageItem = <T>(key: string, value: T): boolean => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage with key "${key}":`, error);
    return false;
  }
};

export const getStorageItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue || null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage with key "${key}":`, error);
    return defaultValue || null;
  }
};

export const removeStorageItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage with key "${key}":`, error);
    return false;
  }
};

export const clearAllStorage = (): boolean => {
  try {
    // Only clear CIVILINK-related items
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Specific storage functions for different data types
export const saveUserData = (userData: any): boolean => {
  return setStorageItem(STORAGE_KEYS.USER_DATA, userData);
};

export const getUserData = (): any => {
  return getStorageItem(STORAGE_KEYS.USER_DATA);
};

export const saveChatHistory = (messages: any[]): boolean => {
  return setStorageItem(STORAGE_KEYS.CHAT_HISTORY, messages);
};

export const getChatHistory = (): any[] => {
  return getStorageItem(STORAGE_KEYS.CHAT_HISTORY, []);
};

export const saveLanguagePreference = (language: string): boolean => {
  return setStorageItem(STORAGE_KEYS.LANGUAGE_PREFERENCE, language);
};

export const getLanguagePreference = (): string => {
  return getStorageItem(STORAGE_KEYS.LANGUAGE_PREFERENCE, 'en');
};

export const saveSchemeFavorites = (favorites: string[]): boolean => {
  return setStorageItem(STORAGE_KEYS.SCHEME_FAVORITES, favorites);
};

export const getSchemeFavorites = (): string[] => {
  return getStorageItem(STORAGE_KEYS.SCHEME_FAVORITES, []);
};

export const saveEducationProgress = (progress: any): boolean => {
  return setStorageItem(STORAGE_KEYS.EDUCATION_PROGRESS, progress);
};

export const getEducationProgress = (): any => {
  return getStorageItem(STORAGE_KEYS.EDUCATION_PROGRESS, {});
};

export const setSplashShown = (): boolean => {
  return setStorageItem(STORAGE_KEYS.SPLASH_SHOWN, true);
};

export const isSplashShown = (): boolean => {
  return getStorageItem(STORAGE_KEYS.SPLASH_SHOWN, false);
};

export const updateLastVisit = (): boolean => {
  return setStorageItem(STORAGE_KEYS.LAST_VISIT, new Date().toISOString());
};

export const getLastVisit = (): string | null => {
  return getStorageItem(STORAGE_KEYS.LAST_VISIT);
};

// Storage event listener for cross-tab synchronization
export const addStorageListener = (callback: (key: string, newValue: any, oldValue: any) => void) => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key && Object.values(STORAGE_KEYS).includes(e.key as any)) {
      const newValue = e.newValue ? JSON.parse(e.newValue) : null;
      const oldValue = e.oldValue ? JSON.parse(e.oldValue) : null;
      callback(e.key, newValue, oldValue);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

// Data migration and versioning
export const migrateStorageData = (): void => {
  try {
    // Check if migration is needed
    const currentVersion = getStorageItem('civilink-storage-version', '1.0.0');
    
    if (currentVersion === '1.0.0') {
      // Perform any necessary data migrations here
      console.log('Storage data is up to date');
    }
    
    // Update version
    setStorageItem('civilink-storage-version', '1.0.0');
  } catch (error) {
    console.error('Error during storage migration:', error);
  }
};