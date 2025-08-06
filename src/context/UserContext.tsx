import React, { createContext, useContext, useState, ReactNode } from 'react';
import { saveUserData, getUserData, removeStorageItem, STORAGE_KEYS } from '../utils/localStorage';

export interface UserData {
  name: string;
  age: number;
  gender: string;
  pincode: string;
  district: string;
  incomeGroup: string;
  caste?: string;
  education: string;
  aadhaar: string;
  pan?: string;
  isRegistered: boolean;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
    saveUserData(data);
  };

  const clearUserData = () => {
    setUserDataState(null);
    removeStorageItem(STORAGE_KEYS.USER_DATA);
  };

  // Load user data on mount
  React.useEffect(() => {
    const stored = getUserData();
    if (stored) {
      setUserDataState(stored);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};