import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    localStorage.setItem('civilink-user', JSON.stringify(data));
  };

  const clearUserData = () => {
    setUserDataState(null);
    localStorage.removeItem('civilink-user');
  };

  // Load user data on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('civilink-user');
    if (stored) {
      setUserDataState(JSON.parse(stored));
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